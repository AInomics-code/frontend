import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Play, Save, Download, RotateCcw, TrendingUp, TrendingDown } from 'lucide-react';

export default function ScenarioSimulator() {
  const [selectedKPI, setSelectedKPI] = useState('performance-score');
  const [selectedZone, setSelectedZone] = useState('chiriqui');
  const [variables, setVariables] = useState({
    demandGrowth: 15,
    pricingChange: -5,
    inventoryAvailability: 85,
    marketingSpend: 120,
    competitorActivity: 30
  });

  const [isSimulating, setIsSimulating] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const kpiOptions = [
    { id: 'performance-score', name: 'Performance Score', unit: '/100' },
    { id: 'sales-velocity', name: 'Sales Velocity', unit: 'units/day' },
    { id: 'inventory-turnover', name: 'Inventory Turnover', unit: 'x/month' },
    { id: 'market-share', name: 'Market Share', unit: '%' }
  ];

  const zoneOptions = [
    { id: 'chiriqui', name: 'Chiriquí Central' },
    { id: 'panama', name: 'Panama City' },
    { id: 'colon', name: 'Colón' },
    { id: 'david', name: 'David' }
  ];

  const currentProjection = {
    value: 68,
    trend: -8,
    confidence: 85
  };

  const simulatedOutcome = {
    value: 78,
    trend: 15,
    confidence: 78,
    impact: 'positive',
    changePercent: 14.7
  };

  const handleSimulate = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
      setShowResults(true);
    }, 2000);
  };

  const handleSliderChange = (key: string, value: number) => {
    setVariables(prev => ({ ...prev, [key]: value }));
    setShowResults(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex">
      {/* Left Sidebar - Simplified for this page */}
      <div className="w-24 bg-slate-900/95 backdrop-blur-sm border-r border-slate-700/30 flex flex-col items-center py-8">
        <div className="w-10 h-10 bg-blue-500/30 rounded-xl flex items-center justify-center mb-8">
          <svg className="w-5 h-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px' }}>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-4xl font-semibold mb-3 bg-gradient-to-r from-slate-200 to-blue-300 bg-clip-text text-transparent">
              AI Scenario Simulator
            </h1>
            <p className="text-slate-400 text-lg">Model future outcomes with intelligent what-if analysis</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Configuration */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-8"
            >
              {/* Step 1: Select Target */}
              <div className="bg-slate-800/40 backdrop-blur-md rounded-2xl p-6 border border-slate-700/30">
                <h2 className="text-xl font-semibold text-white mb-6">Step 1: Select Target</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">KPI to Simulate</label>
                    <div className="relative">
                      <select 
                        value={selectedKPI}
                        onChange={(e) => setSelectedKPI(e.target.value)}
                        className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg p-3 text-white appearance-none cursor-pointer focus:outline-none focus:border-blue-500/50"
                      >
                        {kpiOptions.map(kpi => (
                          <option key={kpi.id} value={kpi.id}>{kpi.name}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Zone/Region</label>
                    <div className="relative">
                      <select 
                        value={selectedZone}
                        onChange={(e) => setSelectedZone(e.target.value)}
                        className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg p-3 text-white appearance-none cursor-pointer focus:outline-none focus:border-blue-500/50"
                      >
                        {zoneOptions.map(zone => (
                          <option key={zone.id} value={zone.id}>{zone.name}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2: Adjust Variables */}
              <div className="bg-slate-800/40 backdrop-blur-md rounded-2xl p-6 border border-slate-700/30">
                <h2 className="text-xl font-semibold text-white mb-6">Step 2: Adjust Variables</h2>
                
                <div className="space-y-6">
                  {Object.entries(variables).map(([key, value]) => {
                    const labels = {
                      demandGrowth: 'Demand Growth',
                      pricingChange: 'Pricing Change',
                      inventoryAvailability: 'Inventory Availability',
                      marketingSpend: 'Marketing Spend',
                      competitorActivity: 'Competitor Activity'
                    };
                    
                    const units = {
                      demandGrowth: '%',
                      pricingChange: '%',
                      inventoryAvailability: '%',
                      marketingSpend: '% of baseline',
                      competitorActivity: '% intensity'
                    };

                    const ranges = {
                      demandGrowth: { min: -50, max: 100 },
                      pricingChange: { min: -30, max: 30 },
                      inventoryAvailability: { min: 0, max: 100 },
                      marketingSpend: { min: 50, max: 200 },
                      competitorActivity: { min: 0, max: 100 }
                    };

                    return (
                      <div key={key}>
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-sm font-medium text-slate-300">
                            {labels[key as keyof typeof labels]}
                          </label>
                          <span className="text-sm text-blue-300 font-medium">
                            {value}{units[key as keyof typeof units]}
                          </span>
                        </div>
                        <input
                          type="range"
                          min={ranges[key as keyof typeof ranges].min}
                          max={ranges[key as keyof typeof ranges].max}
                          value={value}
                          onChange={(e) => handleSliderChange(key, parseInt(e.target.value))}
                          className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                        />
                      </div>
                    );
                  })}
                </div>

                <div className="flex items-center space-x-3 mt-6">
                  <button
                    onClick={handleSimulate}
                    disabled={isSimulating}
                    className="flex-1 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded-xl p-3 text-blue-300 font-medium transition-all duration-200 hover:scale-105 flex items-center justify-center space-x-2 disabled:opacity-50"
                  >
                    {isSimulating ? (
                      <>
                        <div className="w-4 h-4 border-2 border-blue-300 border-t-transparent rounded-full animate-spin" />
                        <span>Simulating...</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4" />
                        <span>Run Simulation</span>
                      </>
                    )}
                  </button>
                  
                  <button className="px-4 py-3 bg-slate-700/40 hover:bg-slate-600/50 rounded-xl text-slate-300 transition-all duration-200">
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Results */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-8"
            >
              {/* Step 3: Results */}
              <div className="bg-slate-800/40 backdrop-blur-md rounded-2xl p-6 border border-slate-700/30">
                <h2 className="text-xl font-semibold text-white mb-6">Step 3: Scenario Outcomes</h2>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  {/* Current Projection */}
                  <div className="bg-slate-700/30 rounded-xl p-4 border border-slate-600/30">
                    <h3 className="text-sm font-medium text-slate-400 mb-2">Current Projection</h3>
                    <div className="text-2xl font-bold text-white mb-1">{currentProjection.value}/100</div>
                    <div className="flex items-center space-x-1 text-red-400">
                      <TrendingDown className="w-4 h-4" />
                      <span className="text-sm">{currentProjection.trend}%</span>
                    </div>
                    <div className="text-xs text-slate-500 mt-2">{currentProjection.confidence}% confidence</div>
                  </div>

                  {/* Simulated Outcome */}
                  <div className={`rounded-xl p-4 border ${showResults ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-slate-700/30 border-slate-600/30'} transition-all duration-500`}>
                    <h3 className="text-sm font-medium text-slate-400 mb-2">Simulated Outcome</h3>
                    {showResults ? (
                      <>
                        <div className="text-2xl font-bold text-white mb-1">{simulatedOutcome.value}/100</div>
                        <div className="flex items-center space-x-1 text-emerald-400">
                          <TrendingUp className="w-4 h-4" />
                          <span className="text-sm">+{simulatedOutcome.trend}%</span>
                        </div>
                        <div className="text-xs text-slate-500 mt-2">{simulatedOutcome.confidence}% confidence</div>
                        <div className="text-xs text-emerald-400 font-medium mt-1">
                          +{simulatedOutcome.changePercent}% improvement
                        </div>
                      </>
                    ) : (
                      <div className="text-slate-500 text-sm">Run simulation to see results</div>
                    )}
                  </div>
                </div>

                {/* Chart Placeholder */}
                {showResults && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-slate-700/20 rounded-xl p-4 border border-slate-600/20"
                  >
                    <h4 className="text-sm font-medium text-slate-300 mb-3">Impact Visualization</h4>
                    <div className="flex items-end space-x-2 h-24">
                      {[68, 70, 72, 75, 78].map((value, index) => (
                        <div key={index} className="flex-1 bg-gradient-to-t from-blue-500/40 to-emerald-500/40 rounded-t" style={{ height: `${(value / 78) * 100}%` }} />
                      ))}
                    </div>
                    <div className="text-xs text-slate-500 mt-2">Projected improvement over 5 periods</div>
                  </motion.div>
                )}

                {/* Export Actions */}
                {showResults && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="flex items-center space-x-3 mt-6"
                  >
                    <button className="flex-1 bg-slate-700/40 hover:bg-slate-600/50 border border-slate-600/30 rounded-xl p-3 text-slate-300 font-medium transition-all duration-200 hover:scale-105 flex items-center justify-center space-x-2">
                      <Save className="w-4 h-4" />
                      <span>Save Scenario</span>
                    </button>
                    <button className="flex-1 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded-xl p-3 text-blue-300 font-medium transition-all duration-200 hover:scale-105 flex items-center justify-center space-x-2">
                      <Download className="w-4 h-4" />
                      <span>Export</span>
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}