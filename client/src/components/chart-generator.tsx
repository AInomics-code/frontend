import { useEffect, useRef } from "react";

interface ChartGeneratorProps {
  content: string;
  messageId: string;
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

    // Create new chart
    const ctx = canvasRef.current.getContext('2d');
    if (ctx) {
      chartRef.current = new window.Chart(ctx, {
        type: 'bar',
        data: {
          labels: chartData.labels,
          datasets: [{
            label: chartData.title || 'Performance ($)',
            data: chartData.values,
            backgroundColor: '#e23d28',
            borderColor: '#d63384',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: function(value: any) {
                  if (chartData.isMonetary) {
                    return '$' + value.toLocaleString();
                  }
                  return value;
                }
              }
            }
          },
          plugins: {
            legend: {
              display: true,
              position: 'top' as const
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
    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
      <div style={{ height: '300px' }}>
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}

function parseChartData(text: string) {
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
  if (text.includes("📈") || text.includes("📉")) {
    return parseGrowthData(text);
  }

  return null;
}

function parseTableData(text: string) {
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
    title: headers[1] || 'Performance'
  };
}

function parseSimpleData(text: string) {
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
    title: 'Performance ($)'
  };
}

function parseGrowthData(text: string) {
  const growthLines = text.split('\n').filter(line => 
    (line.includes('📈') || line.includes('📉')) && line.includes('%')
  );

  const labels: string[] = [];
  const values: number[] = [];

  for (const line of growthLines) {
    const percentMatch = line.match(/([-+]?\d+)%/);
    const productMatch = line.match(/([^:]+):/);
    
    if (percentMatch && productMatch) {
      labels.push(productMatch[1].replace('📈', '').replace('📉', '').trim());
      values.push(parseFloat(percentMatch[1]));
    }
  }

  if (labels.length === 0) return null;

  return {
    labels,
    values,
    isMonetary: false,
    title: 'Growth/Decline (%)'
  };
}