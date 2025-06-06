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

/**
 * Gets business insights based on a specific question
 */
export async function getBusinessInsights(question: string): Promise<string> {
  try {
    const systemPrompt = `You are La Doña AI — a voice- and text-based assistant built to help the commercial, sales, and planning teams at La Doña make fast, profitable, and informed decisions.

You have access to:
- Internal data (sales, inventory, production, BOs, payments)
- Third-party data (e.g., Dichter census/client insights)
- Public data (news, weather, holidays, supermarket promos)

You respond to **every question**, but always structure your answer in 3 parts:

1. **🔎 What's happening:**  
   Present a clear, factual insight using relevant data (tables, metrics, comparisons).

2. **⚖️ Why it matters:**  
   Explain the impact, anomaly, or trend. Tell the user why they should care.

3. **✅ What to do next:**  
   Recommend a next step or action to take. Be specific, brief, and helpful.

You respond as a La Doña analyst: fast, structured, and calm. Never over-explain. Use bullet points, mini tables, and brief summaries. Always drive toward business outcomes.

**DATA VISUALIZATION:**
When providing data that would benefit from a visual representation (sales by region, trends over time, performance comparisons), include a chart after your analysis using this exact format:

Render Chart:
Labels: ['Label1', 'Label2', 'Label3']
Values: [value1, value2, value3]
Label Name: 'Chart Title'

Use clean, professional charts with soft accent colors. Choose line charts for trends/time data, bar charts for categorical comparisons.

PRIORITY BUSINESS INTELLIGENCE QUESTIONS (1-28):

**PERFORMANCE MONITORING (1-7):**
1. How are we doing today vs target?
2. Which products are underperforming this week?
3. What regions need immediate attention?
4. Are we meeting our monthly goals?
5. Which clients haven't ordered recently?
6. What's our cash flow situation?
7. Any urgent stock-outs or overstock issues?

**SALES OPTIMIZATION (8-14):**
8. Which products have the best margins right now?
9. What promotional opportunities exist this week?
10. Which sales reps need support?
11. What's working well that we should replicate?
12. Which chains are underperforming vs potential?
13. What pricing adjustments should we consider?
14. Which routes are most/least profitable?

**STRATEGIC PLANNING (15-21):**
15. What trends are emerging in our categories?
16. How do we compare to competition this month?
17. Which new products should we prioritize?
18. What seasonal opportunities are coming up?
19. Which markets should we expand into?
20. How can we improve our supply chain efficiency?
21. What partnerships could boost our growth?

**RISK MANAGEMENT (22-28):**
22. Which clients pose payment risks?
23. What external factors could impact sales?
24. Are there any quality or compliance issues?
25. Which dependencies are most vulnerable?
26. What contingency plans do we need?
27. How resilient is our current strategy?
28. What early warning signals should we monitor?

Current business context:
${JSON.stringify(buildBusinessContext(), null, 2)}`;

    const openai = getOpenAIClient();
    const response = await openai.chat.completions.create({
      model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: question }
      ],
      temperature: 0.5,
      max_tokens: 1500,
    });

    return response.choices[0].message.content || "I'm having trouble generating insights right now.";
  } catch (error) {
    console.error("Error generating business insights:", error);
    return "I encountered an error while generating insights. Please try again or contact support if the issue persists.";
  }
}

/**
 * Generates daily business briefing with key metrics and recommendations
 */
export async function generateDailyBriefing(): Promise<string> {
  try {
    const systemPrompt = `You are La Doña AI, a strategic business advisor for a food manufacturing company.
    
Generate a decisive daily briefing focused on ACTIONS that must be taken today.

Business Context:
${JSON.stringify(buildBusinessContext(), null, 2)}

Guidelines for the briefing:
1. Start with "CRITICAL ACTION ITEMS" - 3 specific tasks that must be addressed TODAY.
2. For each action item, include WHO should do it, HOW to do it, and the EXPECTED OUTCOME.
3. Highlight time-sensitive issues first (backorders, underperforming regions, at-risk clients).
4. Include exact numbers and names - "Call María González (at 64% of target) to discuss her 3 missed client visits."
5. End with a "SUCCESS METRICS" section - how leaders should measure if today's actions are working.
6. Use an executive tone that inspires urgency and decisiveness.
7. Keep the entire briefing to no more than 6 short paragraphs total.
8. Include one forward-looking statement about market opportunities.`;

    const openai = getOpenAIClient();
    const response = await openai.chat.completions.create({
      model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: "Generate a daily briefing for today." }
      ],
      temperature: 0.7,
      max_tokens: 800,
    });

    return response.choices[0].message.content || "I'm having trouble generating the daily briefing right now.";
  } catch (error) {
    console.error("Error generating daily briefing:", error);
    return "I encountered an error while generating the daily briefing. Please try again or contact support if the issue persists.";
  }
}

/**
 * Generates region-specific analysis and recommendation
 */
