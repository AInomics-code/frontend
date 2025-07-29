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
    title: "Analyze regional performance",
    description: "Get a breakdown of sales performance by region",
  },
  {
    title: "Identify underperforming areas",
    description: "Show KPIs not meeting targets with action plans",
  },
  {
    title: "Review slow-moving inventory",
    description: "Analyze products with low turnover rates",
  },
  {
    title: "Generate quarterly forecast",
    description: "Predict performance based on current trends",
  },
  {
    title: "Budget variance analysis",
    description: "Compare actual vs planned spending across departments",
  },
  {
    title: "Channel performance review",
    description: "Evaluate distribution channels and identify opportunities",
  },
];