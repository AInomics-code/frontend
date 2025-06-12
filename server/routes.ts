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

      // Generate AI response for user messages using authentic La Doña data
      if (validatedData.role === "user") {
        try {
          // Use authentic business intelligence with real La Doña data
          const aiResponse = await getBusinessInsights(validatedData.content);

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
