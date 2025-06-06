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
        // Get conversation history for context
        const conversationMessages = await storage.getMessages(conversationId);
        
        // Format messages for OpenAI API
        const openaiMessages = conversationMessages.map(msg => ({
          role: msg.role as "user" | "assistant",
          content: msg.content
        }));

        try {
          // First check if this is a specialized business intelligence query
          const queryAnalysis = analyzeQuery(message.content);
          
          if (queryAnalysis.confidence > 0.8) {
            // Use specialized response for high-confidence BI queries
            const specializedResponse = generateSpecializedResponse(queryAnalysis.type, queryAnalysis.parameters);
            
            const aiMessage = {
              id: Date.now() + 1,
              conversationId,
              role: "assistant" as const,
              content: specializedResponse,
              timestamp: new Date()
            };
            await storage.createMessage(aiMessage);
            
            res.status(201).json(message);
            return;
          }

          // Fall back to OpenAI for general queries
          const openai = getOpenAIClient();
          const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
              {
                role: "system",
                content: `You are La Doña AI, a sales assistant bot. You ONLY answer based on this sales dashboard data:

DASHBOARD SUMMARY:
- Performance Score: 88
- Sales Target Met: 82%
- Product Opportunities: Vinagre Premium (High), Mango Salsa (Low)

REGION PERFORMANCE:
- Chiriquí: Status = At Risk, Sales = $52,000, Target = $80,000, Products = Vinagre Premium, Mango Salsa
- Colón: Status = At Risk, Sales = $39,000, Target = $75,000, Products = Aji Verde
- Panamá City: Status = Stable, Sales = $90,000, Target = $90,000, Products = Vinagre Premium, Aji Amarillo

KEY BUSINESS DATA:
${JSON.stringify(buildBusinessContext(), null, 2)}

STRICT RULES:
1. ONLY answer questions related to sales dashboard, regions, products, performance metrics, and business data shown above
2. If the user asks about anything unrelated (like React, coding, general topics), respond: "Sorry, I can only help with La Doña sales dashboard information."
3. Always provide specific numbers, percentages, and actionable recommendations
4. Focus on immediate business actions and opportunities
5. Reference exact region names, product names, and sales figures from the data

RESPONSE FORMAT:
- Start with key dashboard insight
- Provide specific recommendation with numbers
- End with immediate next step`
              },
              ...openaiMessages
            ],
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
