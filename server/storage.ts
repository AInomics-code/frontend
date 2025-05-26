import { conversations, messages, type Conversation, type Message, type InsertConversation, type InsertMessage } from "@shared/schema";

export interface IStorage {
  getConversations(): Promise<Conversation[]>;
  getConversation(id: number): Promise<Conversation | undefined>;
  createConversation(conversation: InsertConversation): Promise<Conversation>;
  deleteConversation(id: number): Promise<void>;
  getMessages(conversationId: number): Promise<Message[]>;
  createMessage(message: InsertMessage): Promise<Message>;
}

export class MemStorage implements IStorage {
  private conversations: Map<number, Conversation>;
  private messages: Map<number, Message>;
  private conversationIdCounter: number;
  private messageIdCounter: number;

  constructor() {
    this.conversations = new Map();
    this.messages = new Map();
    this.conversationIdCounter = 1;
    this.messageIdCounter = 1;

    // Initialize with sample conversations
    this.initializeDefaultData();
  }

  private initializeDefaultData() {
    const now = new Date();
    const twoHoursAgo = new Date(now.getTime() - 2 * 60 * 60 * 1000);
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const twoDaysAgo = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000);
    const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    // Sample conversations
    const sampleConversations = [
      { title: "How to learn React hooks?", createdAt: twoHoursAgo, updatedAt: twoHoursAgo },
      { title: "Python data structures explained", createdAt: yesterday, updatedAt: yesterday },
      { title: "Best practices for API design", createdAt: twoDaysAgo, updatedAt: twoDaysAgo },
      { title: "Machine learning algorithms overview", createdAt: threeDaysAgo, updatedAt: threeDaysAgo },
      { title: "CSS Grid vs Flexbox comparison", createdAt: oneWeekAgo, updatedAt: oneWeekAgo },
    ];

    sampleConversations.forEach(conv => {
      const conversation: Conversation = {
        id: this.conversationIdCounter++,
        ...conv,
      };
      this.conversations.set(conversation.id, conversation);
    });

    // Add sample messages for the first conversation
    const firstConvId = 1;
    const sampleMessages = [
      {
        conversationId: firstConvId,
        role: "user",
        content: "How do React hooks work and when should I use useState vs useEffect?",
        createdAt: twoHoursAgo,
      },
      {
        conversationId: firstConvId,
        role: "assistant",
        content: "React hooks are functions that let you use state and other React features in functional components. Here's a breakdown of useState and useEffect:\n\n**useState:**\n- Manages local component state\n- Returns current state value and a setter function\n- Use when you need to store and update data that affects rendering\n\n**useEffect:**\n- Handles side effects (API calls, subscriptions, DOM manipulation)\n- Runs after render by default\n- Use for operations that don't belong in the render phase\n\nExample usage scenarios:\n- `useState`: Form inputs, toggles, counters\n- `useEffect`: Fetching data, setting up timers, cleanup",
        createdAt: new Date(twoHoursAgo.getTime() + 60000),
      },
      {
        conversationId: firstConvId,
        role: "user",
        content: "Can you show me a practical example of using both hooks together?",
        createdAt: new Date(twoHoursAgo.getTime() + 120000),
      },
    ];

    sampleMessages.forEach(msg => {
      const message: Message = {
        id: this.messageIdCounter++,
        ...msg,
      };
      this.messages.set(message.id, message);
    });
  }

  async getConversations(): Promise<Conversation[]> {
    return Array.from(this.conversations.values())
      .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
  }

  async getConversation(id: number): Promise<Conversation | undefined> {
    return this.conversations.get(id);
  }

  async createConversation(insertConversation: InsertConversation): Promise<Conversation> {
    const now = new Date();
    const conversation: Conversation = {
      id: this.conversationIdCounter++,
      ...insertConversation,
      createdAt: now,
      updatedAt: now,
    };
    this.conversations.set(conversation.id, conversation);
    return conversation;
  }

  async deleteConversation(id: number): Promise<void> {
    this.conversations.delete(id);
    // Also delete associated messages
    const messagesToDelete = Array.from(this.messages.values())
      .filter(msg => msg.conversationId === id);
    messagesToDelete.forEach(msg => this.messages.delete(msg.id));
  }

  async getMessages(conversationId: number): Promise<Message[]> {
    return Array.from(this.messages.values())
      .filter(msg => msg.conversationId === conversationId)
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const message: Message = {
      id: this.messageIdCounter++,
      ...insertMessage,
      createdAt: new Date(),
    };
    this.messages.set(message.id, message);

    // Update conversation's updatedAt timestamp
    const conversation = this.conversations.get(insertMessage.conversationId);
    if (conversation) {
      conversation.updatedAt = new Date();
      this.conversations.set(conversation.id, conversation);
    }

    return message;
  }
}

export const storage = new MemStorage();
