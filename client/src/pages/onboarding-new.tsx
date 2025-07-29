import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Database, 
  FileSpreadsheet, 
  Globe2, 
  FileText, 
  Grid3X3, 
  Check,
  ArrowRight,
  Upload,
  Key,
  Link2,
  Circle
} from "lucide-react";

interface DataSource {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  type: 'url' | 'key' | 'file';
  placeholder: string;
}

const dataSources: DataSource[] = [
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    icon: Database,
    type: 'url',
    placeholder: 'postgresql://username:password@host:port/database'
  },
  {
    id: 'mysql',
    name: 'MySQL',
    icon: Database,
    type: 'url',
    placeholder: 'mysql://username:password@host:port/database'
  },
  {
    id: 'sheets',
    name: 'Google Sheets',
    icon: FileSpreadsheet,
    type: 'url',
    placeholder: 'https://docs.google.com/spreadsheets/d/...'
  },
  {
    id: 'airtable',
    name: 'Airtable',
    icon: Grid3X3,
    type: 'key',
    placeholder: 'apikey:your-airtable-api-key'
  },
  {
    id: 'excel',
    name: 'Excel/CSV',
    icon: FileText,
    type: 'file',
    placeholder: 'Upload your file'
  },
  {
    id: 'api',
    name: 'REST API',
    icon: Globe2,
    type: 'key',
    placeholder: 'apikey:your-rest-api-key'
  }
];

