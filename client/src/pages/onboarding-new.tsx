import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Database, 
  FileSpreadsheet, 
  Globe, 
  FileText, 
  Grid3X3, 
  Check,
  ArrowRight,
  Upload,
  Key,
  Link,
  ChevronDown,
  ChevronUp
} from "lucide-react";

interface DataSource {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  inputType: 'url' | 'key' | 'file';
  placeholder: string;
}

const dataSources: DataSource[] = [
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    icon: Database,
    inputType: 'url',
    placeholder: 'postgresql://user:password@host:port/database'
  },
  {
    id: 'mysql',
    name: 'MySQL',
    icon: Database,
    inputType: 'url',
    placeholder: 'mysql://user:password@host:port/database'
  },
  {
    id: 'sheets',
    name: 'Google Sheets',
    icon: FileSpreadsheet,
    inputType: 'key',
    placeholder: 'Enter your Google Sheets API key'
  },
  {
    id: 'api',
    name: 'Custom API',
    icon: Globe,
    inputType: 'url',
    placeholder: 'https://api.yourcompany.com/endpoint'
  },
  {
    id: 'csv',
    name: 'Excel / CSV',
    icon: FileText,
    inputType: 'file',
    placeholder: 'Upload your Excel or CSV files'
  },
  {
    id: 'airtable',
    name: 'Airtable',
    icon: Grid3X3,
    inputType: 'key',
    placeholder: 'Enter your Airtable API key'
  }
];

