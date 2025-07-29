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
  Link
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
      className="min-h-screen bg-gradient-to-br from-[#0f0f23] via-[#1a1a2e] to-[#16213e] p-4 text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-6xl mx-auto pt-12">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {/* VORTA Atom Logo */}
          <div className="flex justify-center mb-6">
            <motion.svg 
              width="60" 
              height="60" 
              viewBox="0 0 100 100" 
              className="text-blue-400"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
            >
              <defs>
                <radialGradient id="atomBlueOnboarding" cx="30%" cy="30%" r="70%">
                  <stop offset="0%" style={{ stopColor: '#60a5fa', stopOpacity: 1 }} />
                  <stop offset="60%" style={{ stopColor: '#3b82f6', stopOpacity: 0.8 }} />
                  <stop offset="100%" style={{ stopColor: '#1e40af', stopOpacity: 0.3 }} />
                </radialGradient>
              </defs>
              
              {/* Orbital rings */}
              <ellipse cx="50" cy="50" rx="35" ry="15" 
                fill="none" stroke="url(#atomBlueOnboarding)" strokeWidth="6" 
                transform="rotate(0 50 50)" opacity="0.8" />
              <ellipse cx="50" cy="50" rx="35" ry="15" 
                fill="none" stroke="url(#atomBlueOnboarding)" strokeWidth="6" 
                transform="rotate(60 50 50)" opacity="0.8" />
              <ellipse cx="50" cy="50" rx="35" ry="15" 
                fill="none" stroke="url(#atomBlueOnboarding)" strokeWidth="6" 
                transform="rotate(120 50 50)" opacity="0.8" />
              
              {/* Central nucleus */}
              <circle cx="50" cy="50" r="6" fill="url(#atomBlueOnboarding)" opacity="0.9" />
              <circle cx="50" cy="50" r="3" fill="#60a5fa" opacity="1" />
            </motion.svg>
          </div>

          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-100 via-blue-200 to-cyan-100 bg-clip-text text-transparent"
            style={{ 
              fontFamily: '"Inter", "Helvetica Neue", "Segoe UI", system-ui, sans-serif',
              letterSpacing: '-0.02em'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Let's connect VORTA to your system
          </motion.h1>
          
          <motion.p 
            className="text-lg text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Choose how you'd like to connect your business data. You can skip this step and do it later.
          </motion.p>
        </motion.div>

        {/* Data Sources Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
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
                className={`relative bg-gradient-to-br from-[#1c2340] to-[#2a3b5c] rounded-2xl p-6 border transition-all duration-300 cursor-pointer group ${
                  isSelected 
                    ? 'border-blue-400/60 shadow-xl shadow-blue-500/20' 
                    : 'border-blue-500/20 hover:border-blue-400/40 hover:shadow-lg hover:shadow-blue-500/10'
                } ${isConnected ? 'ring-2 ring-green-400/50' : ''}`}
                onClick={() => !isConnected && handleSourceClick(source.id)}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                whileHover={{ scale: isConnected ? 1 : 1.02 }}
                whileTap={{ scale: isConnected ? 1 : 0.98 }}
              >
                {/* Connected Badge */}
                {isConnected && (
                  <motion.div 
                    className="absolute -top-2 -right-2 bg-green-500 rounded-full p-2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                  >
                    <Check className="w-4 h-4 text-white" />
                  </motion.div>
                )}

                {/* Card Header */}
                <div className="flex items-center space-x-4 mb-4">
                  <div className={`p-3 rounded-xl transition-colors ${
                    isSelected 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-white/10 text-blue-400 group-hover:bg-white/15'
                  }`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">
                    {source.name}
                  </h3>
                </div>

                {/* Connection Status */}
                {isConnected ? (
                  <motion.div 
                    className="text-green-400 text-sm font-medium"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    ✓ Connected successfully
                  </motion.div>
                ) : (
                  <div className="text-gray-400 text-sm">
                    Click to configure connection
                  </div>
                )}

                {/* Expanded Form */}
                <AnimatePresence>
                  {isSelected && !isConnected && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 pt-4 border-t border-white/10"
                    >
                      {renderInputField(source)}
                      
                      <div className="flex justify-end space-x-3 mt-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedSource(null);
                          }}
                          className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleConnect(source.id);
                          }}
                          disabled={!inputValues[source.id]?.trim()}
                          className={`px-6 py-2 rounded-xl font-medium transition-all ${
                            inputValues[source.id]?.trim()
                              ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white hover:opacity-90'
                              : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                          }`}
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

        {/* Action Buttons */}
        <motion.div 
          className="flex justify-between items-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <button
            onClick={handleSkip}
            className="text-gray-400 hover:text-white transition-colors text-lg"
          >
            Skip for now
          </button>
          
          <button
            onClick={handleContinue}
            className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-2xl font-medium text-white hover:opacity-90 transition-all shadow-lg hover:shadow-xl text-lg"
          >
            <span>Connect & Continue</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}