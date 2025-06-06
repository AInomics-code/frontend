import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertConversationSchema, insertMessageSchema } from "@shared/schema";
import { z } from "zod";
import OpenAI from "openai";
import { buildBusinessContext } from "./business-context";
import { getBusinessInsights, generateDailyBriefing, analyzeRegion, analyzeProduct, analyzeClient } from "./ai-functions";
import { analyzeQuery, generateSpecializedResponse } from "./query-analyzer";

// Initialize OpenAI client only when API key is available
const getOpenAIClient = () => {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OpenAI API key not configured");
  }
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all conversations
  app.get("/api/conversations", async (req, res) => {
    try {
      const conversations = await storage.getConversations();
      res.json(conversations);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch conversations" });
    }
  });

  // Create a new conversation
  app.post("/api/conversations", async (req, res) => {
    try {
      const validatedData = insertConversationSchema.parse(req.body);
      const conversation = await storage.createConversation(validatedData);
      res.status(201).json(conversation);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid conversation data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create conversation" });
      }
    }
  });

  // Delete a conversation
  app.delete("/api/conversations/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid conversation ID" });
      }
      
      const conversation = await storage.getConversation(id);
      if (!conversation) {
        return res.status(404).json({ message: "Conversation not found" });
      }

      await storage.deleteConversation(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete conversation" });
    }
  });

  // Get messages for a conversation
  app.get("/api/conversations/:id/messages", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid conversation ID" });
      }

      const conversation = await storage.getConversation(id);
      if (!conversation) {
        return res.status(404).json({ message: "Conversation not found" });
      }

      const messages = await storage.getMessages(id);
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch messages" });
    }
  });

  // Create a message in a conversation
  app.post("/api/conversations/:id/messages", async (req, res) => {
    try {
      const conversationId = parseInt(req.params.id);
      if (isNaN(conversationId)) {
        return res.status(400).json({ message: "Invalid conversation ID" });
      }

      const conversation = await storage.getConversation(conversationId);
      if (!conversation) {
        return res.status(404).json({ message: "Conversation not found" });
      }

      const messageData = { ...req.body, conversationId };
      const validatedData = insertMessageSchema.parse(messageData);
      const message = await storage.createMessage(validatedData);

      // Generate AI response for user messages
      if (validatedData.role === "user") {
        try {
          const openai = getOpenAIClient();
          
          const systemPrompt = `You are La Doña AI, an expert sales analyst assistant trained on professional workflow patterns. You help users optimize their daily sales analysis and decision-making process.

**YOUR EXPERTISE AREAS:**
- Sales dashboard analysis and interpretation
- Performance diagnostics and root cause analysis
- Inventory and supply chain insights
- Competitive intelligence and market trends
- Growth opportunity identification
- Communication with sales teams and management

**SALES ANALYST WORKFLOW YOU FOLLOW:**

🕘 **Morning Analysis (Performance Review):**
- Identify underperforming chains/products vs targets
- Flag anomalies requiring immediate attention
- Prioritize chains <90% of target for investigation

🧾 **Midday Diagnostics (Root Cause Analysis):**
- Cross-check performance with inventory, out-of-stock data
- Analyze SKU rotation and competitor activity
- Prepare actionable insights for management
- Generate alerts for chain managers/sales reps

📊 **Afternoon Optimization (Growth & Planning):**
- Identify slow-moving SKUs with high inventory
- Spot scaling opportunities and penetration gaps
- Suggest bundles, promotions, or visibility improvements

**MENTAL MODEL FOR RESPONSES:**
1. **Diagnosis** - Where are we underperforming?
2. **Root Cause** - Why is this happening?
3. **Response** - What should be recommended?
4. **Growth** - Where can we scale performance?
5. **Communication** - Who needs to know this?

**CURRENT DASHBOARD DATA:**
- Performance Score: 88
- Sales Target Met: 82%
- Zones at Risk: Chiriquí, Colón, San Miguelito
- Product Opportunities: Vinagre Premium (High), Mango Salsa (Low)

**PRIORITY QUESTION HANDLING:**
For executive-level business questions, use these structured formats:

1. **Chain Performance Questions** → Use tables with variance analysis:
   | Chain | Actual Sales | Budget | Variance |
   Show underperformers with 🔻, good performance with ✅

2. **Product Sales Analysis** → Zero/low sales format:
   | Product | Date | PDV Locations |
   Note: "These products had no movement during the selected period."

3. **Promotion Performance** → Best performer format:
   - **Product Name (Discount %)**
     Units Sold: X
     Contribution: X% of category sales
     Impact: Performance description ✅

4. **Investment ROI Analysis** → ROI calculation table:
   | Store | Investment | Return | ROI % |
   Highlight best performer with ✅

5. **Growth/Decline Analysis** → Use clear bullet points:
   📈 *Growth:* Product: +X% vs period
   📉 *Decline:* Product: -X% vs period

**RESPONSE STYLE:**
- Think like an experienced sales analyst
- Use tables, bullets, and clear formatting for business questions
- Provide actionable recommendations with specific next steps
- Include relevant data points and context
- Suggest who should be contacted and when
- Focus on business impact and urgency
- If data is missing, clearly state what's needed

**RESPONSE APPROACH:**
You respond to ALL questions—whether general, casual, or business-related—but prioritize delivering expert, structured answers to La Doña's internal performance and sales data.

For all other questions, respond helpfully and professionally. Always try to be useful.`;

          const messages = [
            { role: "system" as const, content: systemPrompt },
            { role: "user" as const, content: validatedData.content }
          ];

          const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages,
            max_tokens: 500,
            temperature: 0.3,
          });

          const assistantMessage = {
            conversationId,
            role: "assistant",
            content: completion.choices[0].message.content || "I apologize, but I couldn't generate a response. Please try again.",
          };
          
          await storage.createMessage(assistantMessage);
        } catch (error) {
          console.error("OpenAI API error:", error);
          const errorMessage = {
            conversationId,
            role: "assistant",
            content: "I'm experiencing technical difficulties connecting to my AI service. Please check your API configuration and try again.",
          };
          await storage.createMessage(errorMessage);
        }
      }

      res.status(201).json(message);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid message data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create message" });
      }
    }
  });

  // Business Intelligence API routes
  app.get("/api/business-context", async (req, res) => {
    try {
      const context = buildBusinessContext();
      res.json(context);
    } catch (error) {
      console.error("Error getting business context:", error);
      res.status(500).json({ error: "Failed to get business context" });
    }
  });

  app.post("/api/insights", async (req, res) => {
    try {
      const { question } = req.body;
      if (!question) {
        return res.status(400).json({ error: "Question is required" });
      }
      
      const insights = await getBusinessInsights(question);
      res.json({ insights });
    } catch (error) {
      console.error("Error generating insights:", error);
      res.status(500).json({ error: "Failed to generate insights" });
    }
  });

  app.get("/api/daily-briefing", async (req, res) => {
    try {
      const briefing = await generateDailyBriefing();
      res.json({ briefing });
    } catch (error) {
      console.error("Error generating daily briefing:", error);
      res.status(500).json({ error: "Failed to generate daily briefing" });
    }
  });

  app.post("/api/analyze-region", async (req, res) => {
    try {
      const { regionName } = req.body;
      if (!regionName) {
        return res.status(400).json({ error: "Region name is required" });
      }
      
      const analysis = await analyzeRegion(regionName);
      res.json({ analysis });
    } catch (error) {
      console.error("Error analyzing region:", error);
      res.status(500).json({ error: "Failed to analyze region" });
    }
  });

  app.post("/api/analyze-product", async (req, res) => {
    try {
      const { productName } = req.body;
      if (!productName) {
        return res.status(400).json({ error: "Product name is required" });
      }
      
      const analysis = await analyzeProduct(productName);
      res.json({ analysis });
    } catch (error) {
      console.error("Error analyzing product:", error);
      res.status(500).json({ error: "Failed to analyze product" });
    }
  });

  app.post("/api/analyze-client", async (req, res) => {
    try {
      const { clientName } = req.body;
      if (!clientName) {
        return res.status(400).json({ error: "Client name is required" });
      }
      
      const analysis = await analyzeClient(clientName);
      res.json({ analysis });
    } catch (error) {
      console.error("Error analyzing client:", error);
      res.status(500).json({ error: "Failed to analyze client" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
