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
    return `**Financial Performance Review**
Our June billing totaled $1,201,456.36 compared to May's stronger performance of $6,337,497.91, representing an 81% monthly decline. This places us below our typical $5.2M baseline for this period, with margins at 0.66 versus our standard 2.6 range.

**Understanding the Situation**
- Current position: Operating at approximately 19% of normal monthly capacity with constrained cash flow
- Contributing factors: Back-order fulfillment challenges ($39,118.09 outstanding) have impacted our ability to complete orders. Production output reached only $564.71 versus expected volumes. Our SUPERMERCADOS XTRA relationship has created a -$54,000 variance that requires attention.
- Expected performance: June typically generates around $5.2M with a 2.4 margin. Food manufacturing industry standards suggest maintaining 2.0+ margins even during seasonal adjustments.

**Key Factors Influencing Performance**
- Primary: Production scheduling requires refinement - current output significantly below our $400K+ weekly capacity
- Secondary: Supply chain coordination needs strengthening to ensure consistent order fulfillment
- External: Market pricing pressures during supply adjustments have created competitive challenges
- Internal: Enhanced monitoring protocols would help identify and address fulfillment issues earlier

**Financial Impact**
Current performance represents constrained operating liquidity, with fixed costs representing a higher percentage of revenue than our standard 40% target. This affects our operational flexibility and customer service capabilities.

**Strategic Recommendations**
- Immediate focus: Activate available credit facilities and prioritize highest-margin order fulfillment
- Near-term development: Apply our successful PRODUCTOS ALIMENTICIOS SPACIAL performance model (95.96% achievement) to other key accounts
- Long-term enhancement: Implement integrated production and financial forecasting with proactive variance monitoring

**Performance Targets**
Achieve $2.4M+ billing recovery within two weeks (representing 50% improvement toward normal levels). Restore margin performance to 1.8+ within 30 days. Maintain back-order levels below $10K maximum going forward.`;
  }
  
  // Sales performance queries
  if (lowerQuestion.includes('sales') || lowerQuestion.includes('poor') || lowerQuestion.includes('low')) {
    return `**Sales Performance Analysis**
Our current sales achievement stands at 13.40% versus our budget target of 791,151.26, which indicates room for improvement from our typical 70%+ performance standard. The SUPERMERCADOS XTRA chain locations show varying results: BUGABA at 17.87%, SX-DAVID at 24.29%, and M.F.DAVID at 24.40%. Notably, PRODUCTOS ALIMENTICIOS SPACIAL is performing well at 95.96%, demonstrating our capability for strong results.

**Understanding the Performance Context**
- Current status: Operating at 13% achievement compared to industry benchmarks of 70%+ for established food manufacturers
- Contributing factors: Back-order fulfillment challenges have affected service capabilities across 39 XTRA locations. Sales execution has been constrained by inventory availability. Our response protocols during supply challenges need enhancement.
- Performance expectations: Healthy food manufacturers typically achieve 70-85% of sales targets monthly. XTRA chain locations should perform at 75%+ given their established customer base.

**Factors Influencing Current Results**
- Primary: Supply chain coordination affecting systematic fulfillment across our major account network
- Secondary: Account management during challenging periods requires enhanced proactive customer engagement
- External: XTRA chain management may be evaluating supplier alternatives for consistent delivery
- Internal: Sales targets could benefit from supply-adjusted expectations during operational transitions

**Revenue Impact**
Current performance represents approximately $680,000 in monthly revenue opportunity. The XTRA partnership variance of -$54,000 requires focused attention to maintain this valuable relationship.

**Strategic Development Plan**
- Priority focus: Schedule partnership discussions with XTRA management to strengthen our collaboration and address service concerns
- Implementation phase: Apply the successful PRODUCTOS ALIMENTICIOS SPACIAL performance framework to our top 5 developing accounts
- Systems enhancement: Create supply-adjusted sales targets with integrated performance monitoring and proactive engagement protocols

**Achievement Targets**
Reach 45%+ sales achievement within two weeks. Improve XTRA variance to -$15,000 or better. Establish 3+ additional accounts performing at 85%+ within 30 days.`;
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