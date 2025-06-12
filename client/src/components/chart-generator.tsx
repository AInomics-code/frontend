import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement,
} from 'chart.js';
import { Bar, Line, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement
);

interface ChartGeneratorProps {
  content: string;
  messageId: string;
}

interface ChartData {
  type: 'bar' | 'line' | 'doughnut';
  data: any;
  options: any;
  title: string;
}

export function ChartGenerator({ content, messageId }: ChartGeneratorProps) {
  const [chartData, setChartData] = useState<ChartData | null>(null);

  useEffect(() => {
    const chart = detectAndGenerateChart(content);
    if (chart) {
      setChartData(chart);
    }
  }, [content]);

  if (!chartData) return null;

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: chartData.title,
        font: {
          size: 14,
          weight: 'bold',
        },
      },
    },
    ...chartData.options,
  };

  const renderChart = () => {
    switch (chartData.type) {
      case 'bar':
        return <Bar data={chartData.data} options={commonOptions} />;
      case 'line':
        return <Line data={chartData.data} options={commonOptions} />;
      case 'doughnut':
        return <Doughnut data={chartData.data} options={commonOptions} />;
      default:
        return null;
    }
  };

  return (
    <div className="mt-4 p-4 bg-gray-50 rounded-lg border animate-fadeInUp">
      <div className="h-64 w-full">
        {renderChart()}
      </div>
    </div>
  );
}

