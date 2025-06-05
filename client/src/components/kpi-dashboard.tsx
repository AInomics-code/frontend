import { BarChart2, TrendingUp, AlertTriangle, Users, Package, DollarSign, Target, Zap, UserX } from "lucide-react";

export function KPIDashboard() {
  return (
    <div className="px-6 py-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">KPI Dashboard – La Doña (Top 9 Metrics)</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Performance Section */}
        <div className="bg-white rounded-xl shadow-md p-4">
          <div className="flex items-center gap-2 mb-1">
            <BarChart2 size={16} className="text-green-600" />
            <h4 className="text-sm text-green-600 font-semibold">Sales vs Target</h4>
          </div>
          <p className="text-2xl font-bold text-gray-900">82%</p>
          <p className="text-xs text-gray-500">Monthly goal progress</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-4">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp size={16} className="text-green-600" />
            <h4 className="text-sm text-green-600 font-semibold">Top-Selling SKU (This Week)</h4>
          </div>
          <p className="text-base font-semibold text-gray-800">SKU 183 – Bananas</p>
          <p className="text-xs text-gray-500">Best product by region</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-4">
          <div className="flex items-center gap-2 mb-1">
            <Target size={16} className="text-green-600" />
            <h4 className="text-sm text-green-600 font-semibold">Client Goal Progress</h4>
          </div>
          <p className="text-base font-semibold text-gray-800">Chiriquí +8% above target</p>
          <p className="text-xs text-gray-500">Top accounts vs their goals</p>
        </div>

        {/* Risks Section */}
        <div className="bg-white rounded-xl shadow-md p-4">
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle size={16} className="text-red-600" />
            <h4 className="text-sm text-red-600 font-semibold">Backorders Today</h4>
          </div>
          <p className="text-base font-semibold text-gray-800">28 orders pending</p>
          <p className="text-xs text-gray-500">Most affected: Super Xtra</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-4">
          <div className="flex items-center gap-2 mb-1">
            <Package size={16} className="text-red-600" />
            <h4 className="text-sm text-red-600 font-semibold">Out-of-Stock Products</h4>
          </div>
          <p className="text-base font-semibold text-gray-800">14 urgent items</p>
          <p className="text-xs text-gray-500">Critical fulfillment gaps</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-4">
          <div className="flex items-center gap-2 mb-1">
            <DollarSign size={16} className="text-red-600" />
            <h4 className="text-sm text-red-600 font-semibold">Overdue Clients (120+ Days)</h4>
          </div>
          <p className="text-base font-semibold text-gray-800">$24,300 unpaid</p>
          <p className="text-xs text-gray-500">High-risk accounts flagged</p>
        </div>

        {/* Opportunities Section */}
        <div className="bg-white rounded-xl shadow-md p-4">
          <div className="flex items-center gap-2 mb-1">
            <Zap size={16} className="text-yellow-500" />
            <h4 className="text-sm text-yellow-500 font-semibold">Promo ROI (Scanner/Tonga)</h4>
          </div>
          <p className="text-base font-semibold text-gray-800">+26% ROI</p>
          <p className="text-xs text-gray-500">Campaign effectiveness</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-4">
          <div className="flex items-center gap-2 mb-1">
            <UserX size={16} className="text-yellow-500" />
            <h4 className="text-sm text-yellow-500 font-semibold">Inactive Clients (30+ Days)</h4>
          </div>
          <p className="text-base font-semibold text-gray-800">17 accounts</p>
          <p className="text-xs text-gray-500">Ready for reactivation</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-4">
          <div className="flex items-center gap-2 mb-1">
            <Users size={16} className="text-yellow-500" />
            <h4 className="text-sm text-yellow-500 font-semibold">Rep Underperformance</h4>
          </div>
          <p className="text-base font-semibold text-gray-800">3 reps below 70%</p>
          <p className="text-xs text-gray-500">Field team support needed</p>
        </div>
      </div>
    </div>
  );
}