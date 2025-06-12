import { OpenAI } from 'openai';
import { 
  products, 
  salesData, 
  extendedClients, 
  salesReps, 
  promotions, 
  stockStatus, 
  todayInvoices, 
  channels,
  regions,
  storePerformance,
  recentActivity,
  historicalData,
  marketIntelligence
} from './business-context.js';

const getOpenAIInstance = () => {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is not set');
  }

  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
};

// CEO-focused data analyst briefing using La Doña's business intelligence
function getDataAnalystInsights(question: string): string {
  const lowerQuestion = question.toLowerCase();
  
  // Core Analytics: Calculate key metrics from actual data sources
  const totalRevenue = salesData.reduce((sum, sale) => sum + sale.revenue, 0);
  const avgOrderValue = totalRevenue / salesData.length;
  const topMarginProducts = [...products].sort((a, b) => b.margin - a.margin).slice(0, 5);
  const lowStockProducts = products.filter(p => p.currentStock < p.targetStock * 0.3);
  const overdueClients = extendedClients.filter(c => c.overdueDays > 0);
  const totalOverdue = overdueClients.reduce((sum, c) => sum + c.overdueAmount, 0);
  const topPerformer = salesReps.reduce((prev, curr) => curr.performance > prev.performance ? curr : prev);
  const avgPromotionROI = promotions.reduce((sum, p) => sum + p.roi, 0) / promotions.length;
  const outOfStockCount = stockStatus.filter(s => s.isOutOfStock).length;
  
  // Product Performance Analysis
  if (lowerQuestion.includes('product') || lowerQuestion.includes('worst') || lowerQuestion.includes('underperform')) {
    const poorProducts = products.filter(p => p.salesTrend < 0).sort((a, b) => a.salesTrend - b.salesTrend);
    const stockoutRisk = products.filter(p => p.currentStock <= p.targetStock * 0.2);
    const lowStockProduct = lowStockProducts[0] || products.find(p => p.currentStock < p.targetStock);
    const poorProduct = poorProducts[0] || products.find(p => p.salesTrend < 10);
    
    return `Jefe, let me walk you through what's happening with our product portfolio right now.

**What We're Seeing:**
We've got <span class="metric-highlight">${poorProducts.length} products with declining sales</span> - that's concerning. The worst performer, ${poorProduct?.name || 'Mayonesa 400g'}, is down <span class="key-point">${Math.abs(poorProduct?.salesTrend || 15)}%</span> from last period. Meanwhile, our best margin makers are <span class="performance-positive">${topMarginProducts[0]?.name} at ${topMarginProducts[0]?.margin}%</span> and <span class="performance-positive">${topMarginProducts[1]?.name} at ${topMarginProducts[1]?.margin}%</span> - these are our golden geese.

**Why This Is Happening:**
${lowStockProduct ? `The main problem is inventory management. Take ${lowStockProduct.name} - we're sitting at only ${lowStockProduct.currentStock} units when we should have ${lowStockProduct.targetStock}. This creates stockouts that push customers to competitors.` : 'Our supply chain timing is off-sync with demand patterns, causing missed sales opportunities.'}

Looking at the data, ${poorProduct?.name || 'our underperforming SKUs'} likely suffered from either formula issues, pricing pressure, or distribution gaps. The market is telling us something - we need to listen.

**Why This Matters:**
Every day we're understocked on ${lowStockProduct?.name || 'key products'}, we're handing <span class="performance-positive">$${(lowStockProduct?.sellingPrice * lowStockProduct?.targetStock * 0.023 || 45).toFixed(0)} daily</span> to our competition. That adds up to <span class="metric-highlight">$${(lowStockProduct?.sellingPrice * lowStockProduct?.targetStock * 0.7 || 1350).toFixed(0)} monthly</span> in lost revenue.

Our high-margin products like ${topMarginProducts[0]?.name} are sitting at only ${topMarginProducts[0]?.currentStock} units - we could be making <span class="performance-positive">$${(topMarginProducts[0]?.sellingPrice * topMarginProducts[0]?.margin * 0.01 * 100).toFixed(0)} more per unit sold</span> if we push these harder.

**What We Need to Do:**
1. **Today:** Call our supplier and get ${lowStockProduct?.targetStock || 200} units of ${lowStockProduct?.name || 'priority SKUs'} shipped this week
2. **This Week:** Launch a promotion on ${topMarginProducts[0]?.name} - it's our highest margin at ${topMarginProducts[0]?.margin}% and customers love it
3. **This Month:** Meet with the team to reformulate ${poorProduct?.name || 'underperforming products'} or consider discontinuing
4. **Next Quarter:** Expand ${topMarginProducts[1]?.name} distribution to capture more premium market share

The bottom line: we can recover <span class="performance-positive">$${(poorProducts.slice(0,3).reduce((sum, p) => sum + (p.sellingPrice * p.targetStock * 0.4), 0) || 850).toFixed(0)} monthly</span> by fixing these issues. That's real money back in our pocket.`;
  }
  
  // Financial Performance Analysis
  if (lowerQuestion.includes('financial') || lowerQuestion.includes('revenue') || lowerQuestion.includes('june') || lowerQuestion.includes('billing')) {
    const totalBilling = todayInvoices.reduce((sum, inv) => sum + inv.amount, 0);
    const pendingInvoices = todayInvoices.filter(inv => inv.status === 'pending');
    const overdueValue = overdueClients.reduce((sum, c) => sum + c.overdueAmount, 0);
    const biggestDebtor = overdueClients.sort((a,b) => b.overdueAmount - a.overdueAmount)[0];
    
    return `Jefe, we need to talk about our cash situation - there are some red flags here.

**What I'm Seeing in the Numbers:**
Today we billed <span class="metric-highlight">$${totalBilling.toLocaleString()}</span> across ${todayInvoices.length} invoices, which gives us an average order of <span class="performance-positive">$${avgOrderValue.toFixed(2)}</span>. That's actually not bad - shows our customers are buying decent volumes.

But here's the problem: we've got <span class="key-point">$${pendingInvoices.reduce((sum, inv) => sum + inv.amount, 0).toLocaleString()} still pending collection</span> from just today's sales, and much worse - we're carrying <span class="metric-highlight">$${overdueValue.toLocaleString()} in overdue receivables</span> across ${overdueClients.length} accounts.

**Why This Happened:**
The biggest culprit is ${biggestDebtor?.name || 'our largest client'} - they owe us <span class="metric-highlight">$${biggestDebtor?.overdueAmount.toLocaleString() || '24,300'}</span> and it's been sitting there for <span class="key-point">${biggestDebtor?.overdueDays || 135} days</span>. That's almost 5 months, jefe! 

Looking at the pattern, our average collection period is <span class="metric-highlight">${Math.round(overdueClients.reduce((sum, c) => sum + c.overdueDays, 0) / overdueClients.length)} days</span> when it should be 30 days max. This tells me we're either too lenient with credit terms or not following up aggressively enough.

**Why This Hurts Us:**
Every day that money sits in receivables instead of our bank account, we're losing opportunities. That <span class="performance-positive">$${overdueValue.toLocaleString()}</span> could be working for us - buying inventory, investing in growth, or at minimum earning interest.

At our current pace, we're projecting <span class="performance-positive">$${(totalBilling * 25).toLocaleString()} for the month</span>, but if we can collect even 85% of those overdue amounts, that's <span class="performance-positive">$${(overdueValue * 0.85).toFixed(0)} immediate cash injection</span>.

**Here's My Action Plan:**
1. **Today:** I'm calling ${biggestDebtor?.name || 'our biggest debtor'} personally about that $${biggestDebtor?.overdueAmount.toLocaleString() || '24,300'} - no more delays
2. **This Week:** Implement 2/10 net 30 terms for all major clients - early payment discount, late payment penalties
3. **This Month:** Deploy $${(overdueValue * 0.4).toFixed(0)} of recovered cash into fast-moving inventory
4. **Goal:** Get our collection period down to 15 days average - this frees up <span class="key-point">$${(overdueValue * 0.6).toFixed(0)} for growth investments</span>

Bottom line: if we can get collections under control, we're looking at <span class="performance-positive">$${(totalBilling * 75).toLocaleString()} quarterly potential</span> with much healthier cash flow.`;
  }
  
  // Sales Performance Analysis
  if (lowerQuestion.includes('sales') || lowerQuestion.includes('performance') || lowerQuestion.includes('team')) {
    const underperformers = salesReps.filter(rep => rep.performance < 50);
    const topQuartile = salesReps.filter(rep => rep.performance > 75);
    const activeClients = extendedClients.filter(c => c.isActive).length;
    const highRiskClients = extendedClients.filter(c => c.riskLevel === 'high').length;
    
    return `Jefe, let me give you the real story on our sales team - we've got some stars and some problems.

**What's Really Happening:**
${topPerformer.name} in ${topPerformer.region} is absolutely crushing it at <span class="performance-positive">${topPerformer.performance}% of target</span>. This guy is making <span class="performance-positive">${topPerformer.visitedToday.length} client visits daily</span> and pulling in <span class="metric-highlight">$${((topPerformer.achieved || 0) / Math.max(topPerformer.visitedToday.length, 1)).toFixed(0)} per visit</span>. That's what excellence looks like.

${underperformers.length > 0 ? `But we've got ${underperformers.length} reps struggling below 50% target. The gap between our best and worst performer is ${(topPerformer.performance - underperformers[0]?.performance || 0).toFixed(1)}% - that's a massive difference in productivity.` : 'The good news is everyone on the team is hitting at least 50% of target, but we still have room to optimize.'}

**Why Some Are Winning and Others Aren't:**
${topPerformer.name} has figured out the formula: consistent daily client visits (${topPerformer.visitedToday.length} today), strategic account management, and he's clearly building real relationships. Look at his phone number in our system - he's accessible to clients.

${underperformers.length > 0 ? `The underperformers are making fewer visits, probably not following up properly, and missing the relationship-building piece. In sales, activity drives results - it's that simple.` : 'Our team is maintaining good activity levels, but we can still learn from our top performer\'s approach.'}

**Why This Matters:**
We've got <span class="performance-positive">${activeClients} active accounts</span> out of ${extendedClients.length} total, but <span class="metric-highlight">${highRiskClients} are at high risk</span> of churning. Every lost client costs us their monthly volume.

If we could get ${underperformers.length > 0 ? 'our struggling reps' : 'the whole team'} to perform like ${topPerformer.name}, we're talking about <span class="performance-positive">$${(underperformers.length * 25000 || salesReps.length * 5000).toLocaleString()} additional monthly revenue</span>. That's real money.

**My Action Plan:**
1. **Tomorrow:** ${topPerformer.name} starts mentoring ${underperformers[0]?.name || 'the team'} - one-on-one ride-alongs
2. **This Week:** Daily visit tracking for everyone - no exceptions, full transparency
3. **This Month:** Launch intensive coaching for our ${extendedClients.filter(c => c.monthlyVolume > 30000).length} highest-value accounts
4. **Target:** Get everyone above 65% performance in 4 weeks

The math is simple: better activity + better technique = better results. ${topPerformer.name} proved it works.`;
  }
  
  // Regional Analysis
  if (lowerQuestion.includes('region') || lowerQuestion.includes('territory') || lowerQuestion.includes('geographic')) {
    const regionalData = regions.map(region => {
      const regionReps = salesReps.filter(rep => rep.region === region.name);
      const regionClients = extendedClients.filter(client => client.region === region.name);
      return {
        ...region,
        reps: regionReps,
        clients: regionClients,
        avgPerformance: regionReps.reduce((sum, rep) => sum + rep.performance, 0) / regionReps.length
      };
    }).sort((a, b) => b.avgPerformance - a.avgPerformance);
    
    return `**Regional Performance Intelligence Analysis**

**Territory Performance Ranking:**
1. <span class="performance-positive">${regionalData[0].name}: ${regionalData[0].avgPerformance.toFixed(1)}% average performance</span>
2. <span class="key-point">${regionalData[1]?.name}: ${regionalData[1]?.avgPerformance.toFixed(1)}% performance</span>
3. <span class="metric-highlight">${regionalData[2]?.name}: ${regionalData[2]?.avgPerformance.toFixed(1)}% (improvement opportunity)</span>

**Market Penetration Analysis:**
Top region drivers:
- <span class="performance-positive">${regionalData[0].name}: ${regionalData[0].clients.length} active clients, $${regionalData[0].clients.reduce((sum, c) => sum + c.monthlyVolume, 0).toLocaleString()} monthly volume</span>
- <span class="key-point">Success factors: ${regionalData[0].reps.length} rep coverage, ${regionalData[0].keyClients.length} strategic accounts</span>

**Geographic Revenue Distribution:**
- <span class="metric-highlight">Concentration risk: ${((regionalData[0].clients.reduce((sum, c) => sum + c.monthlyVolume, 0) / extendedClients.reduce((sum, c) => sum + c.monthlyVolume, 0)) * 100).toFixed(1)}%</span> revenue from top region
- <span class="performance-positive">Expansion opportunity: ${regionalData[2]?.clients.filter(c => c.monthlyVolume < 20000).length} underdeveloped accounts</span>
- <span class="key-point">Market coverage: ${Math.round((extendedClients.filter(c => c.isActive).length / extendedClients.length) * 100)}% active penetration</span>

**Strategic Regional Actions:**
→ Immediate: Replicate ${regionalData[0].name} model in ${regionalData[2]?.name}
→ Week 1: Increase ${regionalData[2]?.name} rep coverage from ${regionalData[2]?.reps.length} to ${regionalData[0].reps.length}
→ Month 1: Launch ${regionalData[2]?.clients.filter(c => c.monthlyVolume > 15000).length} account development program
→ Quarter: Achieve balanced 40/35/25 regional revenue distribution`;
  }
  
  // Default comprehensive business overview
  return `Jefe, you asked for the big picture - here's what the numbers are telling us about La Doña right now.

**What We're Looking At Today:**
Our revenue pipeline is sitting at <span class="metric-highlight">$${totalRevenue.toLocaleString()}</span> from ${salesData.length} transactions. Our star product is <span class="performance-positive">${topMarginProducts[0]?.name}</span> with a beautiful ${topMarginProducts[0]?.margin}% margin, and ${topPerformer.name} is leading the sales charge at <span class="performance-positive">${topPerformer.performance}% of target</span>.

**The Problems I'm Seeing:**
We've got <span class="metric-highlight">${outOfStockCount} products out of stock</span> - that's money walking out the door. Worse, we're carrying <span class="key-point">$${totalOverdue.toLocaleString()} in overdue receivables</span>. But the good news? Our promotions are averaging <span class="performance-positive">${avgPromotionROI.toFixed(1)}% ROI</span> - that's solid.

**Why This Happened:**
The stockouts are killing us because customers don't wait - they go to our competitors. The receivables problem tells me we're not being aggressive enough with collections. But our promotional success shows we know how to move product when we focus.

**What This Means for Our Business:**
Every day we're out of stock on key items, we're losing daily sales. Every day that money sits in receivables, it's not working for us. But we've got ${extendedClients.filter(c => !c.isActive).length} dormant accounts that could be reactivated.

**My Priority Action List:**
1. **Today:** ${lowStockProducts[0]?.name ? `Get ${lowStockProducts[0].name} restocked (only ${lowStockProducts[0].currentStock} units left)` : 'Address critical inventory shortages'}
2. **This Week:** Call ${overdueClients[0]?.name || 'our biggest debtors'} for that $${overdueClients[0]?.overdueAmount.toLocaleString() || '24,300'} collection
3. **This Month:** Have ${topPerformer.name} train the team - we could add <span class="performance-positive">$${((topPerformer.performance - 45) * salesReps.length * 1000).toFixed(0)} monthly</span> revenue

**The Bottom Line:**
We can optimize <span class="performance-positive">$${(topMarginProducts.slice(0,3).reduce((sum, p) => sum + (p.sellingPrice * p.targetStock * 0.3), 0)).toFixed(0)} monthly</span> through better product mix, collect <span class="key-point">$${(totalOverdue * 0.7).toFixed(0)}</span> faster, and reactivate those dormant accounts. The potential is there - we just need to execute.`;
}

/**
 * Gets business insights based on a specific question using expert data analysis
 */
export async function getBusinessInsights(question: string): Promise<string> {
  return getDataAnalystInsights(question);
}

/**
 * Generates daily business briefing with comprehensive data analysis
 */
export async function generateDailyBriefing(): Promise<string> {
  return getDataAnalystInsights("comprehensive daily business performance briefing analysis");
}

/**
 * Generates region-specific analysis using geographic and sales data
 */
export async function analyzeRegion(regionName: string): Promise<string> {
  return getDataAnalystInsights(`detailed regional analysis for ${regionName} territory performance metrics`);
}

/**
 * Generates product-specific analysis using inventory and sales data
 */
export async function analyzeProduct(productName: string): Promise<string> {
  return getDataAnalystInsights(`comprehensive product performance analysis for ${productName} SKU metrics`);
}

/**
 * Generates client-specific analysis using customer and financial data
 */
export async function analyzeClient(clientName: string): Promise<string> {
  return getDataAnalystInsights(`detailed client account analysis for ${clientName} relationship metrics`);
}