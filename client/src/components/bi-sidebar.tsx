import { useState } from "react";
import { BarChart4, ShieldAlert, TrendingUp, Plus, Trophy, Target, AlertTriangle, Users, Rocket, Clock, DollarSign, Package, LineChart, PieChart, InfoIcon } from "lucide-react";
import laDonaLogo from "@assets/Screenshot 2025-05-19 alle 15.08.46.png";

type PanelType = 'performance' | 'risks' | 'opportunities' | null;

const insights = {
  performance: [
    { icon: <BarChart4 size={16} />, label: "Sales vs Budget (by Chain)" },
    { icon: <Trophy size={16} />, label: "Top-Selling SKU (This Week)" },
    { icon: <Target size={16} />, label: "Client Goal Progress" }
  ],
  risks: [
    { icon: <AlertTriangle size={16} />, label: "Backorders Today" },
    { icon: <ShieldAlert size={16} />, label: "Out-of-Stock Products (by Store)" },
    { icon: <Users size={16} />, label: "Overdue Clients (120+ Days)" }
  ],
  opportunities: [
    { icon: <Target size={16} />, label: "Promo ROI (Scanner/Tonga)" },
    { icon: <Users size={16} />, label: "Inactive Clients (30+ Days)" },
    { icon: <Rocket size={16} />, label: "Rep Underperformance" }
  ]
};

// Simple sparkline chart component
const Sparkline = () => (
  <svg width="60" height="20" className="opacity-70">
    <polyline
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      points="0,15 15,8 30,12 45,5 60,9"
    />
  </svg>
);

// Mini bar chart component
const BarMini = () => (
  <div className="flex items-end gap-1 h-5">
    {[60, 80, 45, 90, 70].map((height, i) => (
      <div
        key={i}
        className="bg-current rounded-sm flex-1 opacity-70"
        style={{ height: `${height}%` }}
      />
    ))}
  </div>
);

// Radial progress component
const RadialProgress = ({ percentage = 71 }: { percentage?: number }) => (
  <div className="relative w-8 h-8">
    <svg className="w-8 h-8 transform -rotate-90" viewBox="0 0 32 32">
      <circle
        cx="16"
        cy="16"
        r="12"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        className="opacity-20"
      />
      <circle
        cx="16"
        cy="16"
        r="12"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeDasharray={`${percentage * 0.75} 75`}
        className="opacity-70"
      />
    </svg>
  </div>
);

// Enhanced KPI Block component
const KPIBlock = ({ title, stat, icon, chart, color = "text-gray-600" }: {
  title: string;
  stat: string;
  icon: React.ReactNode;
  chart?: React.ReactNode;
  color?: string;
}) => (
  <div className="rounded-xl bg-white/90 hover:shadow-md transition-all border border-gray-100 p-4 hover:shadow-[0_0_0_4px_rgba(0,0,0,0.02)]">
    <div className="flex items-center justify-between text-sm font-medium mb-3">
      <div className={`flex items-center gap-2 text-gray-600`}>
        {icon}
        <span>{title}</span>
      </div>
      <div className={`text-right font-semibold ${color}`}>{stat}</div>
    </div>
    {chart && <div className="mt-2">{chart}</div>}
  </div>
);

// Enhanced KPI Block with badges and deltas
const EnhancedKPIBlock = ({ icon, title, value, delta, badge, accent, chart }: {
  icon: React.ReactNode;
  title: string;
  value: string;
  delta?: string;
  badge?: string;
  accent: string;
  chart?: React.ReactNode;
}) => (
  <div className="rounded-xl bg-white border hover:shadow-md p-3 transition space-y-1">
    <div className="flex justify-between text-sm font-medium text-gray-600">
      <div className="flex gap-2 items-center">{icon} {title}</div>
      {badge && (
        <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">
          {badge}
        </span>
      )}
    </div>
    <div className={`text-lg font-bold ${accent}`}>{value}</div>
    {delta && <div className="text-xs text-gray-500">{delta}</div>}
    {chart && <div className="mt-2">{chart}</div>}
  </div>
);

