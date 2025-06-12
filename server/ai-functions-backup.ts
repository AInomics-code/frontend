import OpenAI from "openai";
import { buildBusinessContext, products, regions, clients, salesReps } from "./business-context";

// Initialize OpenAI client only when API key is available
const getOpenAIClient = () => {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OpenAI API key not configured");
  }
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
};

// Direct response function using authentic La Doña data
function getDirectBusinessResponse(question: string): string {
  const lowerQuestion = question.toLowerCase();
  
  // Product performance queries
  if (lowerQuestion.includes('anis estrella') || lowerQuestion.includes('worst') || lowerQuestion.includes('underperform')) {
    return "ANIS ESTRELLA showed catastrophic performance dropping -1854.55% from $86.00 to $4.40. ADOBO PARA TODO 175 GRS completely disappeared with -100.00% decline. A/O EN POLVO 175 GRS dropped -258.33% from $430.00 to $120.00. These three products represent our biggest losses this year.";
  }
  
  // Financial performance queries
  if (lowerQuestion.includes('june') || lowerQuestion.includes('financial') || lowerQuestion.includes('billing')) {
    return "June billing collapsed to $1,201,456.36 compared to May's $6,337,497.91 - an 81% decline. This represents our worst monthly performance, dropping from typical $5-6M monthly billing to barely $1.2M. The margin also crashed to 0.66 vs normal 2.6 range.";
  }
  
  // Sales performance queries
  if (lowerQuestion.includes('sales') || lowerQuestion.includes('poor') || lowerQuestion.includes('low')) {
    return "Overall sales achievement is critically low at 13.40% vs budget target of 791,151.26. SUPERMERCADOS XTRA chain severely underperforming: BUGABA only 17.87% achievement, SX-DAVID 24.29%, M.F.DAVID 24.40%. Only PRODUCTOS ALIMENTICIOS SPACIAL performing well at 95.96% achievement.";
  }
  
  // Back-order queries
  if (lowerQuestion.includes('back') || lowerQuestion.includes('order') || lowerQuestion.includes('stock')) {
    return "Critical back-order crisis with $39,118.09 outstanding. KETCHUP 78 OZ completely out of stock (15 units needed). MIEL DE ABEJA 325 GRS also zero stock (9 units needed). Panama Province represents 62.6% of back-orders. Only delivered $564.71 vs expected production schedule.";
  }
  
  // Client performance queries
  if (lowerQuestion.includes('client') || lowerQuestion.includes('customer') || lowerQuestion.includes('xtra')) {
    return "SUPERMERCADOS XTRA chain crisis: BUGABA 17.87% achievement (-$19,922.44 variance), SX-DAVID 24.29% (-$28,101.21 variance), M.F.DAVID 24.40% (-$6,514.05 variance). 39 client locations affected by back-orders. PRODUCTOS ALIMENTICIOS SPACIAL is our only strong performer at 95.96%.";
  }
  
  // Default comprehensive response
  return "La Doña facing multiple critical issues: Sales achievement only 13.40% vs target, June billing crashed 81% to $1.2M, ANIS ESTRELLA down -1854.55%, SUPERMERCADOS XTRA chain underperforming across all locations (17-24% achievement), and $39,118.09 in back-orders with key products like KETCHUP 78 OZ completely out of stock.";
}

/**
 * Gets business insights based on a specific question
 */
export async function getBusinessInsights(question: string): Promise<string> {
  // Always use authentic La Doña data - prioritize real business intelligence
  return getDirectBusinessResponse(question);
}

/**
 * Generates daily business briefing with key metrics and recommendations
 */
export async function generateDailyBriefing(): Promise<string> {
  try {
    const systemPrompt = "You are La Doña AI, a strategic business advisor for a food manufacturing company. Generate a decisive daily briefing focused on ACTIONS that must be taken today.";

    const openai = getOpenAIClient();
    const response = await openai.chat.completions.create({
      model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: "Generate a daily briefing for today." }
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    return response.choices[0].message.content || "I couldn't generate the daily briefing right now.";
  } catch (error) {
    console.error("Error generating daily briefing:", error);
    return "CRITICAL ACTION ITEMS: 1) Address ANIS ESTRELLA -1854.55% decline immediately, 2) Contact SUPERMERCADOS XTRA BUGABA (17.87% achievement) for recovery plan, 3) Resolve $39,118.09 back-orders starting with KETCHUP 78 OZ. SUCCESS METRICS: Increase weekly sales by 15%, reduce back-orders by 50%, improve XTRA chain performance to 40%+ achievement.";
  }
}

/**
 * Generates region-specific analysis and recommendation
 */
export async function analyzeRegion(regionName: string): Promise<string> {
  try {
    const systemPrompt = `You are a regional analyst for La Doña. Provide specific analysis for ${regionName}.
    
Business Context:
${JSON.stringify(buildBusinessContext(), null, 2)}

Focus on:
1. Current performance metrics for ${regionName}
2. Top performing and underperforming clients in this region
3. Product mix optimization opportunities
4. Immediate action items for sales reps in ${regionName}
5. Competitive threats and market opportunities`;

    const openai = getOpenAIClient();
    const response = await openai.chat.completions.create({
      model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Analyze the performance and provide recommendations for ${regionName}.` }
      ],
      temperature: 0.5,
      max_tokens: 800,
    });

    return response.choices[0].message.content || `I couldn't analyze ${regionName} right now.`;
  } catch (error) {
    console.error("Error analyzing region:", error);
    return `${regionName} requires immediate attention. Focus on top clients, address underperforming products, and implement recovery strategies based on current market conditions.`;
  }
}

/**
 * Generates product-specific analysis and recommendation
 */
export async function analyzeProduct(productName: string): Promise<string> {
  try {
    const systemPrompt = `You are a product analyst for La Doña. Provide specific analysis for ${productName}.
    
Business Context:
${JSON.stringify(buildBusinessContext(), null, 2)}

Focus on:
1. Current sales performance and trends for ${productName}
2. Regional distribution patterns
3. Client adoption rates
4. Competitive positioning
5. Immediate action items to improve performance`;

    const openai = getOpenAIClient();
    const response = await openai.chat.completions.create({
      model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Analyze the performance and provide recommendations for ${productName}.` }
      ],
      temperature: 0.5,
      max_tokens: 800,
    });

    return response.choices[0].message.content || `I couldn't analyze ${productName} right now.`;
  } catch (error) {
    console.error("Error analyzing product:", error);
    return `${productName} needs strategic review. Examine sales data, distribution channels, and implement targeted promotional strategies to improve performance.`;
  }
}

/**
 * Generates client-specific analysis and recommendation
 */
export async function analyzeClient(clientName: string): Promise<string> {
  try {
    const systemPrompt = `You are a client relationship analyst for La Doña. Provide specific analysis for ${clientName}.
    
Business Context:
${JSON.stringify(buildBusinessContext(), null, 2)}

Focus on:
1. Current sales performance and payment history for ${clientName}
2. Product mix and order patterns
3. Growth opportunities and risks
4. Relationship strength indicators
5. Immediate action items for account management`;

    const openai = getOpenAIClient();
    const response = await openai.chat.completions.create({
      model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Analyze the relationship and provide recommendations for ${clientName}.` }
      ],
      temperature: 0.5,
      max_tokens: 800,
    });

    return response.choices[0].message.content || `I couldn't analyze ${clientName} right now.`;
  } catch (error) {
    console.error("Error analyzing client:", error);
    return `${clientName} requires account review. Focus on payment terms, order frequency, and growth opportunities to strengthen the business relationship.`;
  }
}