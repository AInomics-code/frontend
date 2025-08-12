import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Play, Save, Download, RotateCcw, TrendingUp, TrendingDown, ArrowLeft, Plus } from 'lucide-react';
import { simulateScenario } from '@/data/formulas';
import { getEntityById, getEntitiesByType } from '@/data/entities';

export default function ScenarioSimulator() {
  const [entityType, setEntityType] = useState('products');
  const [entityName, setEntityName] = useState('mangoSalsa');
  const [timeHorizon, setTimeHorizon] = useState('12weeks');
  
  const [variables, setVariables] = useState({
    demandGrowth: 0.15, // 15%
    priceChange: 0.0,   // 0%
    promoMultiplier: 1.0, // No promotion
    leadTime: 14,       // 14 days
    stockAvailable: 5000 // units
  });

  const [results, setResults] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);

  // Load entity data
  const entities = getEntitiesByType(entityType);
  const selectedEntity = getEntityById(entityType, entityName);

  useEffect(() => {
    if (selectedEntity) {
      // Update default values based on selected entity
      setVariables(prev => ({
        ...prev,
        stockAvailable: selectedEntity.stockOnHand || 5000,
        leadTime: selectedEntity.leadTime || 14
      }));
    }
  }, [selectedEntity]);

  const entityTypeOptions = [
    { id: 'products', name: 'Product', icon: '📦' },
    { id: 'zones', name: 'Zone', icon: '🗺️' },
    { id: 'kpis', name: 'KPI', icon: '📊' }
  ];

  const timeHorizonOptions = [
    { id: '4weeks', name: '4 Weeks' },
    { id: '12weeks', name: '12 Weeks' },
    { id: '6months', name: '6 Months' },
    { id: '1year', name: '1 Year' }
  ];

  const runSimulation = () => {
    if (!selectedEntity) return;
    
    setIsSimulating(true);
    setTimeout(() => {
      const simulationInputs = {
        entity: selectedEntity,
        demandGrowth: variables.demandGrowth,
        priceChange: variables.priceChange,
        promoMultiplier: variables.promoMultiplier,
        leadTime: variables.leadTime,
        stockAvailable: variables.stockAvailable
      };
      
      const scenarioResults = simulateScenario(simulationInputs);
      setResults(scenarioResults);
      setIsSimulating(false);
    }, 1500);
  };

  const resetVariables = () => {
    setVariables({
      demandGrowth: 0,
      priceChange: 0,
      promoMultiplier: 1.0,
      leadTime: selectedEntity?.leadTime || 14,
      stockAvailable: selectedEntity?.stockOnHand || 5000
    });
    setResults(null);
  };

  const handleSliderChange = (key: string, value: number) => {
    setVariables(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex">
      {/* Left Sidebar */}
      <div className="w-24 bg-slate-900/95 backdrop-blur-sm border-r border-slate-700/30 flex flex-col items-center py-8">
        <button
          onClick={() => window.history.back()}
          className="w-10 h-10 bg-blue-500/30 rounded-xl flex items-center justify-center mb-8 hover:bg-blue-500/40 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-blue-300" />
        </button>
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
              className="space-y-6"
            >
              {/* Panel A - Select Focus */}
              <div className="bg-slate-800/40 backdrop-blur-md rounded-2xl p-6 border border-slate-700/30">
                <h3 className="text-xl font-semibold text-slate-200 mb-4">Select Focus</h3>
                
                <div className="space-y-4">
                  {/* Entity Type */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Entity Type</label>
                    <select
                      value={entityType}
                      onChange={(e) => setEntityType(e.target.value)}
                      className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    >
                      {entityTypeOptions.map(option => (
                        <option key={option.id} value={option.id}>
                          {option.icon} {option.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Entity Name */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Entity Name</label>
                    <select
                      value={entityName}
                      onChange={(e) => setEntityName(e.target.value)}
                      className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    >
                      {Object.values(entities).map((entity: any) => (
                        <option key={entity.id} value={entity.id}>
                          {entity.name || entity.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Time Horizon */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Time Horizon</label>
                    <select
                      value={timeHorizon}
                      onChange={(e) => setTimeHorizon(e.target.value)}
                      className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    >
                      {timeHorizonOptions.map(option => (
                        <option key={option.id} value={option.id}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Panel B - Adjust Variables */}
              <div className="bg-slate-800/40 backdrop-blur-md rounded-2xl p-6 border border-slate-700/30">
                <h3 className="text-xl font-semibold text-slate-200 mb-4">Adjust Variables</h3>
                
                <div className="space-y-6">
                  {/* Demand Growth */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Demand Growth: {(variables.demandGrowth * 100).toFixed(1)}%
                    </label>
                    <input
                      type="range"
                      min="-0.5"
                      max="1.0"
                      step="0.05"
                      value={variables.demandGrowth}
                      onChange={(e) => handleSliderChange('demandGrowth', parseFloat(e.target.value))}
                      className="w-full slider"
                    />
                  </div>

                  {/* Price Change */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Price Change: {(variables.priceChange * 100).toFixed(1)}%
                    </label>
                    <input
                      type="range"
                      min="-0.3"
                      max="0.3"
                      step="0.05"
                      value={variables.priceChange}
                      onChange={(e) => handleSliderChange('priceChange', parseFloat(e.target.value))}
                      className="w-full slider"
                    />
                  </div>

                  {/* Promo Multiplier */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Promo Multiplier: {variables.promoMultiplier.toFixed(1)}x
                    </label>
                    <input
                      type="range"
                      min="1.0"
                      max="3.0"
                      step="0.1"
                      value={variables.promoMultiplier}
                      onChange={(e) => handleSliderChange('promoMultiplier', parseFloat(e.target.value))}
                      className="w-full slider"
                    />
                  </div>

                  {/* Lead Time */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Lead Time: {variables.leadTime} days
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="30"
                      step="1"
                      value={variables.leadTime}
                      onChange={(e) => handleSliderChange('leadTime', parseInt(e.target.value))}
                      className="w-full slider"
                    />
                  </div>

                  {/* Stock Available */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Stock Available: {variables.stockAvailable.toLocaleString()} units
                    </label>
                    <input
                      type="range"
                      min="100"
                      max="10000"
                      step="100"
                      value={variables.stockAvailable}
                      onChange={(e) => handleSliderChange('stockAvailable', parseInt(e.target.value))}
                      className="w-full slider"
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={runSimulation}
                    disabled={isSimulating}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    {isSimulating ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Simulating...
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4" />
                        Run Simulation
                      </>
                    )}
                  </button>
                  <button
                    onClick={resetVariables}
                    className="bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Reset
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Results */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-6"
            >
              {/* Panel C - Results */}
              <div className="bg-slate-800/40 backdrop-blur-md rounded-2xl p-6 border border-slate-700/30">
                <h3 className="text-xl font-semibold text-slate-200 mb-4">Results</h3>
                
                {results ? (
                  <div className="space-y-6">
                    {/* Current vs Simulated Metrics */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <h4 className="text-sm font-medium text-slate-400 mb-3">Current</h4>
                        <div className="space-y-3">
                          <div className="bg-slate-700/30 rounded-lg p-3">
                            <div className="text-lg font-semibold text-slate-200">
                              ${results.current.revenue.toLocaleString()}
                            </div>
                            <div className="text-xs text-slate-400">Revenue</div>
                          </div>
                          <div className="bg-slate-700/30 rounded-lg p-3">
                            <div className="text-lg font-semibold text-slate-200">
                              {results.current.units.toLocaleString()}
                            </div>
                            <div className="text-xs text-slate-400">Units</div>
                          </div>
                          <div className="bg-slate-700/30 rounded-lg p-3">
                            <div className="text-lg font-semibold text-slate-200">
                              ${results.current.margin.toLocaleString()}
                            </div>
                            <div className="text-xs text-slate-400">Margin</div>
                          </div>
                          <div className="bg-slate-700/30 rounded-lg p-3">
                            <div className="text-lg font-semibold text-slate-200">
                              {results.current.serviceLevel}%
                            </div>
                            <div className="text-xs text-slate-400">Service Level</div>
                          </div>
                        </div>
                      </div>

                      <div className="text-center">
                        <h4 className="text-sm font-medium text-slate-400 mb-3">Simulated</h4>
                        <div className="space-y-3">
                          <div className="bg-slate-700/30 rounded-lg p-3">
                            <div className="text-lg font-semibold text-blue-300">
                              ${results.simulated.revenue.toLocaleString()}
                            </div>
                            <div className="text-xs text-slate-400">Revenue</div>
                            <div className="text-xs text-blue-300">
                              {((results.simulated.revenue / results.current.revenue - 1) * 100).toFixed(1)}%
                            </div>
                          </div>
                          <div className="bg-slate-700/30 rounded-lg p-3">
                            <div className="text-lg font-semibold text-blue-300">
                              {results.simulated.units.toLocaleString()}
                            </div>
                            <div className="text-xs text-slate-400">Units</div>
                            <div className="text-xs text-blue-300">
                              {((results.simulated.units / results.current.units - 1) * 100).toFixed(1)}%
                            </div>
                          </div>
                          <div className="bg-slate-700/30 rounded-lg p-3">
                            <div className="text-lg font-semibold text-blue-300">
                              ${results.simulated.margin.toLocaleString()}
                            </div>
                            <div className="text-xs text-slate-400">Margin</div>
                            <div className="text-xs text-blue-300">
                              {((results.simulated.margin / results.current.margin - 1) * 100).toFixed(1)}%
                            </div>
                          </div>
                          <div className="bg-slate-700/30 rounded-lg p-3">
                            <div className="text-lg font-semibold text-blue-300">
                              {results.simulated.serviceLevel}%
                            </div>
                            <div className="text-xs text-slate-400">Service Level</div>
                            <div className="text-xs text-blue-300">
                              {(results.simulated.serviceLevel - results.current.serviceLevel).toFixed(1)}%
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-4 border-t border-slate-700/30">
                      <button className="flex-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
                        <Save className="w-4 h-4" />
                        Save Scenario
                      </button>
                      <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
                        <Download className="w-4 h-4" />
                        Export PDF
                      </button>
                      <button className="flex-1 bg-amber-600 hover:bg-amber-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
                        <Plus className="w-4 h-4" />
                        Add Task
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-slate-700/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <TrendingUp className="w-8 h-8 text-slate-400" />
                    </div>
                    <p className="text-slate-400">Run a simulation to see projected outcomes</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}