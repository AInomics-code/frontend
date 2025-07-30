import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Database, Building, Target, FileSpreadsheet, Globe, FileText } from "lucide-react";

interface OnboardingStep {
  id: number;
  title: string;
  description: string;
}

const steps: OnboardingStep[] = [
  {
    id: 1,
    title: "Welcome to VORTA",
    description: "Let's get your business intelligence platform set up in just a few steps."
  },
  {
    id: 2,
    title: "What's your industry?",
    description: "This helps us customize your experience with relevant insights and metrics."
  },
  {
    id: 3,
    title: "What's your primary use case?",
    description: "Tell us how you plan to use VORTA to get the most relevant features."
  },
  {
    id: 4,
    title: "Select Your Database",
    description: "Choose your primary database to connect VORTA with your business data."
  },
  {
    id: 5,
    title: "Database Connection",
    description: "Enter your database credentials to establish the connection."
  },
  {
    id: 6,
    title: "Configure Schema",
    description: "Help VORTA understand your data structure for better insights."
  }
];

const industries = [
  "Food & Beverage",
  "Retail",
  "Manufacturing",
  "Technology",
  "Healthcare",
  "Finance",
  "Other"
];

const useCases = [
  "Sales Performance Tracking",
  "Financial Analytics",
  "Inventory Management",
  "Customer Intelligence",
  "Operations Dashboard",
  "Executive Reporting"
];

const databases = [
  { 
    name: "PostgreSQL", 
    icon: Database, 
    defaultPort: "5432",
    description: "Open source relational database"
  },
  { 
    name: "MySQL", 
    icon: Database, 
    defaultPort: "3306",
    description: "Popular relational database system"
  },
  { 
    name: "Microsoft SQL Server", 
    icon: Database, 
    defaultPort: "1433",
    description: "Enterprise database platform"
  },
  { 
    name: "Oracle", 
    icon: Database, 
    defaultPort: "1521",
    description: "Enterprise-grade database system"
  },
  { 
    name: "MongoDB", 
    icon: Database, 
    defaultPort: "27017",
    description: "NoSQL document database"
  },
  { 
    name: "Redis", 
    icon: Database, 
    defaultPort: "6379",
    description: "In-memory data store"
  }
];

