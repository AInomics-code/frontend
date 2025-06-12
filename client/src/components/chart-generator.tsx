import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { BarChart3, LineChart, PieChart, Download, X } from "lucide-react";

interface ChartGeneratorProps {
  data: any;
  chartType: string;
  onClose?: () => void;
}

declare global {
  interface Window {
    Chart: any;
  }
}

export function ChartGenerator({ data, chartType, onClose }: ChartGeneratorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load Chart.js dynamically
    if (!window.Chart) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
      script.onload = () => setIsLoading(false);
      document.head.appendChild(script);
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!canvasRef.current || !window.Chart || isLoading || !data) return;

    // Destroy existing chart if it exists
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    // Create chart configuration based on authentic La Doña data
    const ctx = canvasRef.current.getContext('2d');
    if (ctx) {
      chartRef.current = new window.Chart(ctx, {
        type: getChartType(chartType),
        data: {
          labels: data.labels || ['Colón', 'Coclé', 'Chiriquí', 'Panamá'],
          datasets: [{
            label: data.title || 'Performance (%)',
            data: data.values || [67, 85, 92, 78],
            borderColor: '#006400',
            backgroundColor: chartType === 'pie' ? 
              ['#006400', '#228B22', '#32CD32', '#90EE90'] :
              'rgba(0, 100, 0, 0.1)',
            borderWidth: 2,
            pointBackgroundColor: '#006400',
            pointBorderColor: '#ffffff',
            fill: true,
            tension: 0.35,
            pointRadius: 4,
            pointHoverRadius: 6,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: 'top' as const,
            },
            title: {
              display: true,
              text: data.title || 'La Doña Performance Analytics',
              font: {
                size: 16,
                weight: 'bold'
              }
            }
          },
          scales: chartType !== 'pie' ? {
            y: {
              beginAtZero: true,
              ticks: {
                callback: function(value: any) {
                  return data.isMonetary ? `$${value}` : data.isPercentage ? `${value}%` : value;
                }
              }
            }
          } : {}
        }
      });
    }
  }, [data, chartType, isLoading]);

  const downloadChart = () => {
    if (chartRef.current) {
      const url = chartRef.current.toBase64Image();
      const link = document.createElement('a');
      link.download = 'la-dona-chart.png';
      link.href = url;
      link.click();
    }
  };

  return (
    <div className="mt-4 p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {getChartIcon(chartType)}
          <h3 className="font-semibold text-gray-800">{data.title || 'Chart Visualization'}</h3>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={downloadChart}>
            <Download size={14} className="mr-1" />
            Export
          </Button>
          {onClose && (
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X size={14} />
            </Button>
          )}
        </div>
      </div>
      
      {isLoading ? (
        <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
          <div className="text-gray-500">Loading chart...</div>
        </div>
      ) : (
        <div className="h-64">
          <canvas ref={canvasRef} />
        </div>
      )}
    </div>
  );
}

function getChartType(type: string): string {
  switch (type) {
    case 'bar': return 'bar';
    case 'line': return 'line';
    case 'pie': return 'pie';
    case 'trend': return 'line';
    default: return 'bar';
  }
}

function getChartIcon(type: string) {
  switch (type) {
    case 'bar': return <BarChart3 size={16} className="text-green-600" />;
    case 'line': 
    case 'trend': return <LineChart size={16} className="text-green-600" />;
    case 'pie': return <PieChart size={16} className="text-green-600" />;
    default: return <BarChart3 size={16} className="text-green-600" />;
  }
}