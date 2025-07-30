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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Enhanced Table Configuration</h1>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-green-400 text-sm font-medium">Connected to PostgreSQL</span>
          </div>
          <p className="text-slate-400">
            This shows the enhanced table configuration that appears in step 6 of onboarding
          </p>
        </div>

        <div className="space-y-6">
          {/* Table Selection Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
            {mockTables.map((table) => {
              const isSelected = selectedTables.includes(table.name);
              return (
                <motion.div
                  key={table.name}
                  className={`p-3 rounded-lg border transition-all cursor-pointer group ${
                    isSelected
                      ? "border-blue-500 bg-blue-500/10"
                      : "border-slate-600 hover:border-blue-400 hover:bg-slate-700/30"
                  }`}
                  onClick={() => toggleTable(table.name)}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className={`w-6 h-6 rounded flex items-center justify-center ${
                        isSelected 
                          ? "bg-blue-500 text-white" 
                          : "bg-slate-700 text-slate-400"
                      }`}>
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h12a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V8z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className={`text-sm font-medium ${
                        isSelected ? "text-blue-300" : "text-slate-300"
                      }`}>
                        {formatTableName(table.name)}
                      </span>
                    </div>
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      isSelected 
                        ? "border-blue-500 bg-blue-500" 
                        : "border-slate-500"
                    }`}>
                      {isSelected && (
                        <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Selected Tables Configuration */}
          {selectedTables.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="flex items-center space-x-2 mb-4">
                <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-blue-400 text-sm font-medium">
                  Configure {selectedTables.length} selected table{selectedTables.length !== 1 ? 's' : ''}
                </span>
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
                    className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-5"
                  >
                    {/* Table Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h12a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V8z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <input
                            value={config.displayName}
                            onChange={(e) => updateTableConfig(tableName, 'displayName', e.target.value)}
                            className="text-lg font-semibold text-white bg-transparent border-none outline-none focus:bg-slate-700/50 rounded px-2 py-1"
                          />
                          <p className="text-xs text-slate-400">{tableName} • {table.columns.length} columns</p>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleTable(tableName)}
                        className="text-slate-400 hover:text-red-400 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>

                    {/* Business Questions Section */}
                    <div className="mb-4">
                      <div className="flex items-center space-x-2 mb-3">
                        <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm font-medium text-blue-300">Business Questions</span>
                        <div className="group relative">
                          <svg className="w-3 h-3 text-slate-500 hover:text-slate-300 cursor-help" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                          </svg>
                          <div className="invisible group-hover:visible absolute bottom-full left-0 mb-2 p-2 bg-slate-800 text-xs text-white rounded shadow-lg whitespace-nowrap">
                            Help VORTA understand your business context
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        {config.businessQuestions.map((question, idx) => (
                          <input
                            key={idx}
                            value={question}
                            onChange={(e) => updateBusinessQuestion(tableName, idx, e.target.value)}
                            placeholder={`Question ${idx + 1}: e.g., "Which customers haven't ordered this month?"`}
                            className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none text-sm"
                          />
                        ))}
                      </div>
                    </div>

                    {/* Column Mapping Section */}
                    <div>
                      <div className="flex items-center space-x-2 mb-3">
                        <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                        </svg>
                        <span className="text-sm font-medium text-blue-300">Column Descriptions</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {table.columns.slice(0, 6).map((column) => (
                          <div key={column} className="flex items-center space-x-2">
                            <span className="text-xs text-slate-400 font-mono w-20 truncate">{column}</span>
                            <input
                              value={config.columnDescriptions[column] || ''}
                              onChange={(e) => {
                                const newDescriptions = { ...config.columnDescriptions };
                                newDescriptions[column] = e.target.value;
                                updateTableConfig(tableName, 'columnDescriptions', newDescriptions);
                              }}
                              placeholder="Description..."
                              className="flex-1 px-2 py-1 bg-slate-700/30 border border-slate-600/50 rounded text-xs text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                            />
                          </div>
                        ))}
                      </div>
                      {table.columns.length > 6 && (
                        <p className="text-xs text-slate-500 mt-2">
                          + {table.columns.length - 6} more columns...
                        </p>
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