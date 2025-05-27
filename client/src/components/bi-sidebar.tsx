import { useState } from "react";
import { BarChart4, ShieldAlert, TrendingUp, Plus, Trophy, Target, AlertTriangle, Users, Rocket, Clock, DollarSign, Package } from "lucide-react";
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

// KPI Block component
const KPIBlock = ({ title, stat, icon, chart, color = "text-gray-600" }: {
  title: string;
  stat: string;
  icon: React.ReactNode;
  chart?: React.ReactNode;
  color?: string;
}) => (
  <div className="bg-white border border-gray-100 rounded-lg p-3 shadow-sm hover:shadow-md transition">
    <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
      <div className={`flex items-center gap-2 ${color}`}>
        {icon} 
        <span className="font-medium">{title}</span>
      </div>
      <span className="font-semibold text-gray-800">{stat}</span>
    </div>
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
        <div className="fixed left-24 top-24 w-[460px] h-[360px] bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-200 p-6 flex flex-col justify-between space-y-4 z-50">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-lg font-semibold text-gray-800">
              <span className="h-3 w-3 bg-green-500 rounded-full animate-pulse" />
              Performance Metrics
            </div>
            <button className="text-xs text-gray-500 hover:underline">View Full Report</button>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-2 gap-4">
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

          {/* AI Insight */}
          <p className="text-xs text-gray-500 italic bg-gray-50 p-3 rounded-lg">
            "Sales are trending 6% above the chain-wide budget pace. Aderezo continues outperforming across 3 regions."
          </p>

          {/* Bottom Action */}
          <button className="w-full bg-red-500 text-white text-sm rounded-xl py-2 hover:bg-red-600 transition">
            Ask insights about performance
          </button>
        </div>
      )}

      {activePanel === 'risks' && (
        <div className="fixed left-24 top-24 w-[460px] h-[360px] bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-200 p-6 flex flex-col justify-between space-y-4 z-50">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-lg font-semibold text-gray-800">
              <span className="h-3 w-3 bg-red-500 rounded-full animate-pulse" />
              Risk Analysis
            </div>
            <button className="text-xs text-gray-500 hover:underline">View All Alerts</button>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-2 gap-4">
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

          {/* AI Insight */}
          <p className="text-xs text-gray-500 italic bg-red-50 p-3 rounded-lg">
            "Critical: 3 high-demand SKUs running low. Recommend immediate reorder for Zona Norte locations."
          </p>

          {/* Bottom Action */}
          <button className="w-full bg-red-500 text-white text-sm rounded-xl py-2 hover:bg-red-600 transition">
            Ask about risk mitigation
          </button>
        </div>
      )}

      {activePanel === 'opportunities' && (
        <div className="fixed left-24 top-24 w-[460px] h-[360px] bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-200 p-6 flex flex-col justify-between space-y-4 z-50">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-lg font-semibold text-gray-800">
              <span className="h-3 w-3 bg-yellow-500 rounded-full animate-pulse" />
              Growth Opportunities
            </div>
            <button className="text-xs text-gray-500 hover:underline">Strategy Report</button>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-2 gap-4">
            <KPIBlock 
              title="Promo ROI" 
              stat="340%" 
              icon={<Rocket size={16} />} 
              chart={<Sparkline />}
              color="text-green-600" 
            />
            <KPIBlock 
              title="Inactive Clients" 
              stat="23 leads" 
              icon={<Users size={16} />} 
              chart={<BarMini />}
              color="text-blue-600" 
            />
            <KPIBlock 
              title="Upsell Potential" 
              stat="$78K" 
              icon={<TrendingUp size={16} />} 
              chart={<RadialProgress percentage={85} />}
              color="text-purple-600" 
            />
            <KPIBlock 
              title="Market Share" 
              stat="+2.4%" 
              icon={<Target size={16} />}
              color="text-green-600" 
            />
          </div>

          {/* AI Insight */}
          <p className="text-xs text-gray-500 italic bg-yellow-50 p-3 rounded-lg">
            "Scanner/Tonga promotions showing exceptional ROI. Recommend expanding to similar demographics."
          </p>

          {/* Bottom Action */}
          <button className="w-full bg-red-500 text-white text-sm rounded-xl py-2 hover:bg-red-600 transition">
            Explore growth strategies
          </button>
        </div>
      )}
    </>
  );
}