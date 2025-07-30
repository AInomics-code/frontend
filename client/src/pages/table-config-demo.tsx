import { useState } from 'react';
import { motion } from 'framer-motion';

export default function TableConfigDemo() {
  const [selectedTables, setSelectedTables] = useState<string[]>(['customers', 'orders']);
  const [tableConfigs, setTableConfigs] = useState<Record<string, {
    displayName: string;
    columnDescriptions: Record<string, string>;
    businessQuestions: string[];
  }>>({
    customers: {
      displayName: "Customer Database",
      columnDescriptions: {
        customer_id: "Unique Customer ID",
        company_name: "Business Name",
        contact_email: "Primary Email",
        territory_id: "Sales Territory",
        created_date: "Registration Date",
        status: "Account Status"
      },
      businessQuestions: [
        "Which customers haven't ordered this month?",
        "What's our customer retention rate by territory?",
        "Which high-value customers are at risk?"
      ]
    },
    orders: {
      displayName: "Order History",
      columnDescriptions: {
        order_id: "Order Number",
        customer_id: "Customer Reference",
        product_id: "Product SKU",
        quantity: "Items Ordered",
        order_date: "Purchase Date",
        total_amount: "Order Value",
        status: "Order Status"
      },
      businessQuestions: [
        "What's our average order value trend?",
        "Which products are selling fastest?",
        "What's our order fulfillment rate?"
      ]
    }
  });

  const mockTables = [
    { 
      name: "customers", 
      columns: ["customer_id", "company_name", "contact_email", "territory_id", "created_date", "status"],
      description: "Customer information and contact details" 
    },
    { 
      name: "orders", 
      columns: ["order_id", "customer_id", "product_id", "quantity", "order_date", "total_amount", "status"],
      description: "Order history and transaction data" 
    },
    { 
      name: "products", 
      columns: ["product_id", "product_name", "category", "price", "stock_quantity", "supplier_id"],
      description: "Product catalog and inventory" 
    }
  ];

  const formatTableName = (tableName: string): string => {
    return tableName
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const updateTableConfig = (tableName: string, field: keyof typeof tableConfigs[string], value: any) => {
    setTableConfigs(prev => ({
      ...prev,
      [tableName]: {
        ...prev[tableName],
        [field]: value
      }
    }));
  };

  const updateBusinessQuestion = (tableName: string, questionIndex: number, question: string) => {
    const config = tableConfigs[tableName];
    if (config) {
      const newQuestions = [...config.businessQuestions];
      newQuestions[questionIndex] = question;
      updateTableConfig(tableName, 'businessQuestions', newQuestions);
    }
  };

  const toggleTable = (tableName: string) => {
    setSelectedTables(prev => 
      prev.includes(tableName) 
        ? prev.filter(t => t !== tableName)
        : [...prev, tableName]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-semibold text-slate-100 mb-3">Database Schema Configuration</h1>
              <p className="text-slate-400 text-sm leading-relaxed max-w-2xl">
                Configure your database tables to help VORTA understand your business context and provide more accurate insights.
              </p>
            </div>
            <div className="flex items-center space-x-3 px-4 py-2 bg-slate-800/60 border border-slate-700/40 rounded-lg">
              <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
              <span className="text-slate-300 text-sm font-medium">PostgreSQL Connected</span>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Table Selection Section */}
          <div className="mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <svg className="w-4 h-4 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h12a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V8z" clipRule="evenodd" />
              </svg>
              <h2 className="text-lg font-medium text-slate-200">Available Tables</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {mockTables.map((table) => {
                const isSelected = selectedTables.includes(table.name);
                return (
                  <motion.button
                    key={table.name}
                    className={`p-4 rounded-lg border text-left transition-all group focus:outline-none focus:ring-2 focus:ring-slate-600 ${
                      isSelected
                        ? "border-slate-600 bg-slate-800/60"
                        : "border-slate-700/60 hover:border-slate-600 hover:bg-slate-800/40"
                    }`}
                    onClick={() => toggleTable(table.name)}
                    whileHover={{ scale: 1.005 }}
                    whileTap={{ scale: 0.995 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                          isSelected 
                            ? "border-slate-500 bg-slate-600" 
                            : "border-slate-600 bg-slate-700/60"
                        }`}>
                          {isSelected && (
                            <svg className="w-3 h-3 text-slate-200" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        <span className="text-sm font-medium text-slate-200">
                          {formatTableName(table.name)}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {table.description}
                    </p>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Configuration Section */}
          {selectedTables.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="border-t border-slate-700/40 pt-8">
                <div className="flex items-center space-x-2 mb-6">
                  <svg className="w-4 h-4 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                  </svg>
                  <h2 className="text-lg font-medium text-slate-200">Table Configuration</h2>
                  <span className="text-sm text-slate-500">({selectedTables.length} selected)</span>
                </div>
              </div>

              {selectedTables.map((tableName) => {
                const table = mockTables.find(t => t.name === tableName);
                const config = tableConfigs[tableName];
                
                if (!table || !config) return null;

                return (
                  <motion.div
                    key={tableName}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-slate-800/40 border border-slate-700/30 rounded-lg p-6"
                  >
                    {/* Table Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 bg-slate-700/60 rounded-lg flex items-center justify-center border border-slate-600/40">
                          <svg className="w-4 h-4 text-slate-300" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h12a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V8z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <input
                            value={config.displayName}
                            onChange={(e) => updateTableConfig(tableName, 'displayName', e.target.value)}
                            className="text-lg font-medium text-slate-100 bg-transparent border-none outline-none focus:bg-slate-700/30 rounded px-2 py-1 w-full"
                            placeholder="Table display name"
                          />
                          <p className="text-xs text-slate-500 mt-1 px-2">
                            {tableName} • {table.columns.length} columns
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleTable(tableName)}
                        className="text-slate-500 hover:text-slate-400 transition-colors p-1 rounded focus:outline-none focus:ring-2 focus:ring-slate-600"
                        title="Remove table"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>

                    {/* Business Questions Section */}
                    <div className="mb-6">
                      <div className="flex items-center space-x-2 mb-4">
                        <svg className="w-4 h-4 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm font-medium text-slate-300">Business Context Questions</span>
                        <div className="group relative">
                          <svg className="w-3 h-3 text-slate-500 hover:text-slate-400 cursor-help" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                          </svg>
                          <div className="invisible group-hover:visible absolute bottom-full left-0 mb-2 p-3 bg-slate-800 border border-slate-700 text-xs text-slate-300 rounded-lg shadow-lg whitespace-nowrap z-10">
                            Define common questions to improve AI accuracy
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        {config.businessQuestions.map((question, idx) => (
                          <div key={idx} className="relative">
                            <span className="absolute left-3 top-2.5 text-xs text-slate-500 font-medium">
                              {idx + 1}.
                            </span>
                            <input
                              value={question}
                              onChange={(e) => updateBusinessQuestion(tableName, idx, e.target.value)}
                              placeholder="e.g., Which customers haven't ordered this month?"
                              className="w-full pl-8 pr-4 py-2.5 bg-slate-700/30 border border-slate-600/50 rounded-lg text-sm text-slate-200 placeholder-slate-500 focus:border-slate-500 focus:bg-slate-700/50 focus:outline-none transition-colors"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Column Mapping Section */}
                    <div className="border-t border-slate-700/40 pt-6">
                      <div className="flex items-center space-x-2 mb-4">
                        <svg className="w-4 h-4 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                        </svg>
                        <span className="text-sm font-medium text-slate-300">Column Mapping</span>
                        <span className="text-xs text-slate-500">({table.columns.length} columns)</span>
                      </div>
                      <div className="space-y-2">
                        {table.columns.slice(0, 6).map((column) => (
                          <div key={column} className="grid grid-cols-5 gap-3 items-center">
                            <div className="col-span-2">
                              <span className="text-xs font-mono text-slate-400 bg-slate-700/30 px-2 py-1 rounded border border-slate-600/30">
                                {column}
                              </span>
                            </div>
                            <div className="col-span-3">
                              <input
                                value={config.columnDescriptions[column] || ''}
                                onChange={(e) => {
                                  const newDescriptions = { ...config.columnDescriptions };
                                  newDescriptions[column] = e.target.value;
                                  updateTableConfig(tableName, 'columnDescriptions', newDescriptions);
                                }}
                                placeholder="Business-friendly description..."
                                className="w-full px-3 py-1.5 bg-slate-700/30 border border-slate-600/50 rounded text-xs text-slate-200 placeholder-slate-500 focus:border-slate-500 focus:bg-slate-700/50 focus:outline-none transition-colors"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                      {table.columns.length > 6 && (
                        <div className="mt-3 pt-2 border-t border-slate-700/30">
                          <p className="text-xs text-slate-500">
                            + {table.columns.length - 6} additional columns available for mapping
                          </p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}