export default function OnboardingNew() {
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const [connectedSources, setConnectedSources] = useState<Set<string>>(new Set());
  const [inputValues, setInputValues] = useState<Record<string, string>>({});
  const [, setLocation] = useLocation();

  const handleSourceClick = (sourceId: string) => {
    // Enterprise UX: only allow one card open at a time
    setSelectedSource(selectedSource === sourceId ? null : sourceId);
  };

  const handleConnect = (sourceId: string) => {
    const value = inputValues[sourceId];
    if (value && value.trim()) {
      setConnectedSources(prev => new Set([...Array.from(prev), sourceId]));
      setSelectedSource(null);
      // Mock connection success
      console.log(`Connected to ${sourceId} with:`, value);
    }
  };

  const handleInputChange = (sourceId: string, value: string) => {
    setInputValues(prev => ({ ...prev, [sourceId]: value }));
  };

  const handleSkip = () => {
    setLocation("/dashboard");
  };

  const handleContinue = () => {
    setLocation("/dashboard");
  };

  const renderInputField = (source: DataSource) => {
    const Icon = source.inputType === 'url' ? Link : source.inputType === 'key' ? Key : Upload;
    
    if (source.inputType === 'file') {
      return (
        <div className="space-y-3">
          <div className="flex items-center bg-white/5 border border-white/10 px-4 py-3 rounded-xl backdrop-blur-sm">
            <Upload className="w-4 h-4 text-blue-400 mr-3" />
            <input
              type="file"
              accept=".csv,.xlsx,.xls"
              className="bg-transparent text-sm text-gray-100 w-full file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-500/20 file:text-blue-300 hover:file:bg-blue-500/30"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  handleInputChange(source.id, file.name);
                }
              }}
            />
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-3">
        <div className="flex items-center bg-white/5 border border-white/10 px-4 py-3 rounded-xl backdrop-blur-sm focus-within:ring-2 focus-within:ring-blue-400/50 focus-within:border-blue-400/50 transition-all duration-300">
          <Icon className="w-4 h-4 text-blue-400 mr-3" />
          <input
            type={source.inputType === 'key' ? 'password' : 'text'}
            placeholder={source.placeholder}
            className="bg-transparent w-full text-sm text-gray-100 placeholder:text-gray-400 focus:outline-none"
            value={inputValues[source.id] || ''}
            onChange={(e) => handleInputChange(source.id, e.target.value)}
          />
        </div>
      </div>
    );
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-[#0f0f23] via-[#1a1a2e] to-[#16213e] text-white relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Subtle animated background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, rgba(255,255,255,0.15) 2px, transparent 0)`,
          backgroundSize: '50px 50px',
          animation: 'grain 8s steps(10) infinite'
        }} />
      </div>

      <div className="max-w-5xl mx-auto px-4 py-16 relative z-10">
        {/* Enterprise Header - Left Aligned */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <div className="flex items-center gap-4 mb-6">
            {/* VORTA Atom Logo - Smaller, enterprise style */}
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
                <radialGradient id="atomBlueEnterprise" cx="30%" cy="30%" r="70%">
                  <stop offset="0%" style={{ stopColor: '#60a5fa', stopOpacity: 1 }} />
                  <stop offset="60%" style={{ stopColor: '#3b82f6', stopOpacity: 0.8 }} />
                  <stop offset="100%" style={{ stopColor: '#1e40af', stopOpacity: 0.3 }} />
                </radialGradient>
              </defs>
              
              {/* Orbital rings */}
              <ellipse cx="50" cy="50" rx="35" ry="15" 
                fill="none" stroke="url(#atomBlueEnterprise)" strokeWidth="4" 
                transform="rotate(0 50 50)" opacity="0.8" />
              <ellipse cx="50" cy="50" rx="35" ry="15" 
                fill="none" stroke="url(#atomBlueEnterprise)" strokeWidth="4" 
                transform="rotate(60 50 50)" opacity="0.8" />
              <ellipse cx="50" cy="50" rx="35" ry="15" 
                fill="none" stroke="url(#atomBlueEnterprise)" strokeWidth="4" 
                transform="rotate(120 50 50)" opacity="0.8" />
              
              {/* Central nucleus */}
              <circle cx="50" cy="50" r="4" fill="url(#atomBlueEnterprise)" opacity="0.9" />
              <circle cx="50" cy="50" r="2" fill="#60a5fa" opacity="1" />
            </motion.svg>

            <motion.h1 
              className="text-3xl md:text-5xl font-semibold tracking-tight text-white"
              style={{ 
                fontFamily: '"Inter", "Segoe UI", system-ui, sans-serif'
              }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Let's connect VORTA to your system
            </motion.h1>
          </div>
          
          <motion.p 
            className="text-md md:text-lg text-gray-400 max-w-lg"
            style={{ 
              fontFamily: '"Inter", "Segoe UI", system-ui, sans-serif'
            }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Choose how you'd like to connect your business data. You can skip this step and do it later.
          </motion.p>
        </motion.div>

        {/* Enterprise Data Sources Grid */}
        <motion.div 
          className="grid grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          {dataSources.map((source, index) => {
            const Icon = source.icon;
            const isSelected = selectedSource === source.id;
            const isConnected = connectedSources.has(source.id);
            
            return (
              <motion.div
                key={source.id}
                className={`relative bg-gradient-to-br from-[#192646] to-[#0f172a] rounded-2xl p-6 border border-gray-700/50 transition-all duration-300 cursor-pointer group ${
                  isSelected 
                    ? 'ring-2 ring-blue-400 shadow-xl shadow-blue-500/20' 
                    : 'hover:border-gray-600/50 hover:shadow-lg hover:shadow-blue-500/20'
                } ${isConnected ? 'ring-2 ring-green-400/70 border-green-400/30' : ''}`}
                onClick={() => !isConnected && handleSourceClick(source.id)}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  delay: 0.7 + index * 0.1, 
                  duration: 0.6,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  scale: isConnected ? 1 : 1.02,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: isConnected ? 1 : 0.98 }}
              >
                {/* Connected Badge */}
                {isConnected && (
                  <motion.div 
                    className="absolute -top-3 -right-3 bg-green-500 rounded-full p-2 shadow-lg"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", delay: 0.3, stiffness: 200 }}
                  >
                    <Check className="w-4 h-4 text-white" />
                  </motion.div>
                )}

                {/* Enterprise Card Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className={`p-4 rounded-xl transition-all duration-300 ${
                      isSelected || isConnected
                        ? 'bg-blue-600 text-white shadow-lg' 
                        : 'bg-gray-800/50 text-blue-400 group-hover:bg-gray-700/50'
                    }`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1" style={{ 
                        fontFamily: '"Inter", "Segoe UI", system-ui, sans-serif'
                      }}>
                        {source.name}
                      </h3>
                      {isConnected ? (
                        <span className="text-green-400 text-sm font-medium">
                          Connected
                        </span>
                      ) : (
                        <span className="text-gray-500 text-sm">
                          Not connected
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {!isConnected && (
                    <div className="text-gray-500">
                      {isSelected ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  )}
                </div>

                {/* Expanded Enterprise Form */}
                <AnimatePresence>
                  {isSelected && !isConnected && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: "auto", marginTop: 16 }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      transition={{ duration: 0.4, type: "spring", stiffness: 100 }}
                      className="border-t border-gray-700/50 pt-6"
                    >
                      {renderInputField(source)}
                      
                      <div className="flex justify-end space-x-3 mt-6">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedSource(null);
                          }}
                          className="px-4 py-2 text-gray-400 hover:text-white transition-all duration-200 font-medium"
                          style={{ 
                            fontFamily: '"Inter", "Segoe UI", system-ui, sans-serif'
                          }}
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
                              ? 'bg-[#1e40af] hover:bg-[#1d4ed8] text-white'
                              : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                          }`}
                          style={{ 
                            fontFamily: '"Inter", "Segoe UI", system-ui, sans-serif'
                          }}
                        >
                          Connect
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Enterprise Action Section */}
        <motion.div 
          className="border-t border-gray-700 pt-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <div className="flex justify-between items-center">
            <button
              onClick={handleSkip}
              className="text-gray-400 hover:text-white transition-all duration-200 font-medium"
              style={{ 
                fontFamily: '"Inter", "Segoe UI", system-ui, sans-serif'
              }}
            >
              Skip for now
            </button>
            
            <button
              onClick={handleContinue}
              className="flex items-center space-x-3 px-6 py-3 bg-[#1e40af] hover:bg-[#1d4ed8] text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              style={{ 
                fontFamily: '"Inter", "Segoe UI", system-ui, sans-serif'
              }}
            >
              <span>Connect & Continue</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}