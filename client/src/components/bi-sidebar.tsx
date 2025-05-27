import { useState } from "react";
import { BarChart4, ShieldAlert, TrendingUp, Plus, Trophy, Target, AlertTriangle, Users, Rocket, Zap } from "lucide-react";
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

const DropdownItem = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <div className="flex items-center gap-3 text-sm text-gray-800 hover:bg-gray-100/80 p-2 rounded-md transition cursor-pointer">
    <div className="text-gray-500">{icon}</div>
    <span>{label}</span>
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

      {/* Elegant Floating Panel */}
      {activePanel && (
        <div className="fixed top-24 left-24 bg-white/70 backdrop-blur-sm rounded-xl shadow-xl shadow-gray-100/40 p-5 w-80 space-y-5 border border-gray-100 z-50">
          <div className="flex items-center gap-2 text-sm text-gray-700 font-semibold">
            {activePanel === 'performance' && (
              <>
                <span className="h-2 w-2 rounded-full bg-green-500"></span>
                Performance
              </>
            )}
            {activePanel === 'risks' && (
              <>
                <span className="h-2 w-2 rounded-full bg-red-500"></span>
                Risks & Issues
              </>
            )}
            {activePanel === 'opportunities' && (
              <>
                <span className="h-2 w-2 rounded-full bg-yellow-500"></span>
                Opportunities
              </>
            )}
          </div>

          <div className="space-y-3">
            {insights[activePanel].map((item, index) => (
              <DropdownItem key={index} icon={item.icon} label={item.label} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}