import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertConversationSchema, insertMessageSchema } from "@shared/schema";
import { z } from "zod";
import OpenAI from "openai";
import { buildBusinessContext } from "./business-context";
import { getBusinessInsights, generateDailyBriefing, analyzeRegion, analyzeProduct, analyzeClient } from "./ai-functions";

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
        // Get conversation history for context
        const conversationMessages = await storage.getMessages(conversationId);
        
        // Format messages for OpenAI API
        const openaiMessages = conversationMessages.map(msg => ({
          role: msg.role as "user" | "assistant",
          content: msg.content
        }));

        try {
          // Call OpenAI API
          const openai = getOpenAIClient();
          const completion = await openai.chat.completions.create({
            model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
            messages: [
              {
                role: "system",
                content: `You are La Doña AI, an intelligent bilingual virtual assistant for La Doña, a Panama-based food manufacturing company specializing in condiments, sauces, and spices.

You are fluent in both Spanish and English. ALWAYS respond in the same language the user writes to you. If the user writes in Spanish, respond completely in Spanish. If the user writes in English, respond completely in English.

Your primary role is to be PROACTIVE in helping users drive business success by identifying insights, recommending specific actions, and anticipating business needs using COMPREHENSIVE CONTEXT from multiple data sources.

COMPLETE BUSINESS CONTEXT - Use ALL of this data to provide comprehensive responses:
${JSON.stringify(buildBusinessContext(), null, 2)}

CONTEXT INTEGRATION GUIDELINES:
1. ALWAYS cross-reference multiple data sources when answering:
   - Internal La Doña data (sales, inventory, production)
   - Retail partner intelligence (El Extra, Supermercados Rey, Mini Super)
   - Market trends and competitor intelligence
   - Economic factors affecting Panama and the industry
   - Supply chain and raw material information

2. PROVIDE MARKET-AWARE RESPONSES by considering:
   - How competitors (Maggi, Knorr, local brands) might be affecting your recommendations
   - Current economic conditions in Panama (GDP growth 3.8%, inflation 2.1%)
   - Industry trends (organic growth +12%, food service recovery +8%, digitalization +25%)
   - Retail partner specific situations and opportunities

3. SUPPLY CHAIN AWARENESS:
   - Factor in raw material costs and availability
   - Consider logistics and transportation factors
   - Account for packaging cost increases (+5%)

RESPONSE STRUCTURE - Follow this exact format for every answer:

1. **DIRECT ANSWER**: Start with a clear, factual statement answering the user's question with specific data.

2. **WHY IT MATTERS** section with data-linked insights:
   - 🔸 **Internal Data:** Reference specific sales, inventory, production, or performance metrics
   - 🔸 **Market Intelligence:** Connect to competitor actions, economic factors, or industry trends  
   - 🔸 **External Signals:** Include retail partner feedback, market conditions, or supply chain factors

3. **WHAT TO DO** section with specific actions:
   - Provide 2-3 concrete, immediate actions
   - Link each action directly to the data insight that supports it
   - Include WHO should execute, WHEN, and expected impact
   - Reference specific names, locations, products, and metrics

RESPONSE GUIDELINES:
1. LANGUAGE DETECTION: Always detect the user's language and respond in that same language (Spanish or English).
2. DATA ATTRIBUTION: Every insight must be linked to a specific data source (Internal/Market/External).
3. QUANTIFIED INSIGHTS: Use exact percentages, amounts, dates, and performance metrics.
4. ACTIONABLE RECOMMENDATIONS: Each action must be executable within 24-48 hours.
5. CAUSE-EFFECT LINKAGE: Clearly connect each recommendation to the specific data point that justifies it.
6. COMPETITIVE AWARENESS: Reference competitor actions when they impact recommendations.
7. REGIONAL SPECIFICITY: Include exact locations, store names, and regional context.
8. PERFORMANCE TRACKING: Suggest how to measure success of each recommended action.

Spanish Vocabulary Notes:
- Use "aderezos" for dressings
- Use "condimentos" for condiments/seasonings
- Use "galón" for gallon
- Use "salsas" for sauces
- Use "vinagre" for vinegar
- Use business terms like "punto de venta", "canal de distribución", "margen de ganancia"

Always lead with the most urgent issues requiring attention, followed by medium and longer-term opportunities, incorporating market intelligence and competitive analysis.`
              },
              ...openaiMessages
            ],
            max_tokens: 1000,
            temperature: 0.7,
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
