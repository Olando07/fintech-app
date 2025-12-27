import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function SpendingChart({ data }) {
	return (
		<div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
			<h2 className="text-xl font-bold text-white mb-6">Monthly Spending</h2>
			<ResponsiveContainer width="100%" height={300}>
				<BarChart data={data}>
					<XAxis dataKey="month" stroke="#6b7280" />
					<YAxis stroke="#6b7280" />
					<Tooltip
						contentStyle={{
							backgroundColor: "#1f2937",
							border: "1px solid #374151",
							borderRadius: "8px",
						}}
					/>
					<Bar dataKey="amount" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
}