const SidebarItem = ({ icon, label, isActive, onClick, hoverColor }: {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
  hoverColor: string;
}) => (
  <div 
    className={`flex flex-col items-center cursor-pointer transition-all duration-200 hover:bg-gray-100 rounded-lg px-1 py-2 text-gray-600 hover:text-black pt-[13px] pb-[13px] ${
      isActive ? `${hoverColor} bg-white shadow-sm` : ''
    }`}
    onClick={onClick}
  >
    <div className="mb-0.5">{icon}</div>
    <span className="uppercase text-[8px] tracking-tight font-medium text-gray-500 hover:text-gray-800 transition-colors text-center leading-tight">
      {label}
    </span>
  </div>
);

export function BiSidebar() {
  const [activePanel, setActivePanel] = useState<PanelType>(null);

  const handlePanelClick = (panel: PanelType) => {
    setActivePanel(activePanel === panel ? null : panel);
  };

  return (
    <>
      <div className="fixed top-0 left-0 h-screen w-20 bg-[#F9FAFB] border-r border-gray-200 flex flex-col items-center py-8 text-gray-600" style={{ zIndex: 9999 }}>
        {/* La Doña logo */}
        <div className="flex flex-col items-center mb-8">
          <img 
            src={laDonaLogo} 
            alt="La Doña" 
            className="h-6 w-auto rounded-sm" 
          />
          <span className="text-[7px] text-gray-400 mt-1 tracking-wide font-medium">BI</span>
        </div>

        {/* Plus Button */}
        <button className="w-8 h-8 rounded-md bg-white hover:bg-gray-50 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-all duration-200 shadow-sm border border-gray-200 mb-8">
          <Plus size={14} />
        </button>

        {/* BI Navigation Items */}
        <div className="flex flex-col gap-y-6">
          <SidebarItem 
            icon={<BarChart4 size={24} />}
            label="Performance"
            isActive={activePanel === 'performance'}
            onClick={() => handlePanelClick('performance')}
            hoverColor="text-green-600"
          />
          
          <SidebarItem 
            icon={<ShieldAlert size={24} />}
            label="Risks"
            isActive={activePanel === 'risks'}
            onClick={() => handlePanelClick('risks')}
            hoverColor="text-red-600"
          />
          
          <SidebarItem 
            icon={<TrendingUp size={24} />}
            label="Opportunities"
            isActive={activePanel === 'opportunities'}
            onClick={() => handlePanelClick('opportunities')}
            hoverColor="text-yellow-600"
          />
        </div>

        {/* User badge at bottom */}
        <div className="mt-auto mb-4 flex flex-col items-center">
          <div className="bg-gradient-to-br from-teal-500 to-cyan-500 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs mb-2">
            E
          </div>
          <span className="text-[8px] font-semibold text-blue-600 tracking-wide">PRO</span>
        </div>
      </div>

      {/* Enhanced Dashboard Panels */}
      {activePanel === 'performance' && (
        <div className="fixed left-24 top-24 rounded-2xl shadow-lg bg-white p-6 space-y-5 w-[500px] z-50">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
              Performance
            </h2>
            <span className="text-xs text-gray-500">🔘 65% of May complete</span>
          </div>

          {/* KPI Cards Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <p className="text-sm text-gray-500">Sales vs Budget</p>
                <p className="text-lg font-semibold text-green-600">84%</p>
              </div>
              <BarChart4 size={20} className="text-gray-400" />
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <p className="text-sm text-gray-500">Top SKU (Wk)</p>
                <p className="text-lg font-semibold text-amber-600">Aderezo</p>
              </div>
              <Trophy size={20} className="text-gray-400" />
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <p className="text-sm text-gray-500">Client Progress</p>
                <p className="text-lg font-semibold text-blue-600">71%</p>
              </div>
              <Target size={20} className="text-gray-400" />
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <p className="text-sm text-gray-500">Last Update</p>
                <p className="text-lg font-semibold text-gray-600">Today</p>
              </div>
              <Clock size={20} className="text-gray-400" />
            </div>
          </div>

          {/* Micro-insight */}
          <div className="text-sm text-green-700 bg-green-100 px-3 py-2 rounded-xl">
            ✅ Aderezo tracking +6% above chain avg
          </div>

          {/* CTA Button */}
          <button className="w-full bg-rose-500 hover:bg-rose-600 text-white text-sm font-semibold rounded-xl py-3 mt-4 shadow">
            Explore performance insights
          </button>
        </div>
      )}

      {activePanel === 'risks' && (
        <div className="fixed left-24 top-24 rounded-2xl shadow-lg bg-white p-6 space-y-5 w-[500px] z-50">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <span className="h-2 w-2 bg-red-500 rounded-full animate-pulse" />
              Risks
            </h2>
            <span className="text-xs text-gray-500">🔘 65% of May complete</span>
          </div>

          {/* KPI Cards Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <p className="text-sm text-gray-500">Backorders</p>
                <p className="text-lg font-semibold text-red-600">12 items</p>
              </div>
              <AlertTriangle size={20} className="text-gray-400" />
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <p className="text-sm text-gray-500">Out of Stock</p>
                <p className="text-lg font-semibold text-orange-600">8 stores</p>
              </div>
              <Package size={20} className="text-gray-400" />
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <p className="text-sm text-gray-500">Overdue Clients</p>
                <p className="text-lg font-semibold text-red-600">$45K</p>
              </div>
              <DollarSign size={20} className="text-gray-400" />
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <p className="text-sm text-gray-500">Priority Level</p>
                <p className="text-lg font-semibold text-yellow-600">Medium</p>
              </div>
              <ShieldAlert size={20} className="text-gray-400" />
            </div>
          </div>

          {/* Micro-insight */}
          <div className="text-sm text-red-700 bg-red-100 px-3 py-2 rounded-xl">
            ⚠️ Zona Norte needs immediate reorder - 3 SKUs critical
          </div>

          {/* CTA Button */}
          <button className="w-full bg-rose-500 hover:bg-rose-600 text-white text-sm font-semibold rounded-xl py-3 mt-4 shadow">
            Resolve high-risk issues
          </button>
        </div>
      )}

      {activePanel === 'opportunities' && (
        <div className="fixed left-24 top-24 rounded-2xl shadow-lg bg-white p-6 space-y-5 w-[500px] z-50">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <span className="h-2 w-2 bg-yellow-500 rounded-full animate-pulse" />
              Opportunities
            </h2>
            <span className="text-xs text-gray-500">🔘 65% of May complete</span>
          </div>

          {/* KPI Cards Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <p className="text-sm text-gray-500">Promo ROI</p>
                <p className="text-lg font-semibold text-green-600">340%</p>
              </div>
              <LineChart size={20} className="text-gray-400" />
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <p className="text-sm text-gray-500">Inactive Clients</p>
                <p className="text-lg font-semibold text-blue-600">23 leads</p>
              </div>
              <Users size={20} className="text-gray-400" />
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <p className="text-sm text-gray-500">Upsell Potential</p>
                <p className="text-lg font-semibold text-purple-600">$78K</p>
              </div>
              <TrendingUp size={20} className="text-gray-400" />
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <p className="text-sm text-gray-500">Market Share</p>
                <p className="text-lg font-semibold text-emerald-500">+2.4%</p>
              </div>
              <PieChart size={20} className="text-gray-400" />
            </div>
          </div>

          {/* Micro-insight */}
          <div className="text-sm text-yellow-700 bg-yellow-100 px-3 py-2 rounded-xl">
            🔥 Scanner/Tonga showing +240% ROI surge this quarter
          </div>

          {/* CTA Button */}
          <button className="w-full bg-rose-500 hover:bg-rose-600 text-white text-sm font-semibold rounded-xl py-3 mt-4 shadow">
            Explore growth paths
          </button>
        </div>
      )}
    </>
  );
}