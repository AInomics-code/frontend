// Business Context Data for La Doña AI
export interface Product {
  name: string;
  category: string;
  currentStock: number;
  targetStock: number;
  margin: number;
  salesTrend: number;
  backorders?: number;
}

export interface Region {
  name: string;
  target: number;
  current: number;
  salesRep: string;
  keyClients: string[];
  performance: number;
}

export interface Client {
  name: string;
  region: string;
  monthlyVolume: number;
  paymentTerms: string;
  lastOrder: string;
  riskLevel: 'low' | 'medium' | 'high';
}

export interface SalesRep {
  name: string;
  region: string;
  target: number;
  achieved: number;
  performance: number;
}

// Business data - represents real business metrics
export const products: Product[] = [
  {
    name: "Vinagre Premium",
    category: "Vinegars",
    currentStock: 450,
    targetStock: 600,
    margin: 32.5,
    salesTrend: 47,
    backorders: 0
  },
  {
    name: "Salsa de Tomate Original",
    category: "Sauces",
    currentStock: 280,
    targetStock: 400,
    margin: 28.0,
    salesTrend: 12,
    backorders: 15
  },
  {
    name: "Mango Salsa Verde",
    category: "Specialty Sauces",
    currentStock: 120,
    targetStock: 200,
    margin: 18.5,
    salesTrend: -23,
    backorders: 8
  },
  {
    name: "Condimento Super Xtra",
    category: "Seasonings",
    currentStock: 90,
    targetStock: 300,
    margin: 35.0,
    salesTrend: 8,
    backorders: 12
  },
  {
    name: "Aderezo El Rey",
    category: "Dressings",
    currentStock: 180,
    targetStock: 250,
    margin: 25.5,
    salesTrend: 5,
    backorders: 8
  },
  {
    name: "Mayonesa 400g",
    category: "Condiments",
    currentStock: 340,
    targetStock: 500,
    margin: 24.0,
    salesTrend: -25,
    backorders: 22
  },
  {
    name: "Salsa Teriyaki 300ml",
    category: "Specialty Sauces",
    currentStock: 85,
    targetStock: 150,
    margin: 31.5,
    salesTrend: -15,
    backorders: 0
  }
];

export const regions: Region[] = [
  {
    name: "Chiriquí",
    target: 150000,
    current: 125000,
    salesRep: "María González",
    keyClients: ["Supermercados Rey David", "Mini Super Chiriquí"],
    performance: 83.3
  },
  {
    name: "Colón",
    target: 120000,
    current: 80000,
    salesRep: "Carlos Mendoza",
    keyClients: ["El Extra Colón", "Distribuidora Atlántico"],
    performance: 66.7
  },
  {
    name: "San Miguelito",
    target: 100000,
    current: 95000,
    salesRep: "Ana Patricia Ruiz",
    keyClients: ["Super 99", "Metro Plus"],
    performance: 95.0
  },
  {
    name: "Santiago",
    target: 80000,
    current: 78000,
    salesRep: "José Luis Vargas",
    keyClients: ["Rey Santiago", "Supermercado Central"],
    performance: 97.5
  }
];

export const clients: Client[] = [
  {
    name: "Supermercados Rey",
    region: "Chiriquí",
    monthlyVolume: 45000,
    paymentTerms: "30 days",
    lastOrder: "2024-06-03",
    riskLevel: "low"
  },
  {
    name: "El Extra",
    region: "Colón",
    monthlyVolume: 35000,
    paymentTerms: "45 days",
    lastOrder: "2024-06-01",
    riskLevel: "medium"
  },
  {
    name: "Mini Super",
    region: "Santiago",
    monthlyVolume: 28000,
    paymentTerms: "15 days",
    lastOrder: "2024-06-04",
    riskLevel: "low"
  },
  {
    name: "Distribuidora Atlántico",
    region: "Colón",
    monthlyVolume: 22000,
    paymentTerms: "60 days",
    lastOrder: "2024-05-28",
    riskLevel: "high"
  },
  {
    name: "Super99",
    region: "San Miguelito",
    monthlyVolume: 38000,
    paymentTerms: "30 days",
    lastOrder: "2024-06-04",
    riskLevel: "medium"
  },
  {
    name: "El Machetazo",
    region: "La Chorrera",
    monthlyVolume: 15000,
    paymentTerms: "15 days",
    lastOrder: "2024-06-03",
    riskLevel: "low"
  }
];

export interface StoreData {
  storeName: string;
  chain: string;
  location: string;
  monthlyTarget: number;
  currentPerformance: number;
  lastStockout: string;
  topProducts: string[];
  competitorActivity: string;
}

