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
      className="min-h-screen bg-gradient-to-br from-[#0f0f23] via-[#1a1a2e] to-[#16213e] text-white overflow-hidden"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, rgba(255,255,255,0.08) 2px, transparent 0)`,
          backgroundSize: '50px 50px',
          animation: 'grain 8s steps(10) infinite'
        }} />
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16 relative z-10">
        {/* Header */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {/* VORTA Logo */}
          <div className="flex items-center gap-4 mb-6">
            <motion.svg 
              width="32" 
              height="32" 
              viewBox="0 0 100 100" 
              className="text-blue-400"
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, duration: 0.6, type: "spring", stiffness: 200 }}
            >
              <defs>
                <radialGradient id="atomGradientFinal" cx="30%" cy="30%" r="70%">
                  <stop offset="0%" style={{ stopColor: '#60a5fa', stopOpacity: 1 }} />
                  <stop offset="60%" style={{ stopColor: '#3b82f6', stopOpacity: 0.8 }} />
                  <stop offset="100%" style={{ stopColor: '#1e40af', stopOpacity: 0.6 }} />
                </radialGradient>
              </defs>
              
              <ellipse cx="50" cy="50" rx="32" ry="12" 
                fill="none" stroke="url(#atomGradientFinal)" strokeWidth="3" 
                transform="rotate(0 50 50)" opacity="0.9" />
              <ellipse cx="50" cy="50" rx="32" ry="12" 
                fill="none" stroke="url(#atomGradientFinal)" strokeWidth="3" 
                transform="rotate(60 50 50)" opacity="0.9" />
              <ellipse cx="50" cy="50" rx="32" ry="12" 
                fill="none" stroke="url(#atomGradientFinal)" strokeWidth="3" 
                transform="rotate(120 50 50)" opacity="0.9" />
              
              <circle cx="50" cy="50" r="4" fill="url(#atomGradientFinal)" opacity="1" />
            </motion.svg>

            <div>
              <h1 className="text-3xl font-bold text-white" style={{ 
                fontFamily: '"Inter", "Segoe UI", system-ui, sans-serif',
                letterSpacing: '-0.5px'
              }}>
                Let's finalize your setup
              </h1>
            </div>
          </div>
          
          <p className="text-blue-200/70 text-lg leading-relaxed" style={{ 
            fontFamily: '"Inter", "Segoe UI", system-ui, sans-serif'
          }}>
            To connect VORTA to your data, we need a few details from you or your IT team.
          </p>
        </motion.div>

        {/* Section 1: Database Access */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="bg-gradient-to-br from-[#1c2340]/80 to-[#2a3b5c]/80 rounded-2xl p-8 border border-blue-500/20 backdrop-blur-md">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-500/15 rounded-lg">
                <Plug className="w-6 h-6 text-blue-400" />
              </div>
              <h2 className="text-xl font-semibold text-white">1. Access to Your Database</h2>
            </div>
            
            <p className="text-blue-200/60 mb-6">
              We connect to a <strong>copy</strong> of your database, never your live production DB.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Database Engine */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-blue-200 mb-2">
                  Database Engine
                </label>
                <select
                  value={dbConfig.engine}
                  onChange={(e) => setDbConfig(prev => ({ ...prev, engine: e.target.value }))}
                  className="w-full px-4 py-3 bg-blue-900/20 border border-blue-500/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                >
                  <option value="">Select your database engine</option>
                  {dbEngines.map(engine => (
                    <option key={engine} value={engine} className="bg-blue-900">{engine}</option>
                  ))}
                </select>
              </div>

              {/* Host/IP */}
              <div>
                <label className="block text-sm font-medium text-blue-200 mb-2">
                  Host / IP
                </label>
                <input
                  type="text"
                  value={dbConfig.host}
                  onChange={(e) => setDbConfig(prev => ({ ...prev, host: e.target.value }))}
                  placeholder="localhost or 192.168.1.100"
                  className="w-full px-4 py-3 bg-blue-900/20 border border-blue-500/30 rounded-xl text-white placeholder-blue-300/60 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                />
              </div>

              {/* Port */}
              <div>
                <label className="block text-sm font-medium text-blue-200 mb-2">
                  Port
                </label>
                <input
                  type="text"
                  value={dbConfig.port}
                  onChange={(e) => setDbConfig(prev => ({ ...prev, port: e.target.value }))}
                  placeholder="5432, 3306, 1433..."
                  className="w-full px-4 py-3 bg-blue-900/20 border border-blue-500/30 rounded-xl text-white placeholder-blue-300/60 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                />
              </div>

              {/* Database Name */}
              <div>
                <label className="block text-sm font-medium text-blue-200 mb-2">
                  Database Name
                </label>
                <input
                  type="text"
                  value={dbConfig.database}
                  onChange={(e) => setDbConfig(prev => ({ ...prev, database: e.target.value }))}
                  placeholder="my_company_db"
                  className="w-full px-4 py-3 bg-blue-900/20 border border-blue-500/30 rounded-xl text-white placeholder-blue-300/60 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                />
              </div>

              {/* Username */}
              <div>
                <label className="block text-sm font-medium text-blue-200 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  value={dbConfig.username}
                  onChange={(e) => setDbConfig(prev => ({ ...prev, username: e.target.value }))}
                  placeholder="db_user"
                  className="w-full px-4 py-3 bg-blue-900/20 border border-blue-500/30 rounded-xl text-white placeholder-blue-300/60 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                />
              </div>

              {/* Password */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-blue-200 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={dbConfig.password}
                    onChange={(e) => setDbConfig(prev => ({ ...prev, password: e.target.value }))}
                    placeholder="Enter database password"
                    className="w-full px-4 py-3 pr-12 bg-blue-900/20 border border-blue-500/30 rounded-xl text-white placeholder-blue-300/60 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-300 hover:text-blue-200 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Public Access Toggle */}
            <div className="mt-6 p-4 bg-blue-900/20 rounded-xl border border-blue-500/20">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="publicAccess"
                  checked={!isPublicAccess}
                  onChange={(e) => setIsPublicAccess(!e.target.checked)}
                  className="mt-1 w-4 h-4 text-blue-600 bg-blue-900/20 border-blue-500/30 rounded focus:ring-blue-500"
                />
                <div>
                  <label htmlFor="publicAccess" className="text-sm font-medium text-blue-200 cursor-pointer">
                    Database is not publicly accessible
                  </label>
                  <p className="text-xs text-blue-300/70 mt-1">
                    We'll guide your IT team to mirror and expose a secure version.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Section 2: Sales Questions */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="bg-gradient-to-br from-[#1c2340]/80 to-[#2a3b5c]/80 rounded-2xl p-8 border border-blue-500/20 backdrop-blur-md">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-500/15 rounded-lg">
                <HelpCircle className="w-6 h-6 text-blue-400" />
              </div>
              <h2 className="text-xl font-semibold text-white">2. Your Sales Questions</h2>
            </div>
            
            <p className="text-blue-200/60 mb-6">
              What do you ask your sales team every day?
            </p>

            <div className="space-y-4">
              {salesQuestions.map((question, index) => (
                <motion.div
                  key={question.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="flex gap-3"
                >
                  <textarea
                    value={question.text}
                    onChange={(e) => handleQuestionChange(question.id, e.target.value)}
                    placeholder={`Question ${index + 1}...`}
                    rows={2}
                    className="flex-1 px-4 py-3 bg-blue-900/20 border border-blue-500/30 rounded-xl text-white placeholder-blue-300/60 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all resize-none"
                  />
                  {salesQuestions.length > 1 && (
                    <button
                      onClick={() => handleRemoveQuestion(question.id)}
                      className="p-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-all"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </motion.div>
              ))}
            </div>

            <button
              onClick={handleAddQuestion}
              className="mt-4 flex items-center gap-2 px-4 py-2 text-blue-300 hover:text-blue-200 hover:bg-blue-500/10 rounded-xl transition-all"
            >
              <Plus className="w-4 h-4" />
              Add another question
            </button>
          </div>
        </motion.div>

        {/* Section 3: Schema & Business Logic */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="bg-gradient-to-br from-[#1c2340]/80 to-[#2a3b5c]/80 rounded-2xl p-8 border border-blue-500/20 backdrop-blur-md">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-500/15 rounded-lg">
                <Brain className="w-6 h-6 text-blue-400" />
              </div>
              <h2 className="text-xl font-semibold text-white">3. Schema & Business Logic</h2>
              <span className="px-2 py-1 text-xs bg-blue-500/20 text-blue-300 rounded-full">Optional</span>
            </div>
            
            <p className="text-blue-200/60 mb-6">
              Define your internal structure to help VORTA understand your KPIs.
            </p>

            <div className="space-y-6">
              {/* Table Descriptions */}
              <div>
                <label className="block text-sm font-medium text-blue-200 mb-2">
                  Table Descriptions
                </label>
                <textarea
                  value={schemaConfig.tableDescriptions}
                  onChange={(e) => setSchemaConfig(prev => ({ ...prev, tableDescriptions: e.target.value }))}
                  placeholder="Describe your main tables, e.g., 'sales' table contains all transaction records, 'customers' table has client information..."
                  rows={4}
                  className="w-full px-4 py-3 bg-blue-900/20 border border-blue-500/30 rounded-xl text-white placeholder-blue-300/60 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all resize-none"
                />
              </div>

              {/* Key Column Definitions */}
              <div>
                <label className="block text-sm font-medium text-blue-200 mb-2">
                  Key Column Definitions
                </label>
                <textarea
                  value={schemaConfig.keyColumns}
                  onChange={(e) => setSchemaConfig(prev => ({ ...prev, keyColumns: e.target.value }))}
                  placeholder="Define important columns, e.g., 'customer_id' links to customers table, 'status' field: 1=active, 0=inactive..."
                  rows={4}
                  className="w-full px-4 py-3 bg-blue-900/20 border border-blue-500/30 rounded-xl text-white placeholder-blue-300/60 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all resize-none"
                />
              </div>

              {/* KPI Formulas */}
              <div>
                <label className="block text-sm font-medium text-blue-200 mb-2">
                  Formulas or Filters for KPIs
                </label>
                <textarea
                  value={schemaConfig.kpiFormulas}
                  onChange={(e) => setSchemaConfig(prev => ({ ...prev, kpiFormulas: e.target.value }))}
                  placeholder="E.g., Table 'ventas' with filter `estatus = 1` for active sales, Revenue = SUM(amount) WHERE status = 'completed'..."
                  rows={4}
                  className="w-full px-4 py-3 bg-blue-900/20 border border-blue-500/30 rounded-xl text-white placeholder-blue-300/60 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all resize-none"
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