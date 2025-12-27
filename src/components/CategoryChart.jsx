import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

export default function CategoryChart({ data }) {
	return (
		<div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
			<h2 className="text-xl font-bold text-white mb-6">Spending by Category</h2>
			<ResponsiveContainer width="100%" height={400}>
				<PieChart>
					<Pie data={data} cx="50%" cy="50%" labelLine={false} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} outerRadius={120} fill="#8884d8" dataKey="value">
						{data.map((entry, index) => (
							<Cell key={`cell-${index}`} fill={entry.color} />
						))}
					</Pie>
					<Tooltip
						contentStyle={{
							backgroundColor: "#fff",
							border: "1px solid #374151",
							borderRadius: "8px",
						}}
					/>
				</PieChart>
			</ResponsiveContainer>
		</div>
	);
}
