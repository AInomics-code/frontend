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
        <div className="fixed left-24 top-24 w-[460px] h-[360px] backdrop-blur-md bg-white/70 border border-gray-200/50 shadow-xl rounded-3xl p-6 sm:p-8 flex flex-col z-50">
          {/* Header */}
          <h2 className="text-xl font-semibold text-gray-800 tracking-tight flex items-center gap-2 mb-6">
            <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
            Performance
          </h2>

          {/* KPI Cards Grid */}
          <div className="grid grid-cols-2 gap-4 mt-4 flex-1">
            <KPIBlock 
              title="Sales vs Budget" 
              stat="84%" 
              icon={<BarChart4 size={16} />} 
              chart={<Sparkline />}
              color="text-green-600" 
            />
            <KPIBlock 
              title="Top SKU (Wk)" 
              stat="Aderezo" 
              icon={<Trophy size={16} />} 
              chart={<BarMini />}
              color="text-amber-600" 
            />
            <KPIBlock 
              title="Client Progress" 
              stat="71%" 
              icon={<Target size={16} />} 
              chart={<RadialProgress percentage={71} />}
              color="text-blue-600" 
            />
            <KPIBlock 
              title="Last Update" 
              stat="Today" 
              icon={<Clock size={16} />}
              color="text-gray-600" 
            />
          </div>

          {/* Inline Smart Alert */}
          <div className="bg-green-50 border-l-4 border-green-400 text-green-700 p-3 rounded-md text-sm mt-4">
            📈 Aderezo outperforming +6% above budget across 3 regions
          </div>

          {/* Ask Button */}
          <button className="w-full text-white font-medium bg-gradient-to-r from-rose-500 to-rose-400 hover:from-rose-600 transition rounded-xl py-2.5 text-sm shadow-lg mt-4">
            Ask about these metrics
          </button>
        </div>
      )}

      {activePanel === 'risks' && (
        <div className="fixed left-24 top-24 w-[460px] h-[360px] backdrop-blur-md bg-white/70 border border-gray-200/50 shadow-xl rounded-3xl p-6 sm:p-8 flex flex-col z-50">
          {/* Header */}
          <h2 className="text-xl font-semibold text-gray-800 tracking-tight flex items-center gap-2 mb-6">
            <span className="h-2 w-2 bg-red-500 rounded-full animate-pulse" />
            Risk Analysis
          </h2>

          {/* KPI Cards Grid */}
          <div className="grid grid-cols-2 gap-4 mt-4 flex-1">
            <KPIBlock 
              title="Backorders" 
              stat="12 items" 
              icon={<AlertTriangle size={16} />} 
              chart={<BarMini />}
              color="text-red-600" 
            />
            <KPIBlock 
              title="Out of Stock" 
              stat="8 stores" 
              icon={<Package size={16} />} 
              chart={<Sparkline />}
              color="text-orange-600" 
            />
            <KPIBlock 
              title="Overdue Clients" 
              stat="$45K" 
              icon={<DollarSign size={16} />} 
              chart={<RadialProgress percentage={35} />}
              color="text-red-600" 
            />
            <KPIBlock 
              title="Priority Level" 
              stat="Medium" 
              icon={<ShieldAlert size={16} />}
              color="text-yellow-600" 
            />
          </div>

          {/* Inline Smart Alert */}
          <div className="bg-red-50 border-l-4 border-red-400 text-red-700 p-3 rounded-md text-sm mt-4">
            ⚠️ Reorder urgently in Zona Norte — 3 top SKUs at risk
          </div>

          {/* Ask Button */}
          <button className="w-full text-white font-medium bg-gradient-to-r from-rose-500 to-rose-400 hover:from-rose-600 transition rounded-xl py-2.5 text-sm shadow-lg mt-4">
            Ask about risk mitigation
          </button>
        </div>
      )}

      {activePanel === 'opportunities' && (
        <div className="fixed left-24 top-24 w-[420px] backdrop-blur-md bg-white/80 border border-gray-200/50 shadow-xl rounded-3xl p-6 space-y-4 z-50">
          {/* Header with Month Completion */}
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800 flex gap-2 items-center">
              <span className="h-2 w-2 bg-yellow-500 rounded-full animate-pulse" />
              Growth Opportunities
            </h2>
            <span className="text-xs text-gray-500 italic">🔘 65% of May complete</span>
          </div>

          {/* Enhanced KPI Grid */}
          <div className="grid grid-cols-2 gap-4">
            <EnhancedKPIBlock
              icon={<LineChart size={16} />}
              title="Promo ROI"
              value="340%"
              delta="+240% vs LY"
              badge="🔥 Highest ROI"
              accent="text-green-600"
              chart={<Sparkline />}
            />
            <EnhancedKPIBlock
              icon={<Users size={16} />}
              title="Inactive Clients"
              value="23 leads"
              badge="⚠️ At Risk"
              accent="text-blue-600"
              chart={<BarMini />}
            />
            <EnhancedKPIBlock
              icon={<TrendingUp size={16} />}
              title="Upsell Potential"
              value="$78K"
              accent="text-purple-600"
              chart={<RadialProgress percentage={85} />}
            />
            <EnhancedKPIBlock
              icon={<PieChart size={16} />}
              title="Market Share"
              value="+2.4%"
              delta="+1.1 pts"
              accent="text-emerald-500"
            />
          </div>

          {/* Smart Action Button */}
          <button className="w-full bg-yellow-50 border border-yellow-200 text-yellow-700 p-3 rounded-lg text-sm mt-4 hover:bg-yellow-100 transition flex items-center justify-center gap-2">
            🔎 Investigate Scanner/Tonga performance surge
          </button>

          {/* CTA */}
          <button className="w-full mt-2 text-white bg-gradient-to-r from-rose-500 to-rose-400 hover:brightness-110 transition rounded-xl py-2.5 text-sm shadow">
            Explore growth strategies
          </button>
        </div>
      )}
    </>
  );
}