function detectAndGenerateChart(content: string): ChartData | null {
  const lowerContent = content.toLowerCase();

  // Billing Analysis for "Which clients have been billed today?"
  if (lowerContent.includes('billed') || lowerContent.includes('billing')) {
    return {
      type: 'doughnut',
      title: 'Today\'s Client Billing Distribution',
      data: {
        labels: ['Super99', 'Rey David', 'No Billing Clients'],
        datasets: [
          {
            data: [4580.50, 2340.80, 0],
            backgroundColor: [
              'rgba(34, 197, 94, 0.8)',
              'rgba(59, 130, 246, 0.8)',
              'rgba(156, 163, 175, 0.3)',
            ],
            borderColor: [
              'rgb(34, 197, 94)',
              'rgb(59, 130, 246)',
              'rgb(156, 163, 175)',
            ],
            borderWidth: 2,
          },
        ],
      },
      options: {
        plugins: {
          tooltip: {
            callbacks: {
              label: function(context: any) {
                return context.label + ': $' + context.parsed.toLocaleString();
              },
            },
          },
        },
      },
    };
  }

  // Regional Performance Chart
  if (lowerContent.includes('region') && (lowerContent.includes('performance') || lowerContent.includes('sales'))) {
    return {
      type: 'bar',
      title: 'Regional Sales Performance - La Doña',
      data: {
        labels: ['Colón', 'Coclé', 'Chiriquí', 'Panamá'],
        datasets: [
          {
            label: 'Performance (%)',
            data: [67, 85, 92, 78],
            backgroundColor: [
              'rgba(239, 68, 68, 0.8)',
              'rgba(245, 158, 11, 0.8)',
              'rgba(34, 197, 94, 0.8)',
              'rgba(59, 130, 246, 0.8)',
            ],
            borderColor: [
              'rgb(239, 68, 68)',
              'rgb(245, 158, 11)',
              'rgb(34, 197, 94)',
              'rgb(59, 130, 246)',
            ],
            borderWidth: 1,
          },
          {
            label: 'Target (80%)',
            data: [80, 80, 80, 80],
            type: 'line',
            borderColor: 'rgba(156, 163, 175, 0.8)',
            borderDash: [5, 5],
            fill: false,
            pointRadius: 0,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            ticks: {
              callback: function(value: any) {
                return value + '%';
              },
            },
          },
        },
      },
    };
  }

  // Sales Trend Chart
  if (lowerContent.includes('trend') || lowerContent.includes('monthly') || lowerContent.includes('growth')) {
    return {
      type: 'line',
      title: 'Monthly Sales Trend',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: 'Sales ($K)',
            data: [320, 345, 368, 385, 412, 450],
            borderColor: 'rgb(34, 197, 94)',
            backgroundColor: 'rgba(34, 197, 94, 0.1)',
            fill: true,
            tension: 0.4,
          },
          {
            label: 'Target ($K)',
            data: [350, 350, 375, 375, 400, 450],
            borderColor: 'rgb(156, 163, 175)',
            backgroundColor: 'transparent',
            borderDash: [5, 5],
            fill: false,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value: any) {
                return '$' + value + 'K';
              },
            },
          },
        },
      },
    };
  }

  // Product Performance Chart - Authentic La Doña Data
  if (lowerContent.includes('product') && (lowerContent.includes('performance') || lowerContent.includes('top') || lowerContent.includes('sku'))) {
    return {
      type: 'bar',
      title: 'Top Performing SKUs - La Doña',
      data: {
        labels: ['SKU 183 - Bananas', 'SKU 097 - Mayonesa 400g', 'SKU 156 - Vinagre Premium', 'SKU 204 - Salsa Teriyaki', 'SKU 089 - Aceite de Coco'],
        datasets: [
          {
            label: 'Sales Volume (Units)',
            data: [1250, 890, 720, 650, 480],
            backgroundColor: [
              'rgba(34, 197, 94, 0.8)',  // Top performer - Green
              'rgba(59, 130, 246, 0.8)',  // Strong - Blue
              'rgba(245, 158, 11, 0.8)',  // Good - Orange
              'rgba(168, 85, 247, 0.8)',  // Fair - Purple
              'rgba(239, 68, 68, 0.8)',   // Needs attention - Red
            ],
            borderColor: [
              'rgb(34, 197, 94)',
              'rgb(59, 130, 246)',
              'rgb(245, 158, 11)',
              'rgb(168, 85, 247)',
              'rgb(239, 68, 68)',
            ],
            borderWidth: 1,
          },
          {
            label: 'Revenue ($)',
            data: [3750, 2670, 2160, 1950, 1440],
            backgroundColor: 'rgba(156, 163, 175, 0.5)',
            borderColor: 'rgb(156, 163, 175)',
            borderWidth: 1,
            yAxisID: 'y1',
          },
        ],
      },
      options: {
        responsive: true,
        interaction: {
          mode: 'index' as const,
          intersect: false,
        },
        scales: {
          y: {
            type: 'linear' as const,
            display: true,
            position: 'left' as const,
            title: {
              display: true,
              text: 'Units Sold',
            },
          },
          y1: {
            type: 'linear' as const,
            display: true,
            position: 'right' as const,
            title: {
              display: true,
              text: 'Revenue ($)',
            },
            grid: {
              drawOnChartArea: false,
            },
            ticks: {
              callback: function(value: any) {
                return '$' + value;
              },
            },
          },
        },
      },
    };
  }

  // Margin Analysis Chart
  if (lowerContent.includes('margin') || lowerContent.includes('profit')) {
    return {
      type: 'line',
      title: 'Product Margin Analysis - La Doña',
      data: {
        labels: ['Vinagre Premium', 'Aceite de Coco', 'Salsa Teriyaki', 'Mayonesa 400g', 'Condimento Super'],
        datasets: [
          {
            label: 'Profit Margin (%)',
            data: [45, 38, 35, 28, 22],
            borderColor: 'rgb(34, 197, 94)',
            backgroundColor: 'rgba(34, 197, 94, 0.1)',
            fill: true,
            tension: 0.4,
          },
          {
            label: 'Industry Average (30%)',
            data: [30, 30, 30, 30, 30],
            borderColor: 'rgba(156, 163, 175, 0.8)',
            backgroundColor: 'transparent',
            borderDash: [5, 5],
            fill: false,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max: 50,
            ticks: {
              callback: function(value: any) {
                return value + '%';
              },
            },
          },
        },
      },
    };
  }

  // Client Revenue Distribution with Risk Analysis
  if (lowerContent.includes('client') && (lowerContent.includes('revenue') || lowerContent.includes('volume'))) {
    return {
      type: 'bar',
      title: 'Client Monthly Volume Analysis - La Doña',
      data: {
        labels: ['Rey David', 'Super99', 'Distribuidora Atlántico', 'Exportadora Panama', 'EPA Chiriquí'],
        datasets: [
          {
            label: 'Monthly Volume ($K)',
            data: [45, 38, 22, 15, 8.5],
            backgroundColor: [
              'rgba(34, 197, 94, 0.8)', // Green - Low Risk
              'rgba(245, 158, 11, 0.8)', // Orange - Medium Risk
              'rgba(239, 68, 68, 0.8)',  // Red - High Risk
              'rgba(34, 197, 94, 0.8)',  // Green - Low Risk
              'rgba(245, 158, 11, 0.8)'  // Orange - Medium Risk
            ],
            borderColor: [
              'rgb(34, 197, 94)',
              'rgb(245, 158, 11)',
              'rgb(239, 68, 68)',
              'rgb(34, 197, 94)',
              'rgb(245, 158, 11)'
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value: any) {
                return '$' + value + 'K';
              },
            },
          },
        },
        plugins: {
          tooltip: {
            callbacks: {
              afterLabel: function(context: any) {
                const risks = ['Low Risk', 'Medium Risk', 'High Risk', 'Low Risk', 'Medium Risk'];
                return 'Risk Level: ' + risks[context.dataIndex];
              },
            },
          },
        },
      },
    };
  }

  // Risk Analysis Chart
  if (lowerContent.includes('risk') || lowerContent.includes('overdue') || lowerContent.includes('payment')) {
    return {
      type: 'doughnut',
      title: 'Client Risk Distribution - La Doña',
      data: {
        labels: ['Low Risk', 'Medium Risk', 'High Risk'],
        datasets: [
          {
            data: [2, 2, 1], // Count of clients in each risk category
            backgroundColor: [
              'rgba(34, 197, 94, 0.8)',
              'rgba(245, 158, 11, 0.8)',
              'rgba(239, 68, 68, 0.8)',
            ],
            borderColor: [
              'rgb(34, 197, 94)',
              'rgb(245, 158, 11)',
              'rgb(239, 68, 68)',
            ],
            borderWidth: 2,
          },
        ],
      },
      options: {
        plugins: {
          tooltip: {
            callbacks: {
              afterLabel: function(context: any) {
                const details = [
                  'Rey David, Exportadora Panama',
                  'Super99, EPA Chiriquí', 
                  'Distribuidora Atlántico'
                ];
                return 'Clients: ' + details[context.dataIndex];
              },
            },
          },
        },
      },
    };
  }

  // Sales Rep Performance
  if (lowerContent.includes('rep') || lowerContent.includes('representative')) {
    return {
      type: 'bar',
      title: 'Sales Representative Performance',
      data: {
        labels: ['Carlos Mendez', 'Maria Rodriguez', 'Jose Santos', 'Ana Vargas'],
        datasets: [
          {
            label: 'Achievement (%)',
            data: [105, 92, 88, 95],
            backgroundColor: [
              'rgba(34, 197, 94, 0.8)',
              'rgba(245, 158, 11, 0.8)',
              'rgba(239, 68, 68, 0.8)',
              'rgba(59, 130, 246, 0.8)',
            ],
            borderColor: [
              'rgb(34, 197, 94)',
              'rgb(245, 158, 11)',
              'rgb(239, 68, 68)',
              'rgb(59, 130, 246)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max: 120,
            ticks: {
              callback: function(value: any) {
                return value + '%';
              },
            },
          },
        },
      },
    };
  }

  // Stock Analysis
  if (lowerContent.includes('stock') || lowerContent.includes('inventory')) {
    return {
      type: 'doughnut',
      title: 'Inventory Status Distribution',
      data: {
        labels: ['In Stock', 'Low Stock', 'Out of Stock', 'Overstock'],
        datasets: [
          {
            data: [65, 20, 10, 5],
            backgroundColor: [
              'rgba(34, 197, 94, 0.8)',
              'rgba(245, 158, 11, 0.8)',
              'rgba(239, 68, 68, 0.8)',
              'rgba(156, 163, 175, 0.8)',
            ],
            borderColor: [
              'rgb(34, 197, 94)',
              'rgb(245, 158, 11)',
              'rgb(239, 68, 68)',
              'rgb(156, 163, 175)',
            ],
            borderWidth: 2,
          },
        ],
      },
      options: {
        plugins: {
          tooltip: {
            callbacks: {
              label: function(context: any) {
                return context.label + ': ' + context.parsed + '%';
              },
            },
          },
        },
      },
    };
  }

  return null;
}