export const storePerformance: StoreData[] = [
  {
    storeName: "Super99 San Miguelito",
    chain: "Super99",
    location: "San Miguelito",
    monthlyTarget: 12000,
    currentPerformance: 9840, // 82% of target
    lastStockout: "2024-06-01",
    topProducts: ["Vinagre Premium", "Salsa de Tomate Original"],
    competitorActivity: "Kraft sauce promotion launched May 2"
  },
  {
    storeName: "Super99 Tocumen",
    chain: "Super99", 
    location: "Tocumen",
    monthlyTarget: 10000,
    currentPerformance: 8200,
    lastStockout: "2024-05-30",
    topProducts: ["Mayonesa 400g", "Aderezo El Rey"],
    competitorActivity: "Maggi display expansion"
  },
  {
    storeName: "El Machetazo La Chorrera",
    chain: "El Machetazo",
    location: "La Chorrera", 
    monthlyTarget: 8000,
    currentPerformance: 7200,
    lastStockout: "2024-06-02",
    topProducts: ["Condimento Super Xtra"],
    competitorActivity: "Local brand promotion active"
  }
];

export const salesReps: SalesRep[] = [
  {
    name: "María González",
    region: "Chiriquí",
    target: 150000,
    achieved: 125000,
    performance: 83.3
  },
  {
    name: "Carlos Mendoza",
    region: "Colón",
    target: 120000,
    achieved: 80000,
    performance: 66.7
  },
  {
    name: "Ana Patricia Ruiz",
    region: "San Miguelito",
    target: 100000,
    achieved: 95000,
    performance: 95.0
  },
  {
    name: "José Luis Vargas",
    region: "Santiago",
    target: 80000,
    achieved: 78000,
    performance: 97.5
  }
];

export const marketIntelligence = {
  competitors: {
    maggi: {
      marketShare: 28,
      recentActions: "Launched new packaging campaign",
      strengths: ["Brand recognition", "Distribution network"],
      weaknesses: ["Higher pricing", "Limited local flavors"]
    },
    knorr: {
      marketShare: 22,
      recentActions: "Price reduction on core products",
      strengths: ["Product variety", "Quality perception"],
      weaknesses: ["Complex SKU portfolio", "Slow innovation"]
    },
    localBrands: {
      marketShare: 15,
      recentActions: "Increased presence in rural areas",
      strengths: ["Local taste preferences", "Competitive pricing"],
      weaknesses: ["Limited marketing budget", "Quality inconsistency"]
    }
  },
  economicFactors: {
    gdpGrowth: 3.8,
    inflation: 2.1,
    currencyStability: "Stable USD peg",
    consumerConfidence: 72
  },
  industryTrends: {
    organicGrowth: 12,
    foodServiceRecovery: 8,
    digitalizationAdoption: 25,
    packagingCostIncrease: 5
  }
};

// Daily sales activity tracking
export const recentActivity = {
  yesterdaySales: [
    { product: "Salsa Teriyaki 300ml", store: "Super99 San Miguelito", sales: 0, inventory: 12 },
    { product: "Salsa Teriyaki 300ml", store: "Super99 Tocumen", sales: 0, inventory: 8 },
    { product: "Lime Juice 250ml", store: "El Machetazo La Chorrera", sales: 0, inventory: 15 },
    { product: "Mayonesa 400g", store: "Super99 San Miguelito", sales: 24, inventory: 45 },
    { product: "Vinagre Premium", store: "Supermercados Rey David", sales: 18, inventory: 32 }
  ],
  stockoutAlerts: [
    { product: "Mayonesa 400g", stores: ["Rey David", "Rey Bugaba"], lastBackorder: "2024-06-01", daysOut: 4 },
    { product: "Condimento Super Xtra", stores: ["El Extra Colón", "Mini Super Santiago"], lastBackorder: "2024-06-02", daysOut: 3 }
  ],
  competitorActivity: [
    { competitor: "Kraft", action: "Sauce promotion launch", date: "2024-05-02", impact: "Potential shelf space cannibalization" },
    { competitor: "Maggi", action: "Display expansion", date: "2024-05-28", stores: ["Super99 network"] },
    { competitor: "Knorr", action: "Price reduction on core products", date: "2024-05-25", impact: "5-8% price pressure" }
  ]
};

export function buildBusinessContext() {
  return {
    products,
    regions,
    clients,
    salesReps,
    storePerformance,
    recentActivity,
    marketIntelligence,
    keyMetrics: {
      totalBackorders: products.reduce((sum, p) => sum + (p.backorders || 0), 0),
      averageMargin: products.reduce((sum, p) => sum + p.margin, 0) / products.length,
      underperformingRegions: regions.filter(r => r.performance < 80).length,
      underperformingStores: storePerformance.filter(s => (s.currentPerformance / s.monthlyTarget) < 0.9).length,
      highRiskClients: clients.filter(c => c.riskLevel === 'high').length,
      zeroSalesProducts: recentActivity.yesterdaySales.filter(s => s.sales === 0 && s.inventory > 0).length
    },
    currentDate: new Date().toISOString().split('T')[0], // 2024-06-05
    timestamp: new Date().toISOString()
  };
}