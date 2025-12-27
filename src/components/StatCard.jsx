import { TrendingUp, TrendingDown } from "lucide-react";

export default function StatCard({ label, value, change, trend, icon: Icon }) {
	return (
		<div className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-purple-500/50 transition-colors">
			<div className="flex items-center justify-between mb-2">
				<span className="text-gray-400 text-sm">{label}</span>
				{trend === "up" ? <TrendingUp className="text-green-500" size={16} /> : <TrendingDown className="text-red-500" size={16} />}
			</div>
			<div className="text-2xl font-bold text-white mb-1">{value}</div>
			<div className={`text-sm ${trend === "up" ? "text-green-500" : "text-red-500"}`}>{change}</div>
		</div>
	);
}
