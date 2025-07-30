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
  const [, setLocation] = useLocation();

  const mockTables = [
    { name: "customers", description: "Customer information and contact details" },
    { name: "orders", description: "Order history and transaction data" },
    { name: "products", description: "Product catalog and inventory" },
    { name: "sales_reps", description: "Sales team member information" },
    { name: "territories", description: "Regional sales territories" },
    { name: "invoices", description: "Billing and payment records" }
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
        return selectedTables.length > 0;
      default:
        return false;
    }
  };

  const toggleTable = (tableName: string) => {
    setSelectedTables(prev => 
      prev.includes(tableName) 
        ? prev.filter(t => t !== tableName)
        : [...prev, tableName]
    );
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
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-400 text-sm font-medium">Connected to {selectedDB}</span>
              </div>
              <p className="text-slate-400 text-sm">
                Select the tables VORTA should analyze for business insights
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockTables.map((table) => {
                const isSelected = selectedTables.includes(table.name);
                return (
                  <motion.div
                    key={table.name}
                    className={`p-4 rounded-xl border-2 transition-all cursor-pointer group ${
                      isSelected
                        ? "border-blue-500 bg-blue-500/20"
                        : "border-slate-600 hover:border-blue-400 hover:bg-slate-700/50"
                    }`}
                    onClick={() => toggleTable(table.name)}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            isSelected 
                              ? "bg-blue-500 text-white" 
                              : "bg-slate-700 text-blue-200 group-hover:bg-slate-600"
                          }`}>
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h12a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm4 2a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <h3 className={`font-medium ${
                            isSelected ? "text-blue-400" : "text-blue-200"
                          }`}>
                            {table.name}
                          </h3>
                        </div>
                        <p className="text-sm text-slate-400 ml-11">
                          {table.description}
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

            {selectedTables.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4"
              >
                <div className="flex items-center space-x-2 mb-2">
                  <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <span className="text-blue-400 text-sm font-medium">
                    {selectedTables.length} table{selectedTables.length !== 1 ? 's' : ''} selected
                  </span>
                </div>
                <p className="text-slate-400 text-sm">
                  VORTA will analyze these tables to provide business insights and answer your questions.
                </p>
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
                  onClick={() => setLocation("/dashboard")}
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