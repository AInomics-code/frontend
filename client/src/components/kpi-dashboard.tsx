import { BarChart2, TrendingUp, AlertTriangle, Users, Package, DollarSign, Target, Zap, UserX } from "lucide-react";

export function KPIDashboard() {
  return (
    <div className="px-6 py-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Panel de KPI – La Doña (Top 9 Métricas)</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Performance Section */}
        <div className="bg-white rounded-xl shadow-md p-4">
          <div className="flex items-center gap-2 mb-1">
            <BarChart2 size={14} className="text-gray-400" />
            <h4 className="text-sm text-green-600 font-semibold">Ventas vs Objetivo</h4>
          </div>
          <p className="text-2xl font-bold text-gray-900">82%</p>
          <p className="text-xs text-gray-500">Progreso objetivo mensual</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-4">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp size={14} className="text-gray-400" />
            <h4 className="text-sm text-green-600 font-semibold">SKU Más Vendido (Esta Semana)</h4>
          </div>
          <p className="text-base font-semibold text-gray-800">SKU 183 – Bananas</p>
          <p className="text-xs text-gray-500">Mejor producto por región</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-4">
          <div className="flex items-center gap-2 mb-1">
            <Target size={14} className="text-gray-400" />
            <h4 className="text-sm text-green-600 font-semibold">Progreso Objetivo Cliente</h4>
          </div>
          <p className="text-base font-semibold text-gray-800">Chiriquí +8% above target</p>
          <p className="text-xs text-gray-500">Cuentas principales vs sus objetivos</p>
        </div>

        {/* Risks Section */}
        <div className="bg-white rounded-xl shadow-md p-4">
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle size={14} className="text-gray-400" />
            <h4 className="text-sm text-red-600 font-semibold">Pedidos Pendientes Hoy</h4>
          </div>
          <p className="text-base font-semibold text-gray-800">28 órdenes pendientes</p>
          <p className="text-xs text-gray-500">Más afectado: Super Xtra</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-4">
          <div className="flex items-center gap-2 mb-1">
            <Package size={14} className="text-gray-400" />
            <h4 className="text-sm text-red-600 font-semibold">Productos Agotados</h4>
          </div>
          <p className="text-base font-semibold text-gray-800">14 artículos urgentes</p>
          <p className="text-xs text-gray-500">Brechas críticas de cumplimiento</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-4">
          <div className="flex items-center gap-2 mb-1">
            <DollarSign size={14} className="text-gray-400" />
            <h4 className="text-sm text-red-600 font-semibold">Clientes Vencidos (120+ Días)</h4>
          </div>
          <p className="text-base font-semibold text-gray-800">$24,300 sin pagar</p>
          <p className="text-xs text-gray-500">Cuentas de alto riesgo marcadas</p>
        </div>

        {/* Opportunities Section */}
        <div className="bg-white rounded-xl shadow-md p-4">
          <div className="flex items-center gap-2 mb-1">
            <Zap size={14} className="text-gray-400" />
            <h4 className="text-sm text-yellow-500 font-semibold">Promo ROI (Scanner/Tonga)</h4>
          </div>
          <p className="text-base font-semibold text-gray-800">+26% ROI</p>
          <p className="text-xs text-gray-500">Campaign effectiveness</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-4">
          <div className="flex items-center gap-2 mb-1">
            <UserX size={14} className="text-gray-400" />
            <h4 className="text-sm text-yellow-500 font-semibold">Inactive Clients (30+ Days)</h4>
          </div>
          <p className="text-base font-semibold text-gray-800">17 accounts</p>
          <p className="text-xs text-gray-500">Ready for reactivation</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-4">
          <div className="flex items-center gap-2 mb-1">
            <Users size={14} className="text-gray-400" />
            <h4 className="text-sm text-yellow-500 font-semibold">Rep Underperformance</h4>
          </div>
          <p className="text-base font-semibold text-gray-800">3 reps below 70%</p>
          <p className="text-xs text-gray-500">Field team support needed</p>
        </div>
      </div>
    </div>
  );
}