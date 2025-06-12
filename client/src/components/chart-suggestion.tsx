import { useState } from "react";
import { BarChart3, LineChart, PieChart, TrendingUp, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChartSuggestionProps {
  content: string;
  onGenerateChart: (chartType: string, data: any) => void;
}

export function ChartSuggestion({ content, onGenerateChart }: ChartSuggestionProps) {
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Detect if content contains chartable data
  const hasChartableData = detectChartableData(content);
  
  if (!hasChartableData) return null;

  const chartTypes = [
    { type: 'bar', icon: BarChart3, label: 'Bar Chart', description: 'Compare values across categories' },
    { type: 'line', icon: LineChart, label: 'Line Chart', description: 'Show trends over time' },
    { type: 'pie', icon: PieChart, label: 'Pie Chart', description: 'Show proportions' },
    { type: 'trend', icon: TrendingUp, label: 'Trend Analysis', description: 'Highlight performance trends' }
  ];

  const extractedData = extractDataFromContent(content);

  return (
    <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BarChart3 size={16} className="text-blue-600" />
          <span className="text-sm font-medium text-blue-800">Chart visualization available</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowSuggestions(!showSuggestions)}
          className="text-blue-600 hover:text-blue-800"
        >
          {showSuggestions ? 'Hide' : 'Show options'}
          <ChevronRight size={14} className={`ml-1 transition-transform ${showSuggestions ? 'rotate-90' : ''}`} />
        </Button>
      </div>
      
      {showSuggestions && (
        <div className="mt-3 grid grid-cols-2 gap-2">
          {chartTypes.map(({ type, icon: Icon, label, description }) => (
            <Button
              key={type}
              variant="outline"
              size="sm"
              onClick={() => onGenerateChart(type, extractedData)}
              className="flex flex-col items-start p-3 h-auto text-left hover:bg-blue-50"
            >
              <div className="flex items-center gap-2 mb-1">
                <Icon size={14} />
                <span className="font-medium text-xs">{label}</span>
              </div>
              <span className="text-xs text-gray-600">{description}</span>
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}

function detectChartableData(content: string): boolean {
  const indicators = [
    // Performance metrics
    /\d+%.*(?:target|performance|goal)/i,
    /sales.*\$[\d,]+/i,
    /revenue.*\$[\d,]+/i,
    /growth.*\d+%/i,
    
    // Regional data
    /region.*\d+/i,
    /store.*performance/i,
    
    // Product data
    /product.*sales/i,
    /inventory.*\d+/i,
    
    // Time series data
    /(?:january|february|march|april|may|june|july|august|september|october|november|december)/i,
    /(?:q1|q2|q3|q4|quarter)/i,
    /(?:month|week|day).*\d+/i,
    
    // Comparative data
    /vs\.?\s+\d+/i,
    /compared.*\d+/i,
    /\d+.*vs.*\d+/i
  ];

  return indicators.some(pattern => pattern.test(content));
}

function extractDataFromContent(content: string): any {
  // Extract numerical data and labels from content
  const data = {
    title: extractTitle(content),
    values: extractNumbers(content),
    labels: extractLabels(content),
    isMonetary: /\$|revenue|sales|profit/i.test(content),
    isPercentage: /%|percent|performance|target/i.test(content)
  };

  return data;
}

function extractTitle(content: string): string {
  // Try to extract a meaningful title from the content
  const sentences = content.split(/[.!?]+/);
  for (const sentence of sentences) {
    if (sentence.length > 10 && sentence.length < 60) {
      return sentence.trim();
    }
  }
  return "Performance Data";
}

function extractNumbers(content: string): number[] {
  const numberPattern = /\$?(\d+(?:,\d{3})*(?:\.\d+)?)/g;
  const matches = Array.from(content.matchAll(numberPattern));
  return matches.map(match => parseFloat(match[1].replace(/,/g, ''))).slice(0, 10);
}

function extractLabels(content: string): string[] {
  const regionPattern = /(?:región|region|store|product|client)\s+([A-Za-z\s]+)/gi;
  const monthPattern = /(?:january|february|march|april|may|june|july|august|september|october|november|december)/gi;
  const quarterPattern = /q[1-4]|quarter\s+[1-4]/gi;
  
  const labels = [
    ...Array.from(content.matchAll(regionPattern)).map(m => m[1].trim()),
    ...Array.from(content.matchAll(monthPattern)).map(m => m[0]),
    ...Array.from(content.matchAll(quarterPattern)).map(m => m[0])
  ];

  return labels.length > 0 ? labels.slice(0, 10) : ['Category A', 'Category B', 'Category C'];
}