const dataSources = [
  { name: "Google Sheets", icon: FileSpreadsheet },
  { name: "Custom API", icon: Globe },
  { name: "Excel / CSV", icon: FileText }
];

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [selectedUseCase, setSelectedUseCase] = useState("");
  const [selectedDB, setSelectedDB] = useState<string | null>(null);
  const [credentials, setCredentials] = useState({
    host: '',
    port: '',
    username: '',
    password: '',
    database: ''
  });
  const [isConnecting, setIsConnecting] = useState(false);
  const [dbConnectionSuccess, setDbConnectionSuccess] = useState(false);
  const [showCredentialsForm, setShowCredentialsForm] = useState(false);
  const [autoConnecting, setAutoConnecting] = useState(false);
  const [selectedTables, setSelectedTables] = useState<string[]>([]);
  const [tableConfigs, setTableConfigs] = useState<Record<string, {
    displayName: string;
    columnDescriptions: Record<string, string>;
    businessQuestions: string[];
  }>>({});
  const [, setLocation] = useLocation();

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
    },
    { 
      name: "sales_reps", 
      columns: ["rep_id", "full_name", "territory_id", "hire_date", "commission_rate", "status"],
      description: "Sales team member information" 
    },
    { 
      name: "territories", 
      columns: ["territory_id", "territory_name", "region", "manager_id", "target_revenue"],
      description: "Regional sales territories" 
    },
    { 
      name: "invoices", 
      columns: ["invoice_id", "order_id", "amount", "tax", "invoice_date", "due_date", "payment_status"],
      description: "Billing and payment records" 
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding
      setLocation("/dashboard");
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return true;
      case 2:
        return selectedIndustry !== "";
      case 3:
        return selectedUseCase !== "";
      case 4:
        return selectedDB !== null;
      case 5:
        return credentials.host && credentials.port && credentials.username && credentials.database;
      case 6:
        return selectedTables.length > 0 && selectedTables.some(tableName => {
          const config = tableConfigs[tableName];
          return config && config.businessQuestions.some(q => q.trim().length > 0);
        });
      default:
        return false;
    }
  };

  const toggleTable = (tableName: string) => {
    setSelectedTables(prev => {
      const isCurrentlySelected = prev.includes(tableName);
      
      if (isCurrentlySelected) {
        // Remove table and its config
        const newTableConfigs = { ...tableConfigs };
        delete newTableConfigs[tableName];
        setTableConfigs(newTableConfigs);
        return prev.filter(t => t !== tableName);
      } else {
        // Add table and initialize its config
        const table = mockTables.find(t => t.name === tableName);
        if (table) {
          const displayName = formatTableName(tableName);
          const columnDescriptions: Record<string, string> = {};
          table.columns.forEach(col => {
            columnDescriptions[col] = formatColumnName(col);
          });
          
          setTableConfigs(prev => ({
            ...prev,
            [tableName]: {
              displayName,
              columnDescriptions,
              businessQuestions: ["", "", ""]
            }
          }));
        }
        return [...prev, tableName];
      }
    });
  };

  const formatTableName = (tableName: string): string => {
    return tableName
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const formatColumnName = (columnName: string): string => {
    return columnName
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

  const handleDatabaseSelect = (dbName: string) => {
    setSelectedDB(dbName);
    const selectedDatabase = databases.find(db => db.name === dbName);
    if (selectedDatabase) {
      setCredentials({
        ...credentials,
        port: selectedDatabase.defaultPort
      });
    }
  };

  const handleContinueToCredentials = () => {
    setShowCredentialsForm(true);
    setCurrentStep(5);
  };

  const connectToDatabase = async () => {
    setIsConnecting(true);
    // Mock API call
    setTimeout(() => {
      setDbConnectionSuccess(true);
      setIsConnecting(false);
      console.log('Database Config:', {
        engine: selectedDB,
        host: credentials.host,
        port: credentials.port,
        database: credentials.database,
        username: credentials.username,
        password: credentials.password
      });
      
      // Auto-proceed to next step after successful connection
      setTimeout(() => {
        setCurrentStep(6); // Move to Table Schema Cards
      }, 1000);
    }, 2000);
  };

  const handleCredentialsSubmit = () => {
    setAutoConnecting(true);
    connectToDatabase();
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center mx-auto">
              <span className="text-white text-2xl font-bold">V</span>
            </div>
            <p className="text-blue-200 text-lg">
              Your AI-powered business intelligence platform is ready to transform how you make decisions.
            </p>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {industries.map((industry) => (
                <button
                  key={industry}
                  onClick={() => setSelectedIndustry(industry)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    selectedIndustry === industry
                      ? "border-blue-500 bg-gradient-to-r from-blue-600 to-blue-700 text-white"
                      : "border-slate-600 hover:border-blue-400 text-blue-200"
                  }`}
                >
                  {industry}
                </button>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-3">
              {useCases.map((useCase) => (
                <button
                  key={useCase}
                  onClick={() => setSelectedUseCase(useCase)}
                  className={`p-4 rounded-xl border-2 transition-all text-left ${
                    selectedUseCase === useCase
                      ? "border-blue-500 bg-gradient-to-r from-blue-600 to-blue-700 text-white"
                      : "border-slate-600 hover:border-blue-400 text-blue-200"
                  }`}
                >
                  {useCase}
                </button>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {databases.map((database) => {
                const Icon = database.icon;
                const isSelected = selectedDB === database.name;
                return (
                  <motion.div
                    key={database.name}
                    className={`p-6 rounded-2xl border-2 transition-all cursor-pointer group ${
                      isSelected
                        ? "border-blue-500 bg-blue-500/20"
                        : "border-slate-600 hover:border-blue-400 hover:bg-slate-700/50"
                    }`}
                    onClick={() => handleDatabaseSelect(database.name)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-xl flex-shrink-0 ${
                        isSelected 
                          ? "bg-blue-500 text-white" 
                          : "bg-slate-700 text-blue-200 group-hover:bg-slate-600"
                      }`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-medium mb-1 ${
                          isSelected ? "text-blue-400" : "text-blue-200"
                        }`}>
                          {database.name}
                        </h3>
                        <p className="text-sm text-slate-400">
                          {database.description}
                        </p>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                        isSelected 
                          ? "border-blue-500 bg-blue-500" 
                          : "border-slate-500 bg-slate-700"
                      }`}>
                        {isSelected && (
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        );

      case 5:
        return (
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {selectedDB && (
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-blue-500 rounded-lg">
                    <Database className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-blue-200 font-medium">{selectedDB}</h3>
                    <p className="text-sm text-slate-400">Database Connection</p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-blue-200 mb-2">Host</label>
                  <input
                    type="text"
                    value={credentials.host}
                    onChange={(e) => setCredentials({...credentials, host: e.target.value})}
                    placeholder="localhost"
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-200 mb-2">Port</label>
                  <input
                    type="text"
                    value={credentials.port}
                    onChange={(e) => setCredentials({...credentials, port: e.target.value})}
                    placeholder="5432"
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-200 mb-2">Username</label>
                  <input
                    type="text"
                    value={credentials.username}
                    onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                    placeholder="admin"
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-200 mb-2">Password</label>
                  <input
                    type="password"
                    value={credentials.password}
                    onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-blue-200 mb-2">Database Name</label>
                  <input
                    type="text"
                    value={credentials.database}
                    onChange={(e) => setCredentials({...credentials, database: e.target.value})}
                    placeholder="my_database"
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              {dbConnectionSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center space-x-3 p-4 bg-green-500/20 border border-green-500/50 rounded-xl"
                >
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 12 12">
                      <path d="M10 3L4.5 8.5 2 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="text-green-400 font-medium">Connection successful!</span>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        );

      case 6:
        return (
          <div className="space-y-8">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-slate-100 mb-2">Database Schema Configuration</h2>
                  <p className="text-slate-400 text-sm leading-relaxed max-w-2xl">
                    Configure your database tables to help VORTA understand your business context and provide more accurate insights.
                  </p>
                </div>
                <div className="flex items-center space-x-3 px-4 py-2 bg-slate-800/60 border border-slate-700/40 rounded-lg">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  <span className="text-slate-300 text-sm font-medium">{selectedDB} Connected</span>
                </div>
              </div>
            </div>

            {/* Table Selection Section */}
            <div className="mb-8">
              <div className="flex items-center space-x-2 mb-4">
                <svg className="w-4 h-4 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h12a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V8z" clipRule="evenodd" />
                </svg>
                <h3 className="text-lg font-medium text-slate-200">Available Tables</h3>
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

            {/* Selected Tables Configuration */}
            {selectedTables.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-slate-600/50 rounded-lg flex items-center justify-center border border-slate-500/30">
                      <svg className="w-4 h-4 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0-2.278-3.694-4.125-8.25-4.125s-8.25 1.847-8.25 4.125" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-slate-200">Table Configuration</h3>
                      <p className="text-xs text-slate-500 mt-0.5">{selectedTables.length} tables selected for AI training</p>
                    </div>
                  </div>
                  <div className={`px-3 py-1.5 rounded-full text-xs font-medium border ${
                    hasValidBusinessQuestions() 
                      ? "bg-emerald-400/10 border-emerald-400/30 text-emerald-400" 
                      : "bg-amber-400/10 border-amber-400/30 text-amber-400"
                  }`}>
                    {hasValidBusinessQuestions() ? "✓ Complete" : "⚠ Questions Required"}
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
                      className="bg-gradient-to-br from-slate-800/50 to-slate-800/30 border border-slate-600/30 rounded-xl p-6 shadow-lg backdrop-blur-sm"
                    >
                      {/* Table Header */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-slate-600/80 to-slate-700/80 rounded-lg flex items-center justify-center border border-slate-500/30">
                            <svg className="w-5 h-5 text-slate-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0-2.278-3.694-4.125-8.25-4.125s-8.25 1.847-8.25 4.125" />
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
                          <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m4.5 0a12.06 12.06 0 00-1.5-1.5m0 0L12 21m0 0l-2.5-2.5m0 0a12.06 12.06 0 01-1.5 1.5M12 18l2.5-2.5m0 0V15.75a6 6 0 10-1.5-1.5m0 0V12m0 6.75a6 6 0 011.5 1.5" />
                          </svg>
                          <span className="text-sm font-medium text-blue-300">Common Business Questions</span>
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
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f23] via-[#1a1a2e] to-[#16213e] flex items-center justify-center px-4">
      <div className="w-full max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-blue-200 mb-2">
            <span>Step {currentStep} of {steps.length}</span>
            <span>{Math.round((currentStep / steps.length) * 100)}% complete</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <motion.div 
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(currentStep / steps.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <motion.div 
          className="bg-gradient-to-br from-[#1c2340] to-[#2a3b5c] p-8 rounded-2xl shadow-xl border border-blue-500/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="text-2xl font-semibold text-white mb-4">
                {steps[currentStep - 1].title}
              </h1>
              <p className="text-blue-200 mb-8">
                {steps[currentStep - 1].description}
              </p>

              {renderStepContent()}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className={`flex items-center px-4 py-2 rounded-xl transition ${
                currentStep === 1
                  ? "text-slate-500 cursor-not-allowed"
                  : "text-blue-200 hover:text-white"
              }`}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </button>

            {currentStep === 4 ? (
              <button
                onClick={handleContinueToCredentials}
                disabled={!canProceed()}
                className={`flex items-center px-6 py-2 rounded-xl transition ${
                  canProceed()
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-500 hover:to-blue-600"
                    : "bg-slate-600 text-slate-400 cursor-not-allowed"
                }`}
              >
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            ) : currentStep === 5 ? (
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setLocation("/dashboard")}
                  className="text-slate-400 hover:text-blue-200 transition-colors"
                >
                  Skip for now
                </button>
                <button
                  onClick={handleCredentialsSubmit}
                  disabled={!canProceed() || isConnecting}
                  className={`flex items-center px-6 py-3 rounded-xl font-medium transition ${
                    canProceed() && !isConnecting
                      ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-500 hover:to-blue-600"
                      : "bg-slate-600 text-slate-400 cursor-not-allowed"
                  }`}
                >
                  {isConnecting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Connecting...
                    </>
                  ) : (
                    <>
                      Connect & Continue →
                    </>
                  )}
                </button>
              </div>
            ) : currentStep === 6 ? (
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setLocation("/dashboard")}
                  className="text-slate-400 hover:text-blue-200 transition-colors"
                >
                  Skip for now
                </button>
                <button
                  onClick={() => {
                    // Log final configuration for debugging/development
                    console.log("Final Table Configuration:", {
                      selectedTables,
                      tableConfigs,
                      database: selectedDB,
                      credentials: { ...credentials, password: '[REDACTED]' }
                    });
                    setLocation("/dashboard");
                  }}
                  disabled={!canProceed()}
                  className={`flex items-center px-6 py-3 rounded-xl font-medium transition ${
                    canProceed()
                      ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-500 hover:to-blue-600"
                      : "bg-slate-600 text-slate-400 cursor-not-allowed"
                  }`}
                >
                  Complete Setup →
                </button>
              </div>
            ) : (
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className={`flex items-center px-6 py-2 rounded-xl transition ${
                  canProceed()
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-500 hover:to-blue-600"
                    : "bg-slate-600 text-slate-400 cursor-not-allowed"
                }`}
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}