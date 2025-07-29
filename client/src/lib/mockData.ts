// mockData.ts

export interface KpiData {
  title: string;
  description: string;
  value: string;
}

export interface PromptData {
  title: string;
  description: string;
}

export const kpiData: KpiData[] = [
  {
    title: "Puntuación de Rendimiento",
    description: "82% del objetivo de ventas cumplido",
    value: "88",
  },
  {
    title: "Zonas en Riesgo",
    description: "Chiriquí, Colón, San Miguelito",
    value: "3 Zonas",
  },
  {
    title: "Oportunidad de Producto",
    description: "Alto potencial · Débil: Mango Salsa",
    value: "Vinagre Premium",
  },
];

export const promptData: PromptData[] = [
  {
    title: "💡 What are my top performing regions?",
    description: "Get a breakdown by performance",
  },
  {
    title: "🧭 Where are we underperforming?",
    description: "See KPIs not meeting targets",
  },
  {
    title: "📦 What products aren't moving?",
    description: "Low SKU turnover detection",
  },
  {
    title: "📈 Forecast next quarter",
    description: "Predict based on current trend",
  },
  {
    title: "💰 Budget variance analysis",
    description: "Compare actual vs planned spending",
  },
  {
    title: "🎯 Channel performance",
    description: "Identify improvement opportunities",
  },
];