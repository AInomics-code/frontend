import { useState } from "react";
import { BarChart4, ShieldAlert, TrendingUp, Plus } from "lucide-react";
import laDonaLogo from "@assets/Screenshot 2025-05-19 alle 15.08.46.png";

type PanelType = 'performance' | 'risks' | 'opportunities' | null;

const insights = {
  performance: [
    "📊 Sales vs Budget (by Chain)",
    "🏆 Top-Selling SKU (This Week)",
    "📈 Client Goal Progress"
  ],
  risks: [
    "🚨 Backorders Today",
    "❌ Out-of-Stock Products (by Store)",
    "💸 Overdue Clients (120+ Days)"
  ],
  opportunities: [
    "🎯 Promo ROI (Scanner/Tonga)",
    "🕳️ Inactive Clients (30+ Days)",
    "📉 Rep Underperformance"
  ]
};

const SidebarItem = ({ icon, label, isActive, onClick, hoverColor }: {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
  hoverColor: string;
}) => (
  <div 
    className={`flex flex-col items-center space-y-1 cursor-pointer transition-colors py-2 ${
      isActive ? `${hoverColor} bg-white shadow-sm rounded-lg px-3` : 'text-gray-600 hover:text-black'
    }`}
    onClick={onClick}
  >
    <div className="text-xl">{icon}</div>
    <div className="text-[10px] tracking-wide uppercase font-medium">{label}</div>
  </div>
);

export function BiSidebar() {
  const [activePanel, setActivePanel] = useState<PanelType>(null);

  const handlePanelClick = (panel: PanelType) => {
    setActivePanel(activePanel === panel ? null : panel);
  };

  return (
    <>
      <div className="fixed top-0 left-0 h-screen w-20 bg-[#F9FAFB] border-r border-gray-200 flex flex-col items-center py-6 space-y-6 text-gray-600" style={{ zIndex: 9999 }}>
        {/* La Doña logo */}
        <img 
          src={laDonaLogo} 
          alt="La Doña" 
          className="h-8 w-auto mb-4 rounded-md" 
        />

        {/* Plus Button */}
        <button className="w-10 h-10 rounded-lg bg-white hover:bg-gray-50 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-all duration-200 shadow-sm border border-gray-200">
          <Plus size={18} />
        </button>

        {/* BI Navigation Items */}
        <div className="flex flex-col space-y-4">
          <SidebarItem 
            icon={<BarChart4 size={20} />}
            label="Performance"
            isActive={activePanel === 'performance'}
            onClick={() => handlePanelClick('performance')}
            hoverColor="text-green-600"
          />
          
          <SidebarItem 
            icon={<ShieldAlert size={20} />}
            label="Risks"
            isActive={activePanel === 'risks'}
            onClick={() => handlePanelClick('risks')}
            hoverColor="text-red-600"
          />
          
          <SidebarItem 
            icon={<TrendingUp size={20} />}
            label="Opportunities"
            isActive={activePanel === 'opportunities'}
            onClick={() => handlePanelClick('opportunities')}
            hoverColor="text-yellow-600"
          />
        </div>

        {/* User badge at bottom */}
        <div className="mt-auto flex flex-col items-center">
          <div className="rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 w-10 h-10 flex items-center justify-center text-white font-bold text-sm mb-1">
            E
          </div>
          <span className="text-[10px] font-semibold text-blue-600">PRO</span>
        </div>
      </div>

      {/* Floating Card */}
      {activePanel && (
        <div className="fixed top-20 left-20 bg-white shadow-xl rounded-xl p-4 w-80 border border-[#e0e0e0] z-50">
          <h2 className="text-lg font-semibold mb-3 flex items-center">
            {activePanel === 'performance' && (
              <>
                <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                Performance
              </>
            )}
            {activePanel === 'risks' && (
              <>
                <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                Risks & Issues
              </>
            )}
            {activePanel === 'opportunities' && (
              <>
                <span className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>
                Opportunities
              </>
            )}
          </h2>
          <ul className="space-y-3 text-sm text-gray-700">
            {insights[activePanel].map((item, index) => (
              <li key={index} className="hover:text-black transition-colors cursor-pointer p-2 hover:bg-gray-50 rounded-lg">
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}