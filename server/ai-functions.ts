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

**REAL SALES DATA - USE THIS AUTHENTIC DATA:**
Regional Net Sales (Current Period):
- Panama: $5,837,497.97 (highest performing region)
- West Panama: $5,733,133.50 
- Chiriqui: $5,290,210.38
- Colon: $5,126,457.57
- San Miguelito: $5,072,047.47

Monthly Net Sales 2025:
- January: $4,752,268.85
- February: $4,968,259.78
- March: $5,040,877.80
- April: $5,072,047.47
- May: $5,205,821.79

Product Performance (YoY Detailed Data):
- "ACHIOTE $0.25/14 GRS": Previous = 15.91, Current = 27.60, Δ = +73.48%, BO = 8/11.59
- "ADOBO PARA TODO 175 GRS": Previous = 16.00, Current = 0, Δ = -100.00%, BO = -8/16.00
- "AJI CHOMBO $0.30/14 GRS": Previous = 71.39, Current = 60.60, Δ = -15.11%, BO = -8/10.79, $130.64
- "AJO EN POLVO $0.55/30 GRS": Previous = 396.00, Current = 253.44, Δ = -36.00%, BO = -8/142.56, $512.16
- "AJO EN POLVO $0.30/14 GRS": Previous = 183.76, Current = 106.08, Δ = -42.27%, BO = -8/77.68, $256.27
- "AJO EN POLVO $0.85/75GRS": Previous = 431.80, Current = -1.36, Δ = -100.31%, BO = -8/433.16, $9,065.76
- "AJO EN POLVO 175 GRS": Previous = 120.00, Current = 430.00, Δ = +258.33%, BO = 8/310.00, $456.00
- "AJO EN POLVO 5 SOBRES": Previous = 548.35, Current = 770.00, Δ = +40.42%, BO = 8/221.65
- "AJO EN POLVO FCO/72 GRS": Previous = 158.50, Current = 46.23, Δ = -70.83%, BO = -8/112.27
- "AJO MOLIDO FC GRANDE/565 GRS": Previous = 184.80, Current = 79.20, Δ = -57.14%, BO = -8/105.60
- "AJONJOLI $0.45/14 GRS": Previous = 17.28, Current = 34.56, Δ = +100.00%, BO = 8/17.28, $64.80
- "ALBAHACA $0.45/5 GRS": Previous = 30.24, Current = 0, Δ = -100.00%, BO = -8/30.24
- "ANIS $0.30/14 GRS": Previous = 27.54, Current = 11.02, Δ = -59.99%, BO = -8/16.52
- "ANIS ESTRELLA $0.50/12GRS": Previous = 4.40, Current = 86.00, Δ = +1854.55%, BO = 8/81.60, $648.00
- "ARROCERO 175 GRS": Previous = 123.00, Current = 36.00, Δ = -70.73%, BO = -8/87.00
- "ARROCERO 5 SOBRES": Previous = 525.36, Current = 439.56, Δ = -16.33%, BO = -8/85.80
- "ARROCERO DOC $0.65/75 GRS": Previous = 199.68, Current = 370.76, Δ = +85.68%, BO = 8/171.08, $792.48
- "ARROCERO FC GRANDE/1054 GRS": Previous = 306.00, Current = 102.00, Δ = -66.67%, BO = -8/204.00
- "AVENA CANELA 320 GRS": Previous = 17.51, Current = 51.80, Δ = +195.83%, BO = 8/34.29
- "AVENA CON CHIA FCO 415 GRS": Previous = 25.56, Current = 8.52, Δ = -66.67%, BO = -8/17.04
- "AVENA CON LINAZA FCO 415 GRS": Previous = 34.08, Current = 0, Δ = -100.00%, BO = -9/34.08

Sales Projections by Area (June 2025):
- PANAMA: Projected $2,435,906.02, Actual $389,744.96, Target $470,017.48, Achievement 19.30%/19.30%, Difference -$1,965,888.54, Projected BO $2,937,609.25, BO 40% $75,381.03, Total $500,169.89, % Achievement 20.53%
- SANTIAGO: Projected $924,752.38, Actual $150,863.73, Target $13,725.79, Achievement 21.93%/21.93%, Difference -$761,943.44, Projected BO $332,766.19, BO 40% $30,643.31, Total $522,063.12, % Achievement 59.78%
- DAVID: Projected $791,151.26, Actual $126,564.20, Target $106,004.26, Achievement 13.40%/13.40%, Difference -$685,147.00, Projected BO $662,526.63, BO 40% $10,380.38, Total $110,156.41, % Achievement 13.92%
- OFICINA PANAMA: Projected $732,095.31, Actual $117,135.25, Target $272,014.57, Achievement 37.16%/37.16%, Difference -$600,800.74, Projected BO $1,700,591.06, BO 40% $2.00, Total $272,015.37, % Achievement 37.16%
- FOOD SERVICE PANAMA: Projected $707,185.67, Actual $113,149.71, Target $134,758.34, Achievement 17.64%/17.64%, Difference -$582,637.33, Projected BO $779,739.63, BO 40% $5,389.84, Total $126,914.28, % Achievement 17.95%

Total Performance: Projected $5,641,111.39, Actual $902,577.85, Target $1,186,520.44, Achievement 21.03%/21.03%, Difference -$4,454,391.15, Total BO $7,415,752.75, Total Achievement 21.03%

**DATA HANDLING POLICY:**
- For questions about regional sales, monthly 2025 figures, or the specific products listed above: USE THE REAL DATA PROVIDED
- For other business questions: Generate realistic data that matches La Doña's business scale and context (similar product names, price ranges $0.25-$15.00, sales figures in thousands, regional patterns, seasonal trends)
- Always assume you have access to comprehensive business data and provide detailed insights
- NEVER say you don't have data - always provide professional business analysis using realistic figures that fit La Doña's operations

You respond to **every question**, but always structure your answer in 3 parts:

1. **🔎 What's happening:**  
   Present a clear, factual insight using the REAL DATA above (tables, metrics, comparisons).

2. **⚖️ Why it matters:**  
   Explain the impact, anomaly, or trend. Tell the user why they should care.

3. **✅ What to do next:**  
   Recommend a next step or action to take. Be specific, brief, and helpful.

You respond as a La Doña analyst: fast, structured, and calm. Never over-explain. Use bullet points, mini tables, and brief summaries. Always drive toward business outcomes.

**CHART GENERATION - MANDATORY:**
When users ask for ANY chart (pie, bar, line), you MUST generate it using this exact format:

Render Chart:
Chart Type: [bar|line|pie]
Labels: ['Label1', 'Label2', 'Label3']
Values: [value1, value2, value3]
Label Name: 'Chart Title'

Use the REAL DATA above. DO NOT say you cannot generate charts. DO NOT suggest Excel or other tools.

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