import { useState } from "react";
import { Lightbulb, TrendingUp, Users, Package, DollarSign, AlertTriangle, BarChart3, Target, Zap } from "lucide-react";

interface PromptSuggestion {
  id: string;
  text: string;
  category: string;
  icon: React.ReactNode;
  priority: 'high' | 'medium' | 'low';
}

interface PromptGeneratorProps {
  onPromptSelect: (prompt: string) => void;
  isVisible: boolean;
  onToggle: () => void;
}

export function PromptGenerator({ onPromptSelect, isVisible, onToggle }: PromptGeneratorProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const promptSuggestions: PromptSuggestion[] = [
    // High Priority - Critical Business Questions
    {
      id: 'cash-flow',
      text: "What is our current cash flow situation and which clients pose the highest collection risk?",
      category: 'financial',
      icon: <DollarSign size={16} className="text-red-600" />,
      priority: 'high'
    },
    {
      id: 'stock-alerts',
      text: "Which products are experiencing stockouts and what is the revenue impact?",
      category: 'inventory',
      icon: <AlertTriangle size={16} className="text-red-600" />,
      priority: 'high'
    },
    {
      id: 'underperforming-regions',
      text: "Which regions are underperforming and what specific actions should we take?",
      category: 'performance',
      icon: <TrendingUp size={16} className="text-red-600" />,
      priority: 'high'
    },

    // Medium Priority - Strategic Analysis
    {
      id: 'top-performers',
      text: "Which sales reps, products, and regions are driving our strongest results?",
      category: 'performance',
      icon: <Target size={16} className="text-blue-600" />,
      priority: 'medium'
    },
    {
      id: 'client-analysis',
      text: "Analyze our top 5 clients by revenue and identify growth opportunities",
      category: 'clients',
      icon: <Users size={16} className="text-blue-600" />,
      priority: 'medium'
    },
    {
      id: 'product-margins',
      text: "Which products have the highest profit margins and should we focus on promoting them?",
      category: 'products',
      icon: <Package size={16} className="text-blue-600" />,
      priority: 'medium'
    },
    {
      id: 'promotion-roi',
      text: "What is the ROI of our current promotional campaigns and which should we expand?",
      category: 'marketing',
      icon: <BarChart3 size={16} className="text-blue-600" />,
      priority: 'medium'
    },

    // Low Priority - Operational Insights
    {
      id: 'daily-summary',
      text: "Give me a comprehensive summary of today's business performance",
      category: 'operations',
      icon: <Lightbulb size={16} className="text-green-600" />,
      priority: 'low'
    },
    {
      id: 'territory-routes',
      text: "How can we optimize sales rep routes to improve territory coverage?",
      category: 'operations',
      icon: <Zap size={16} className="text-green-600" />,
      priority: 'low'
    },
    {
      id: 'new-opportunities',
      text: "What new market opportunities should La Doña consider based on current trends?",
      category: 'strategy',
      icon: <TrendingUp size={16} className="text-green-600" />,
      priority: 'low'
    },
    {
      id: 'competitive-analysis',
      text: "How does La Doña's market position compare to our main competitors?",
      category: 'strategy',
      icon: <BarChart3 size={16} className="text-green-600" />,
      priority: 'low'
    },
    {
      id: 'backorder-impact',
      text: "What is the impact of current backorders on customer satisfaction and revenue?",
      category: 'inventory',
      icon: <Package size={16} className="text-orange-600" />,
      priority: 'medium'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Questions', count: promptSuggestions.length },
    { id: 'financial', name: 'Financial', count: promptSuggestions.filter(p => p.category === 'financial').length },
    { id: 'performance', name: 'Performance', count: promptSuggestions.filter(p => p.category === 'performance').length },
    { id: 'clients', name: 'Clients', count: promptSuggestions.filter(p => p.category === 'clients').length },
    { id: 'inventory', name: 'Inventory', count: promptSuggestions.filter(p => p.category === 'inventory').length },
    { id: 'operations', name: 'Operations', count: promptSuggestions.filter(p => p.category === 'operations').length }
  ];

  const filteredPrompts = selectedCategory === 'all' 
    ? promptSuggestions 
    : promptSuggestions.filter(p => p.category === selectedCategory);

  const priorityOrder = { 'high': 0, 'medium': 1, 'low': 2 };
  const sortedPrompts = filteredPrompts.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <span className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded-full">Critical</span>;
      case 'medium':
        return <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">Strategic</span>;
      case 'low':
        return <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">Insight</span>;
      default:
        return null;
    }
  };

  if (!isVisible) {
    return (
      <button
        onClick={onToggle}
        className="fixed bottom-6 left-6 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-200 z-50 group"
        title="AI Prompt Generator"
      >
        <Lightbulb size={20} />
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
          {promptSuggestions.filter(p => p.priority === 'high').length}
        </div>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 left-6 w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50 animate-slideInLeft">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lightbulb size={20} className="text-blue-600" />
            <h3 className="font-semibold text-gray-900">AI Prompt Generator</h3>
          </div>
          <button
            onClick={onToggle}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            ×
          </button>
        </div>
        <p className="text-sm text-gray-600 mt-1">Smart business questions for La Doña</p>
      </div>

      {/* Category Filters */}
      <div className="p-3 border-b border-gray-100">
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-3 py-1 text-xs rounded-full transition-all ${
                selectedCategory === category.id
                  ? 'bg-blue-100 text-blue-700 border border-blue-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>
      </div>

      {/* Prompt List */}
      <div className="max-h-96 overflow-y-auto">
        <div className="p-3 space-y-2">
          {sortedPrompts.map(prompt => (
            <button
              key={prompt.id}
              onClick={() => {
                onPromptSelect(prompt.text);
                onToggle();
              }}
              className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group"
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  {prompt.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    {getPriorityBadge(prompt.priority)}
                    <span className="text-xs text-gray-500 uppercase tracking-wide">
                      {prompt.category}
                    </span>
                  </div>
                  <p className="text-sm text-gray-900 group-hover:text-blue-900 transition-colors">
                    {prompt.text}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-gray-100 bg-gray-50">
        <p className="text-xs text-gray-500 text-center">
          Click any question to ask La Doña AI instantly
        </p>
      </div>
    </div>
  );
}