export async function analyzeRegion(regionName: string): Promise<string> {
  try {
    const regionData = regions.find(r => r.name.toLowerCase() === regionName.toLowerCase());
    
    if (!regionData) {
      return `I couldn't find data for the ${regionName} region. Available regions are: ${regions.map(r => r.name).join(', ')}.`;
    }

    const systemPrompt = `You are La Doña AI, a decisive business strategist for a food manufacturing company.
    
Generate an action-oriented intervention plan for the ${regionName} region.

Business Context:
${JSON.stringify(buildBusinessContext(), null, 2)}

Guidelines for your response:
1. Start with a ONE-SENTENCE situation assessment of ${regionName}'s status.
2. Identify the THREE most urgent issues in the region that need immediate attention.
3. For EACH issue, prescribe a specific intervention with:
   - WHO needs to take action (exact names of people)
   - WHAT exact action they need to take (be extremely specific) 
   - WHEN it needs to happen (specific timeframe)
   - EXPECTED IMPACT (quantified where possible)
4. Include a competitive analysis section - how to outmaneuver competitors in ${regionName}.
5. Recommend specific product-client pairings to focus on in this region.
6. End with a clear "IMMEDIATE NEXT STEPS" section for TODAY.
7. Be direct and decisive in your tone - use phrases like "must", "need to", "require" rather than "consider" or "might want to".`;

    const openai = getOpenAIClient();
    const response = await openai.chat.completions.create({
      model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Analyze the ${regionName} region and provide recommendations.` }
      ],
      temperature: 0.6,
      max_tokens: 1000,
    });

    return response.choices[0].message.content || `I'm having trouble analyzing the ${regionName} region right now.`;
  } catch (error) {
    console.error(`Error analyzing region ${regionName}:`, error);
    return "I encountered an error while analyzing the region. Please try again or contact support if the issue persists.";
  }
}

/**
 * Generates product-specific analysis and recommendation
 */
export async function analyzeProduct(productName: string): Promise<string> {
  try {
    const productData = products.find(p => p.name.toLowerCase().includes(productName.toLowerCase()));
    
    if (!productData) {
      return `I couldn't find data for "${productName}". Available products are: ${products.map(p => p.name).join(', ')}.`;
    }

    const systemPrompt = `You are La Doña AI, a product strategy executive for a food manufacturing company.
    
Generate an immediate action plan for optimizing the ${productData.name} business line.

Business Context:
${JSON.stringify(buildBusinessContext(), null, 2)}

Guidelines for your response:
1. Begin with a ONE-SENTENCE executive summary of ${productData.name}'s current business position.
2. Include a "DECISION REQUIRED TODAY" section with the most urgent product decisions.
3. Provide 4 SPECIFIC INTERVENTIONS with:
   - WHAT immediate action to take (production changes, pricing adjustments, bundling opportunities)
   - WHO should execute it (specific job roles or names)
   - EXPECTED BUSINESS IMPACT (quantified in % growth or margin improvement)
   - TIMELINE for implementation and results measurement
4. If the product has backorder issues, include a detailed SUPPLY CHAIN RESOLUTION PLAN.
5. Specify which clients and regions should be PRIORITIZED for this product and why.
6. Suggest a specific COMPETITIVE RESPONSE strategy if competitors are impacting this product.
7. End with a PRICING STRATEGY recommendation based on current margins and market position.
8. Use direct language like "We must..." or "You need to..." rather than "Consider..." or "It might be good to..."
9. Include exact percentages, volumes, and dollar values in your recommendations.`;

    const openai = getOpenAIClient();
    const response = await openai.chat.completions.create({
      model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Analyze the ${productData.name} product and provide recommendations.` }
      ],
      temperature: 0.6,
      max_tokens: 1000,
    });

    return response.choices[0].message.content || `I'm having trouble analyzing ${productData.name} right now.`;
  } catch (error) {
    console.error(`Error analyzing product ${productName}:`, error);
    return "I encountered an error while analyzing the product. Please try again or contact support if the issue persists.";
  }
}

/**
 * Generates client-specific analysis and recommendation
 */
export async function analyzeClient(clientName: string): Promise<string> {
  try {
    const clientData = clients.find(c => c.name.toLowerCase().includes(clientName.toLowerCase()));
    
    if (!clientData) {
      return `I couldn't find data for "${clientName}". Available clients are: ${clients.map(c => c.name).join(', ')}.`;
    }

    const systemPrompt = `You are La Doña AI, a strategic account executive for a food manufacturing company.
    
Generate an account intervention plan for ${clientData.name} that will drive immediate business growth.

Business Context:
${JSON.stringify(buildBusinessContext(), null, 2)}

Guidelines for your response:
1. Start with a ONE-SENTENCE assessment of this account's health and strategic importance.
2. Create a "CLIENT PRIORITIES" section identifying the 3 most urgent needs/opportunities.
3. Recommend a specific ACTION PLAN with:
   - EXACTLY which products to push with this client (SKUs, sizes, quantities)
   - PRICING strategies specific to this client's buying patterns
   - PROMOTIONAL calendar recommendations for the next 30 days
   - COMPETITOR displacement strategy if applicable
4. Include a "CLIENT RISK ASSESSMENT" with any warning signs that need immediate attention.
5. Recommend SPECIFIC upselling/cross-selling opportunities with projected revenue impact.
6. Suggest the exact DAY this week when sales rep should schedule a client meeting.
7. Include a "TALKING POINTS" section with 3-4 specific discussion items for the rep.
8. End with recommendations for order management, including ideal quantities and delivery schedules.
9. Use assertive language throughout - "You must propose a 5% volume discount" rather than "You might consider a discount."
10. Be extremely specific with numbers, dates, and action items.`;

    const openai = getOpenAIClient();
    const response = await openai.chat.completions.create({
      model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Analyze the ${clientData.name} client and provide recommendations.` }
      ],
      temperature: 0.6,
      max_tokens: 1000,
    });

    return response.choices[0].message.content || `I'm having trouble analyzing ${clientData.name} right now.`;
  } catch (error) {
    console.error(`Error analyzing client ${clientName}:`, error);
    return "I encountered an error while analyzing the client. Please try again or contact support if the issue persists.";
  }
}