export default function OnboardingNew() {
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const [connectedSources, setConnectedSources] = useState<Set<string>>(new Set());
  const [inputValues, setInputValues] = useState<Record<string, string>>({});
  const [, setLocation] = useLocation();

  const handleSourceClick = (sourceId: string) => {
    setSelectedSource(selectedSource === sourceId ? null : sourceId);
  };

  const handleConnect = (sourceId: string) => {
    const value = inputValues[sourceId];
    if (value && value.trim()) {
      setConnectedSources(prev => new Set([...Array.from(prev), sourceId]));
      setSelectedSource(null);
      console.log(`Connected to ${sourceId} with:`, value);
    }
  };

  const handleSkip = () => {
    setLocation('/dashboard');
  };

  const handleContinue = () => {
    if (connectedSources.size === 0) {
      // Show micro toast
      alert("You'll be able to connect sources later from your dashboard.");
    }
    setLocation('/dashboard');
  };

  const renderInputField = (source: DataSource) => {
    const value = inputValues[source.id] || '';
    
    if (source.type === 'file') {
      return (
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-300">
            Upload File
          </label>
          <div className="relative">
            <input
              type="file"
              accept=".csv,.xlsx,.xls"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setInputValues(prev => ({ ...prev, [source.id]: file.name }));
                }
              }}
            />
            <div className="flex items-center gap-3 p-4 border border-gray-600 rounded-xl bg-gray-800/30 backdrop-blur-sm hover:border-gray-500 transition-colors">
              <Upload className="w-5 h-5 text-gray-400" />
              <span className="text-gray-300">
                {value || 'Choose file to upload'}
              </span>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-300">
          {source.type === 'url' ? 'Connection URL' : 'API Key'}
        </label>
        <div className="relative">
          {source.type === 'key' && (
            <Key className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          )}
          {source.type === 'url' && (
            <Link2 className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          )}
          <input
            type={source.type === 'key' ? 'password' : 'text'}
            value={value}
            onChange={(e) => setInputValues(prev => ({ ...prev, [source.id]: e.target.value }))}
            placeholder={source.placeholder}
            className={`w-full ${source.type !== 'url' ? 'pl-12' : 'pl-12'} pr-4 py-4 bg-gray-800/30 backdrop-blur-sm border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
          />
        </div>
      </div>
    );
  };

  return (
    <motion.section 
      className="min-h-screen bg-gradient-to-br from-[#0f0f23] via-[#1a1a2e] to-[#16213e] text-white overflow-hidden"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, rgba(255,255,255,0.1) 2px, transparent 0)`,
          backgroundSize: '50px 50px',
          animation: 'grain 8s steps(10) infinite'
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-24 relative z-10">
        {/* Enterprise Header - Top Left */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div className="flex items-center gap-4 mb-6">
            {/* VORTA Atom Logo */}
            <motion.svg 
              width="28" 
              height="28" 
              viewBox="0 0 100 100" 
              className="text-cyan-400"
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.4, duration: 0.6, type: "spring", stiffness: 200 }}
            >
              <defs>
                <radialGradient id="atomGradient" cx="30%" cy="30%" r="70%">
                  <stop offset="0%" style={{ stopColor: '#67e8f9', stopOpacity: 1 }} />
                  <stop offset="60%" style={{ stopColor: '#06b6d4', stopOpacity: 0.8 }} />
                  <stop offset="100%" style={{ stopColor: '#0891b2', stopOpacity: 0.6 }} />
                </radialGradient>
              </defs>
              
              {/* Orbital rings */}
              <ellipse cx="50" cy="50" rx="32" ry="12" 
                fill="none" stroke="url(#atomGradient)" strokeWidth="3" 
                transform="rotate(0 50 50)" opacity="0.9" />
              <ellipse cx="50" cy="50" rx="32" ry="12" 
                fill="none" stroke="url(#atomGradient)" strokeWidth="3" 
                transform="rotate(60 50 50)" opacity="0.9" />
              <ellipse cx="50" cy="50" rx="32" ry="12" 
                fill="none" stroke="url(#atomGradient)" strokeWidth="3" 
                transform="rotate(120 50 50)" opacity="0.9" />
              
              {/* Central nucleus */}
              <circle cx="50" cy="50" r="4" fill="url(#atomGradient)" opacity="1" />
            </motion.svg>

            <div>
              <motion.h1 
                className="text-3xl font-semibold text-white tracking-tight"
                style={{ 
                  fontFamily: '"Inter", "Segoe UI", system-ui, sans-serif',
                  letterSpacing: '-0.01em'
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                Let's get you set up
              </motion.h1>
            </div>
          </div>
          
          <motion.p 
            className="text-lg text-gray-400 max-w-2xl leading-relaxed"
            style={{ 
              fontFamily: '"Inter", "Segoe UI", system-ui, sans-serif'
            }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Choose how to connect your business data below. You can skip and configure this later.
          </motion.p>
        </motion.div>

        {/* Enterprise Glass Tiles Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          {dataSources.map((source, index) => {
            const Icon = source.icon;
            const isSelected = selectedSource === source.id;
            const isConnected = connectedSources.has(source.id);
            
            return (
              <motion.div
                key={source.id}
                className={`relative group cursor-pointer`}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  delay: 0.8 + index * 0.1, 
                  duration: 0.6,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  scale: isConnected ? 1 : 1.02,
                  transition: { duration: 0.2 }
                }}
                onClick={() => !isConnected && handleSourceClick(source.id)}
              >
                {/* Glass Tile */}
                <div className={`relative p-6 rounded-2xl backdrop-blur-md transition-all duration-300 ${
                  isConnected 
                    ? 'bg-green-500/10 border border-green-400/30 shadow-lg shadow-green-500/10' 
                    : isSelected
                    ? 'bg-blue-500/10 border border-blue-400/40 shadow-xl shadow-blue-500/20'
                    : 'bg-white/5 border border-gray-700/50 hover:bg-white/10 hover:border-gray-600/50 hover:shadow-lg hover:shadow-cyan-500/10'
                }`}>
                  
                  {/* Connected Indicator */}
                  {isConnected && (
                    <motion.div 
                      className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1.5 shadow-lg"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", delay: 0.2, stiffness: 200 }}
                    >
                      <Check className="w-3 h-3 text-white" />
                    </motion.div>
                  )}

                  {/* Icon and Title */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-3 rounded-xl transition-all duration-300 ${
                      isConnected
                        ? 'bg-green-500/20 text-green-400' 
                        : isSelected
                        ? 'bg-blue-500/20 text-blue-400'
                        : 'bg-gray-800/40 text-gray-400 group-hover:bg-gray-700/40 group-hover:text-cyan-400'
                    }`}>
                      <Icon className="w-6 h-6" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white mb-1" style={{ 
                        fontFamily: '"Inter", "Segoe UI", system-ui, sans-serif'
                      }}>
                        {source.name}
                      </h3>
                      {/* Status Pill */}
                      <div className="flex items-center gap-2">
                        <Circle className={`w-2 h-2 ${isConnected ? 'text-green-400 fill-green-400' : 'text-gray-500 fill-gray-500'}`} />
                        <span className={`text-xs font-medium ${isConnected ? 'text-green-400' : 'text-gray-500'}`}>
                          {isConnected ? 'Connected' : 'Not connected'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Hover Connect Button */}
                  {!isConnected && !isSelected && (
                    <motion.div 
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    >
                      <button className="w-full py-2 px-4 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg text-sm font-medium text-gray-300 hover:text-white transition-all duration-200">
                        Connect
                      </button>
                    </motion.div>
                  )}

                  {/* Expanded Form */}
                  <AnimatePresence>
                    {isSelected && !isConnected && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: "auto", marginTop: 16 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        transition={{ duration: 0.4, type: "spring", stiffness: 100 }}
                        className="border-t border-gray-700/30 pt-4"
                      >
                        {renderInputField(source)}
                        
                        <div className="flex justify-end space-x-3 mt-4">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedSource(null);
                            }}
                            className="px-4 py-2 text-gray-400 hover:text-white transition-all duration-200 font-medium"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleConnect(source.id);
                            }}
                            disabled={!inputValues[source.id]?.trim()}
                            className={`px-6 py-2 rounded-xl font-medium transition-all duration-200 shadow-lg ${
                              inputValues[source.id]?.trim()
                                ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:shadow-xl hover:shadow-blue-500/20'
                                : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                            }`}
                          >
                            Connect
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTAs */}
        <motion.div 
          className="flex justify-between items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          <button
            onClick={handleSkip}
            className="text-gray-400 hover:text-white transition-all duration-200 font-medium opacity-70 hover:opacity-100"
            style={{ 
              fontFamily: '"Inter", "Segoe UI", system-ui, sans-serif'
            }}
          >
            Skip setup
          </button>
          
          <button
            onClick={handleContinue}
            className="flex items-center space-x-3 px-8 py-3 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white font-medium rounded-xl shadow-lg hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-200 border border-gray-700/50"
            style={{ 
              fontFamily: '"Inter", "Segoe UI", system-ui, sans-serif'
            }}
          >
            <span>Connect & Continue</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </motion.section>
  );
}