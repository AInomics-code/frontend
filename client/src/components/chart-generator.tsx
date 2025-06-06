import { useEffect, useRef } from "react";

interface ChartGeneratorProps {
  content: string;
  messageId: string;
}

interface ChartData {
  labels: string[];
  values: number[];
  title: string;
  isMonetary: boolean;
  type?: string;
}

declare global {
  interface Window {
    Chart: any;
  }
}

export function ChartGenerator({ content, messageId }: ChartGeneratorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<any>(null);

  useEffect(() => {
    if (!canvasRef.current || !window.Chart) return;

    // Parse content for chart data
    const chartData = parseChartData(content);
    if (!chartData) return;

    // Destroy existing chart if it exists
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    // Create new chart with modern styling
    const ctx = canvasRef.current.getContext('2d');
    if (ctx) {
      chartRef.current = new window.Chart(ctx, {
        type: chartData.type || 'line',
        data: {
          labels: chartData.labels,
          datasets: [{
            label: chartData.title || 'Performance ($)',
            data: chartData.values,
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59, 130, 246, 0.08)',
            borderWidth: 2,
            pointBackgroundColor: '#3b82f6',
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
          scales: {
            x: {
              ticks: { 
                color: '#475569',
                font: { size: 12 }
              },
              grid: { 
                color: '#f1f5f9',
                drawBorder: false
              }
            },
            y: {
              beginAtZero: true,
              ticks: {
                color: '#475569',
                font: { size: 12 },
                callback: function(value: any) {
                  if (chartData.isMonetary) {
                    return '$' + value.toLocaleString();
                  }
                  return value.toLocaleString();
                }
              },
              grid: { 
                color: '#f1f5f9',
                drawBorder: false
              }
            }
          },
          plugins: {
            legend: {
              display: true,
              position: 'top' as const,
              labels: {
                color: '#1e293b',
                font: { weight: '500', size: 13 },
                padding: 20
              }
            }
          }
        }
      });
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [content]);

  const chartData = parseChartData(content);
  if (!chartData) return null;

  return (
    <div className="mt-6 p-5 bg-white rounded-xl shadow-sm border border-gray-100">
      <div style={{ height: '320px' }}>
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}

function parseChartData(text: string): ChartData | null {
  // Look for "Render Chart:" pattern with structured data
  const renderMatch = text.match(/Render Chart:\s*\n?Labels:\s*\[(.*?)\]\s*\n?Values:\s*\[(.*?)\]\s*\n?Label Name:\s*['"](.*?)['"]?/m);
  if (renderMatch) {
    const labels = renderMatch[1].split(',').map(l => l.trim().replace(/['"]/g, ''));
    const values = renderMatch[2].split(',').map(v => parseFloat(v.trim()));
    const title = renderMatch[3];
    
    return {
      labels,
      values,
      title,
      isMonetary: title.includes('$') || title.toLowerCase().includes('sales') || title.toLowerCase().includes('revenue'),
      type: determineChartType(title, labels, values)
    };
  }

  // Look for table format like: | Chain | Actual Sales | Budget | Variance |
  const tableMatch = text.match(/\|[^|]+\|[^|]+\|[^|]+\|[^|]+\|/);
  if (tableMatch) {
    return parseTableData(text);
  }

  // Look for simple format like: Chain A: $45,000
  if (text.includes("Chain") && text.includes("$")) {
    return parseSimpleData(text);
  }

  // Look for growth/decline format
  if (text.includes("trend") || text.includes("growth") || text.includes("performance")) {
    return parseGrowthData(text);
  }

  return null;
}

function determineChartType(title: string, labels: string[], values: number[]) {
  const titleLower = title.toLowerCase();
  
  // Time series data (months, quarters, years) = line chart
  if (labels.some(label => 
    ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'].includes(label.toLowerCase()) ||
    label.includes('Q') || 
    label.match(/\d{4}/)
  )) {
    return 'line';
  }
  
  // Trend words = line chart
  if (titleLower.includes('trend') || titleLower.includes('growth') || titleLower.includes('over time')) {
    return 'line';
  }
  
  // Regional/categorical data = bar chart
  return 'bar';
}

function parseTableData(text: string): ChartData | null {
  const lines = text.split('\n').filter(line => line.includes('|'));
  if (lines.length < 2) return null;

  const headers = lines[0].split('|').map(h => h.trim()).filter(h => h);
  const dataLines = lines.slice(2); // Skip header and separator

  const labels: string[] = [];
  const values: number[] = [];
  let isMonetary = false;

  for (const line of dataLines) {
    const cells = line.split('|').map(c => c.trim()).filter(c => c);
    if (cells.length >= 2) {
      labels.push(cells[0]);
      
      // Try to extract numeric value from second column
      const valueText = cells[1];
      const numericValue = parseFloat(valueText.replace(/[^0-9.-]/g, ''));
      
      if (!isNaN(numericValue)) {
        values.push(numericValue);
        if (valueText.includes('$')) isMonetary = true;
      }
    }
  }

  if (labels.length === 0 || values.length === 0) return null;

  return {
    labels,
    values,
    isMonetary,
    title: headers[1] || 'Performance',
    type: 'bar'
  };
}

function parseSimpleData(text: string): ChartData | null {
  const lines = text.split('\n').filter(line => 
    line.includes(':') && line.includes('$')
  );

  const labels: string[] = [];
  const values: number[] = [];

  for (const line of lines) {
    const [label, rawValue] = line.split(':');
    const value = parseFloat(rawValue.replace(/[^0-9.-]/g, ''));
    
    if (label && !isNaN(value)) {
      labels.push(label.trim());
      values.push(value);
    }
  }

  if (labels.length === 0) return null;

  return {
    labels,
    values,
    isMonetary: true,
    title: 'Performance ($)',
    type: 'bar'
  };
}

function parseGrowthData(text: string): ChartData | null {
  const lines = text.split('\n');
  const labels: string[] = [];
  const values: number[] = [];
  let isMonetary = false;
  let title = 'Performance Trend';

  // Look for explicit data tables in the text
  const dataPattern = /(\w+)\s*\|\s*([0-9,$]+)/g;
  let match;
  
  while ((match = dataPattern.exec(text)) !== null) {
    labels.push(match[1].trim());
    const value = parseFloat(match[2].replace(/[^0-9.-]/g, ''));
    values.push(value);
    if (match[2].includes('$')) isMonetary = true;
  }

  // Fallback: look for colon-separated data
  if (labels.length === 0) {
    for (const line of lines) {
      const colonMatch = line.match(/([A-Za-z0-9\s]+):\s*\$?([0-9,]+)/);
      if (colonMatch) {
        labels.push(colonMatch[1].trim());
        const value = parseFloat(colonMatch[2].replace(/,/g, ''));
        values.push(value);
        if (line.includes('$')) isMonetary = true;
      }
    }
  }

  // Extract title from context
  if (text.includes('export sales')) title = 'Export Sales';
  else if (text.includes('revenue')) title = 'Revenue';
  else if (text.includes('performance')) title = 'Performance';

  if (labels.length === 0 || values.length === 0) return null;

  return {
    labels,
    values,
    isMonetary,
    title,
    type: 'line'
  };
}