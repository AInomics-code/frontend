import { useState } from "react";
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

export function BiSidebar() {
  const [activePanel, setActivePanel] = useState<PanelType>(null);

  const handlePanelClick = (panel: PanelType) => {
    setActivePanel(activePanel === panel ? null : panel);
  };

  return (
    <>
      <div className="fixed top-0 left-0 h-screen w-20 bg-[#f5f5f5] border-r border-[#e0e0e0] flex flex-col items-center py-4" style={{ zIndex: 9999 }}>
        {/* La Doña logo */}
        <div className="mb-6 p-2">
          <img
            src={laDonaLogo}
            alt="La Doña"
            className="h-12 w-auto object-contain rounded-lg"
          />
        </div>

        {/* Plus Button */}
        <div className="mb-8">
          <button className="w-12 h-12 rounded-xl bg-white hover:bg-[#f0f0f0] flex items-center justify-center text-[#7a7a7a] transition-all duration-300 shadow-sm border border-[#e0e0e0]">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        </div>

        {/* BI Navigation Items */}
        <div className="flex flex-col space-y-6">
          {/* Performance */}
          <button 
            className={`flex flex-col items-center justify-center transition-colors duration-300 mb-6 hover:bg-white rounded-xl p-3 hover:shadow-sm group relative ${
              activePanel === 'performance' 
                ? 'text-green-600 bg-white shadow-sm' 
                : 'text-[#7a7a7a] hover:text-green-600'
            }`}
            onClick={() => handlePanelClick('performance')}
          >
            <div className="flex items-center justify-center mb-1">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <span className="text-xs">Performance</span>
          </button>

          {/* Risks & Issues */}
          <button 
            className={`flex flex-col items-center justify-center transition-colors duration-300 mb-6 hover:bg-white rounded-xl p-3 hover:shadow-sm group relative ${
              activePanel === 'risks' 
                ? 'text-red-600 bg-white shadow-sm' 
                : 'text-[#7a7a7a] hover:text-red-600'
            }`}
            onClick={() => handlePanelClick('risks')}
          >
            <div className="flex items-center justify-center mb-1">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <span className="text-xs">Risks</span>
          </button>

          {/* Opportunities */}
          <button 
            className={`flex flex-col items-center justify-center transition-colors duration-300 mb-6 hover:bg-white rounded-xl p-3 hover:shadow-sm group relative ${
              activePanel === 'opportunities' 
                ? 'text-yellow-600 bg-white shadow-sm' 
                : 'text-[#7a7a7a] hover:text-yellow-600'
            }`}
            onClick={() => handlePanelClick('opportunities')}
          >
            <div className="flex items-center justify-center mb-1">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-xs">Opportunities</span>
          </button>
        </div>

        {/* User badge at bottom */}
        <div className="mt-auto">
          <div className="relative mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-[#0aa2c0] to-[#0077a8] rounded-full flex items-center justify-center text-white font-bold text-sm">
              E
            </div>
            <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded text-[10px] font-bold">
              PRO
            </div>
          </div>
          <div className="w-3 h-3 rounded-full bg-orange-500 mx-auto"></div>
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