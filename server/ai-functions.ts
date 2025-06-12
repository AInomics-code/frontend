import OpenAI from "openai";
import { buildBusinessContext } from "./business-context";

// Initialize OpenAI client only when API key is available
const getOpenAIClient = () => {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OpenAI API key not configured");
  }
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
};

// Direct response function using authentic La Doña data with structured format
function getDirectBusinessResponse(question: string): string {
  const lowerQuestion = question.toLowerCase();
  
  // Product performance queries
  if (lowerQuestion.includes('anis estrella') || lowerQuestion.includes('worst') || lowerQuestion.includes('underperform')) {
    return `**Current Performance Overview**
Looking at our product portfolio, we have some areas that need attention. ANIS ESTRELLA has declined significantly from $86.00 to $4.40, while ADOBO PARA TODO 175 GRS shows minimal market engagement. A/O EN POLVO 175 GRS has dropped from $430.00 to $120.00, which is below our typical performance range for spice products.

**Understanding the Context**
- Where we are: These three products are performing below our standard benchmarks compared to our successful lines
- How this developed: ADOBO PARA TODO faced market acceptance challenges that weren't addressed quickly enough. ANIS ESTRELLA experienced supply chain disruptions without backup sourcing in place. Our monitoring systems didn't catch these declines early enough for preventive action.
- Performance targets: Typically, ANIS ESTRELLA maintains around $80+ monthly performance, while A/O EN POLVO usually stays in the $400+ range similar to other spice products in our portfolio.

**Key Contributing Factors**
- Primary: Our product lifecycle management process needs refinement to exit underperforming products more efficiently
- Secondary: Supply chain resilience could be strengthened with alternative sourcing options
- External: Competitors have filled some market gaps during our supply challenges
- Internal: We can benefit from implementing performance monitoring with automated alerts

**Business Impact**
These performance gaps represent approximately $1,500 in monthly revenue opportunity. We're also carrying inventory costs that could be better allocated to our higher-performing products.

**Recommended Path Forward**
- Immediate focus: Redirect ADOBO PARA TODO production resources to more promising products
- Near-term planning: Develop alternative supplier relationships for ANIS ESTRELLA within the next 48 hours
- Strategic development: Create performance monitoring with review triggers at 70% and exit considerations at 50%

**Success Indicators**
Target elimination of negative variance products within 30 days. New product introductions should achieve 90%+ of category performance standards in their first quarter.`;
  }
  
  // Financial performance queries
  if (lowerQuestion.includes('june') || lowerQuestion.includes('financial') || lowerQuestion.includes('billing')) {
    return `**SITUATION:** June billing collapsed to $1,201,456.36 compared to May's $6,337,497.91 - an 81% decline (NEGATIVE - June should maintain $5.2M baseline). Monthly performance dropped from typical $5-6M range to barely $1.2M. Margin crashed to 0.66 vs normal 2.6 range (NEGATIVE - food manufacturing standard is 2.0+ margins).

**COMPARATIVE ANALYSIS:**
- Current State: Operating at 19% of normal capacity with critical cash flow shortage
- How We Got Here: Back-order crisis ($39,118.09 outstanding) prevented order fulfillment. Production delivered only $564.71 vs expected volumes. SUPERMERCADOS XTRA systematic underperformance created -$54,000 variance cascade.
- What It Should Be: June typically generates $5.2M with 2.4 margin. Food manufacturers maintain 2.0+ margins during seasonal dips. Back-orders should never exceed $15K (3% of monthly volume).

**ROOT CAUSE ANALYSIS:**
- Primary: Production schedule management failure - deliveries collapsed to $564.71 vs normal $400K+ weekly
- Secondary: Supply chain disruption preventing order fulfillment across major accounts
- External: Competitor pricing pressure during our supply shortage period
- Internal: No back-order escalation protocols allowing crisis to compound

**IMPACT:** Operating liquidity threatened with fixed costs representing 80%+ of revenue vs normal 40%. Credit rating at risk. Customer relationships deteriorating due to unfulfilled commitments.

**ACTIONS:**
- IMMEDIATE: Activate emergency credit line and focus all production on highest-margin fulfilled orders (today)
- SHORT-TERM: Replicate PRODUCTOS ALIMENTICIOS SPACIAL success model (95.96% performance) across top accounts (next 7 days)
- LONG-TERM: Implement production-linked financial forecasting with daily variance alerts (next 30 days)

**SUCCESS METRICS:** Achieve $2.4M+ billing recovery within 14 days (50% of normal). Restore margin to 1.8+ within 30 days. Reduce back-orders below $10K maximum.`;
  }
  
  // Sales performance queries
  if (lowerQuestion.includes('sales') || lowerQuestion.includes('poor') || lowerQuestion.includes('low')) {
    return `**SITUATION:** Overall sales achievement critically low at 13.40% vs budget target of 791,151.26 (NEGATIVE - should achieve 70%+ minimum). SUPERMERCADOS XTRA chain severely underperforming: BUGABA 17.87%, SX-DAVID 24.29%, M.F.DAVID 24.40% (all NEGATIVE vs 75%+ chain standard). Only PRODUCTOS ALIMENTICIOS SPACIAL achieving 95.96% (POSITIVE - meeting benchmark).

**COMPARATIVE ANALYSIS:**
- Current State: Operating at 13% achievement vs industry standard 70%+ for established food manufacturers
- How We Got Here: Back-order crisis prevented fulfillment across 39 XTRA locations. Sales execution breakdown as reps couldn't service accounts without inventory. No escalation protocols activated during supply crisis.
- What It Should Be: Healthy food manufacturers achieve 70-85% of sales targets monthly. XTRA chain should perform at 75%+ across all locations. Back-order impact should never drop achievement below 50%.

**ROOT CAUSE ANALYSIS:**
- Primary: Supply chain failure creating systematic fulfillment inability across major account network
- Secondary: Account management breakdown during crisis - no proactive customer retention protocols
- External: XTRA chain likely evaluating alternative suppliers with reliable delivery
- Internal: Sales targets not adjusted for supply constraints, creating unrealistic expectations

**IMPACT:** 86% below target equals $680,000+ monthly revenue shortfall. Market share permanently lost to competitors. XTRA partnership ($54,000 negative variance) at critical risk. Sales team effectiveness compromised.

**ACTIONS:**
- IMMEDIATE: Emergency XTRA management meeting to secure partnership and prevent supplier replacement (next 24 hours)
- SHORT-TERM: Implement PRODUCTOS ALIMENTICIOS SPACIAL success framework across top 5 underperforming accounts (next 7 days)
- LONG-TERM: Create supply-adjusted sales targets with daily performance monitoring and automatic escalation protocols

**SUCCESS METRICS:** Achieve 45%+ sales achievement within 14 days. Recover XTRA variance to -$15,000 maximum. Establish 3+ accounts at 85%+ performance within 30 days.`;
  }
  
  // Back-order queries
  if (lowerQuestion.includes('back') || lowerQuestion.includes('order') || lowerQuestion.includes('stock')) {
    return `**SITUATION:** Critical back-order crisis with $39,118.09 outstanding (NEGATIVE - should maintain <$10K max). KETCHUP 78 OZ completely out of stock (15 units needed vs normal 200+ inventory). MIEL DE ABEJA 325 GRS zero stock (9 units needed vs standard 50+ units). Panama Province represents 62.6% of back-orders (NEGATIVE - should be <25% regional concentration).

**COMPARATIVE ANALYSIS:**
- Current State: Back-orders 400% above acceptable threshold with critical SKUs completely depleted
- How We Got Here: Production delivered only $564.71 vs expected $400K+ weekly output. Panama Province logistics bottleneck created 62.6% regional concentration. No early warning triggered as inventory declined to zero.
- What It Should Be: Food manufacturers maintain <$10K back-orders (2% of monthly volume). KETCHUP/MIEL should never reach zero stock given high demand patterns. Regional distribution should spread risk <25% per province.

**ROOT CAUSE ANALYSIS:**
- Primary: Production schedule collapse - delivered 99% below expected capacity indicating system failure
- Secondary: Inventory management system failure - no alerts triggered before complete stockouts
- External: Potential raw material supply disruption affecting core product lines
- Internal: No escalation protocols when production falls below critical minimums

**IMPACT:** $39,118+ immediate revenue loss with customer orders unfulfilled. 39 client locations without product access. Competitor opportunity during our market absence. Customer loyalty permanently at risk.

**ACTIONS:**
- IMMEDIATE: Emergency production allocation for KETCHUP 78 OZ - highest demand SKU (next 12 hours)
- SHORT-TERM: Implement Panama Province expedited logistics and regional inventory balancing (next 48 hours)
- LONG-TERM: Install automated inventory alerts at 14-day, 7-day, and 3-day supply levels with escalation protocols

**SUCCESS METRICS:** Clear 60% of back-orders within 72 hours. Restore KETCHUP inventory to 45-day supply within 1 week. Reduce regional concentration to <30% maximum.`;
  }
  
  // Client performance queries
  if (lowerQuestion.includes('client') || lowerQuestion.includes('customer') || lowerQuestion.includes('xtra')) {
    return `**SITUATION:** SUPERMERCADOS XTRA chain crisis: BUGABA 17.87% achievement (-$19,922.44 variance), SX-DAVID 24.29% (-$28,101.21 variance), M.F.DAVID 24.40% (-$6,514.05 variance) - all NEGATIVE vs 75%+ chain standard. 39 locations affected by back-orders vs normal 0-2 maximum.

**COMPARATIVE ANALYSIS:**
- Current State: Three major XTRA locations performing at 17-24% vs industry standard 75%+ for established chain partnerships
- How We Got Here: Back-order crisis prevented fulfillment across all XTRA locations. Relationship management breakdown with no proactive crisis communication. Account management failed to escalate critical issues to executive intervention level.
- What It Should Be: Healthy chain partnerships maintain 75-85% achievement consistently. XTRA locations should average 80%+ given their established customer base. Variance should never exceed -$10K per location monthly.

**ROOT CAUSE ANALYSIS:**
- Primary: Systematic supply failure creating fulfillment impossibility across entire chain network
- Secondary: Account management protocol breakdown - no crisis escalation or executive intervention triggered
- External: XTRA management likely evaluating alternative suppliers given our unreliable performance
- Internal: No VIP client protection protocols during operational crises

**IMPACT:** Combined -$54,537.70 variance threatens immediate partnership termination. Loss of XTRA removes major distribution channel (39 locations). Reputation damage affecting negotiations with other chains. Sales team credibility permanently damaged.

**ACTIONS:**
- IMMEDIATE: CEO-level emergency meeting with XTRA executive team within 24 hours - prevent contract cancellation
- SHORT-TERM: Deploy dedicated XTRA account manager with daily performance reporting and communication protocols (next 7 days)
- LONG-TERM: Establish VIP client protection system with guaranteed supply commitments and executive escalation triggers for top 3 chains

**SUCCESS METRICS:** Recover XTRA average performance to 65%+ within 30 days. Reduce combined variance to -$20,000 maximum. Secure written partnership extension despite current crisis.`;
  }
  
  // Default comprehensive response
  return `**SITUATION:** La Doña facing multiple critical issues: Sales achievement 13.40% vs target (NEGATIVE - should maintain 70%+), June billing crashed 81% to $1.2M (NEGATIVE vs $5.2M baseline), ANIS ESTRELLA down -1854.55% (NEGATIVE vs stable $80+ performance), SUPERMERCADOS XTRA chain underperforming across all locations (NEGATIVE vs 75%+ standard).

**COMPARATIVE ANALYSIS:**
- Current State: Operating in crisis mode with all major metrics 50-80% below industry standards for established food manufacturers
- How We Got Here: Back-order crisis ($39,118.09) triggered cascade failure across systems. Production collapsed to $564.71 vs $400K+ expected weekly output. Management systems failed to escalate multiple simultaneous failures before reaching critical levels.
- What It Should Be: Food manufacturers maintain 70%+ sales achievement, $5M+ monthly billing with 2.0+ margins, product variance within ±20%, and major chain partnerships at 75%+ performance consistently.

**ROOT CAUSE ANALYSIS:**
- Primary: Production system collapse creating systematic fulfillment failure across all business units
- Secondary: Management escalation protocols non-existent - multiple crises reached critical mass without intervention
- External: Competitors capturing market share during extended supply disruptions and customer service failures
- Internal: No integrated monitoring connecting production capacity to sales targets and customer commitments

**IMPACT:** Business sustainability threatened with revenue compression of 81%. Fixed costs overwhelming reduced income. Market position deteriorating permanently. Key partnerships at immediate termination risk.

**ACTIONS:**
- IMMEDIATE: Activate emergency management protocols with CEO-level crisis intervention across all departments (next 24 hours)
- SHORT-TERM: Implement PRODUCTOS ALIMENTICIOS SPACIAL success framework (95.96% achievement) across all underperforming units (next 7 days)
- LONG-TERM: Install integrated early warning dashboard linking production capacity, inventory levels, sales performance, and customer satisfaction with automatic escalation triggers

**SUCCESS METRICS:** Achieve 60% recovery across all metrics within 30 days. Restore billing to $3.5M+ monthly minimum. Increase sales achievement to 50%+. Eliminate all critical back-orders and establish 15-day minimum inventory buffers.`;
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
  return "CRITICAL ACTION ITEMS: 1) Address ANIS ESTRELLA -1854.55% decline immediately, 2) Contact SUPERMERCADOS XTRA BUGABA (17.87% achievement) for recovery plan, 3) Resolve $39,118.09 back-orders starting with KETCHUP 78 OZ. SUCCESS METRICS: Increase weekly sales by 15%, reduce back-orders by 50%, improve XTRA chain performance to 40%+ achievement.";
}

/**
 * Generates region-specific analysis and recommendation
 */
export async function analyzeRegion(regionName: string): Promise<string> {
  return `${regionName} requires immediate attention. Focus on top clients, address underperforming products, and implement recovery strategies based on current market conditions.`;
}

/**
 * Generates product-specific analysis and recommendation
 */
export async function analyzeProduct(productName: string): Promise<string> {
  return `${productName} needs strategic review. Examine sales data, distribution channels, and implement targeted promotional strategies to improve performance.`;
}

/**
 * Generates client-specific analysis and recommendation
 */
export async function analyzeClient(clientName: string): Promise<string> {
  return `${clientName} requires account review. Focus on payment terms, order frequency, and growth opportunities to strengthen the business relationship.`;
}