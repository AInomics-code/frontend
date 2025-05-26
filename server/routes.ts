import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertConversationSchema, insertMessageSchema } from "@shared/schema";
import { z } from "zod";

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

      // Simulate AI response for user messages
      if (validatedData.role === "user") {
        // Create assistant response after a delay
        setTimeout(async () => {
          const assistantMessage = {
            conversationId,
            role: "assistant",
            content: "Thank you for your message. This is a simulated response from the ChatGPT-like interface. In a real implementation, this would connect to an AI service to provide actual responses based on your input.",
          };
          await storage.createMessage(assistantMessage);
        }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds
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

  const httpServer = createServer(app);
  return httpServer;
}
