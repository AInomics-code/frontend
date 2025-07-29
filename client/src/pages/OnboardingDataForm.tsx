import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Plug, HelpCircle, Brain, Plus, Trash2, Eye, EyeOff, ArrowRight, Save } from "lucide-react";

interface DatabaseConfig {
  engine: string;
  host: string;
  port: string;
  database: string;
  username: string;
  password: string;
}

interface SalesQuestion {
  id: string;
  text: string;
}

interface SchemaConfig {
  tableDescriptions: string;
  keyColumns: string;
  kpiFormulas: string;
}

export default function OnboardingDataForm() {
  const [, setLocation] = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [currentSection, setCurrentSection] = useState(1);
  
  // Database configuration state
  const [dbConfig, setDbConfig] = useState<DatabaseConfig>({
    engine: '',
    host: '',
    port: '',
    database: '',
    username: '',
    password: ''
  });

  // Sales questions state
  const [salesQuestions, setSalesQuestions] = useState<SalesQuestion[]>([
    { id: '1', text: 'Which customers stopped ordering this month?' },
    { id: '2', text: 'Where are we behind on targets?' },
    { id: '3', text: 'What SKUs aren\'t moving by region?' }
  ]);

  // Schema configuration state
  const [schemaConfig, setSchemaConfig] = useState<SchemaConfig>({
    tableDescriptions: '',
    keyColumns: '',
    kpiFormulas: ''
  });

  const [isPublicAccess, setIsPublicAccess] = useState(true);

  const handleAddQuestion = () => {
    const newId = (salesQuestions.length + 1).toString();
    setSalesQuestions([...salesQuestions, { id: newId, text: '' }]);
  };

  const handleRemoveQuestion = (id: string) => {
    if (salesQuestions.length > 1) {
      setSalesQuestions(salesQuestions.filter(q => q.id !== id));
    }
  };

  const handleQuestionChange = (id: string, text: string) => {
    setSalesQuestions(salesQuestions.map(q => 
      q.id === id ? { ...q, text } : q
    ));
  };

  const handleContinueToDashboard = () => {
    // Store all configuration data (in real app, would send to API)
    console.log('Database Config:', dbConfig);
    console.log('Sales Questions:', salesQuestions);
    console.log('Schema Config:', schemaConfig);
    
    setLocation("/dashboard");
  };

  const handleSaveForLater = () => {
    // Save current progress and redirect
    console.log('Saving progress...');
    setLocation("/dashboard");
  };

  const dbEngines = [
    'PostgreSQL',
    'MySQL', 
    'SQL Server',
    'Oracle',
    'SQLite',
    'MariaDB'
  ];

  return (
    <motion.section 
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 text-slate-800 overflow-hidden"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20px 20px, rgba(59, 130, 246, 0.03) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="max-w-6xl mx-auto px-8 py-20 relative z-10">
        {/* Professional Header with Microsoft style */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="flex items-start justify-between mb-8">
            <div className="flex items-center gap-4">
              <motion.div
                className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg"
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3, duration: 0.6, type: "spring", stiffness: 200 }}
              >
                <svg width="24" height="24" viewBox="0 0 100 100" className="text-white">
                  <ellipse cx="50" cy="50" rx="28" ry="10" 
                    fill="none" stroke="currentColor" strokeWidth="4" 
                    transform="rotate(0 50 50)" opacity="0.9" />
                  <ellipse cx="50" cy="50" rx="28" ry="10" 
                    fill="none" stroke="currentColor" strokeWidth="4" 
                    transform="rotate(60 50 50)" opacity="0.9" />
                  <ellipse cx="50" cy="50" rx="28" ry="10" 
                    fill="none" stroke="currentColor" strokeWidth="4" 
                    transform="rotate(120 50 50)" opacity="0.9" />
                  <circle cx="50" cy="50" r="3" fill="currentColor" />
                </svg>
              </motion.div>

              <div>
                <h1 className="text-3xl font-semibold text-slate-900 mb-2" style={{ 
                  fontFamily: '"Segoe UI", "Inter", system-ui, sans-serif',
                  letterSpacing: '-0.3px'
                }}>
                  Set up your data connection
                </h1>
                <p className="text-slate-600 text-base leading-relaxed max-w-2xl" style={{ 
                  fontFamily: '"Segoe UI", "Inter", system-ui, sans-serif'
                }}>
                  Configure VORTA to work with your existing data sources and business processes.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Section 1: Database Access - Microsoft Copilot Style */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200/60">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                <Plug className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-slate-900 mb-2" style={{ 
                  fontFamily: '"Segoe UI", "Inter", system-ui, sans-serif'
                }}>
                  Database connection
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Connect to a secure copy of your database. We never access your live production environment.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Database Engine */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  Database type
                </label>
                <select
                  value={dbConfig.engine}
                  onChange={(e) => setDbConfig(prev => ({ ...prev, engine: e.target.value }))}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  style={{ fontFamily: '"Segoe UI", "Inter", system-ui, sans-serif' }}
                >
                  <option value="">Select your database type</option>
                  {dbEngines.map(engine => (
                    <option key={engine} value={engine}>{engine}</option>
                  ))}
                </select>
              </div>

              {/* Host/IP */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  Host
                </label>
                <input
                  type="text"
                  value={dbConfig.host}
                  onChange={(e) => setDbConfig(prev => ({ ...prev, host: e.target.value }))}
                  placeholder="localhost"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  style={{ fontFamily: '"Segoe UI", "Inter", system-ui, sans-serif' }}
                />
              </div>

              {/* Port */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  Port
                </label>
                <input
                  type="text"
                  value={dbConfig.port}
                  onChange={(e) => setDbConfig(prev => ({ ...prev, port: e.target.value }))}
                  placeholder="5432"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  style={{ fontFamily: '"Segoe UI", "Inter", system-ui, sans-serif' }}
                />
              </div>

              {/* Database Name */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  Database name
                </label>
                <input
                  type="text"
                  value={dbConfig.database}
                  onChange={(e) => setDbConfig(prev => ({ ...prev, database: e.target.value }))}
                  placeholder="production_db"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  style={{ fontFamily: '"Segoe UI", "Inter", system-ui, sans-serif' }}
                />
              </div>

              {/* Username */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  Username
                </label>
                <input
                  type="text"
                  value={dbConfig.username}
                  onChange={(e) => setDbConfig(prev => ({ ...prev, username: e.target.value }))}
                  placeholder="readonly_user"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  style={{ fontFamily: '"Segoe UI", "Inter", system-ui, sans-serif' }}
                />
              </div>

              {/* Password */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={dbConfig.password}
                    onChange={(e) => setDbConfig(prev => ({ ...prev, password: e.target.value }))}
                    placeholder="Enter secure password"
                    className="w-full px-4 py-3 pr-12 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    style={{ fontFamily: '"Segoe UI", "Inter", system-ui, sans-serif' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-700 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Info callout */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900 mb-1">
                    Secure connection recommended
                  </p>
                  <p className="text-sm text-slate-600">
                    For security, connect to a read-only database replica rather than your production database.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Section 2: Sales Questions - Microsoft Style */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200/60">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                <HelpCircle className="w-5 h-5 text-emerald-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-slate-900 mb-2" style={{ 
                  fontFamily: '"Segoe UI", "Inter", system-ui, sans-serif'
                }}>
                  Common business questions
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed">
                  What questions do you frequently ask about your business? This helps VORTA understand your priorities.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {salesQuestions.map((question, index) => (
                <motion.div
                  key={question.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="flex gap-3"
                >
                  <div className="flex-1">
                    <textarea
                      value={question.text}
                      onChange={(e) => handleQuestionChange(question.id, e.target.value)}
                      placeholder={`Question ${index + 1}...`}
                      rows={2}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                      style={{ fontFamily: '"Segoe UI", "Inter", system-ui, sans-serif' }}
                    />
                  </div>
                  {salesQuestions.length > 1 && (
                    <button
                      onClick={() => handleRemoveQuestion(question.id)}
                      className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </motion.div>
              ))}
            </div>

            <button
              onClick={handleAddQuestion}
              className="mt-4 flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all"
              style={{ fontFamily: '"Segoe UI", "Inter", system-ui, sans-serif' }}
            >
              <Plus className="w-4 h-4" />
              Add question
            </button>
          </div>
        </motion.div>

        {/* Section 3: Schema & Business Logic - Microsoft Style */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200/60">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                <Brain className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-xl font-semibold text-slate-900" style={{ 
                    fontFamily: '"Segoe UI", "Inter", system-ui, sans-serif'
                  }}>
                    Business context
                  </h2>
                  <span className="px-2 py-1 text-xs bg-slate-100 text-slate-600 rounded-full font-medium">Optional</span>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Help VORTA understand your data structure and business rules for more accurate insights.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {/* Table Descriptions */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  Table descriptions
                </label>
                <textarea
                  value={schemaConfig.tableDescriptions}
                  onChange={(e) => setSchemaConfig(prev => ({ ...prev, tableDescriptions: e.target.value }))}
                  placeholder="Describe your main tables, e.g., 'sales' table contains transaction records, 'customers' table has client information..."
                  rows={4}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  style={{ fontFamily: '"Segoe UI", "Inter", system-ui, sans-serif' }}
                />
              </div>

              {/* Key Column Definitions */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  Key column definitions
                </label>
                <textarea
                  value={schemaConfig.keyColumns}
                  onChange={(e) => setSchemaConfig(prev => ({ ...prev, keyColumns: e.target.value }))}
                  placeholder="Define important columns, e.g., 'customer_id' links to customers table, 'status' field: 1=active, 0=inactive..."
                  rows={4}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  style={{ fontFamily: '"Segoe UI", "Inter", system-ui, sans-serif' }}
                />
              </div>

              {/* KPI Formulas */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  KPI formulas and filters
                </label>
                <textarea
                  value={schemaConfig.kpiFormulas}
                  onChange={(e) => setSchemaConfig(prev => ({ ...prev, kpiFormulas: e.target.value }))}
                  placeholder="E.g., Active sales = SUM(amount) WHERE status = 'completed', Monthly revenue = SUM(sales.amount) GROUP BY MONTH..."
                  rows={4}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  style={{ fontFamily: '"Segoe UI", "Inter", system-ui, sans-serif' }}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
        >
          <button
            onClick={handleSaveForLater}
            className="flex items-center gap-2 text-blue-300/70 hover:text-white transition-all duration-200 font-medium opacity-60 hover:opacity-100 order-2 md:order-1"
            style={{ 
              fontFamily: '"Inter", "Segoe UI", system-ui, sans-serif'
            }}
          >
            <Save className="w-4 h-4" />
            Save & Finish Later
          </button>
          
          <motion.button
            onClick={handleContinueToDashboard}
            className="flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 border border-blue-500/50 order-1 md:order-2 w-full md:w-auto"
            style={{ 
              fontFamily: '"Inter", "Segoe UI", system-ui, sans-serif'
            }}
            whileHover={{ 
              x: 3,
              boxShadow: "0 0 25px rgba(59, 130, 246, 0.25)",
              transition: { duration: 0.2 }
            }}
          >
            <span>Continue to Dashboard</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
}