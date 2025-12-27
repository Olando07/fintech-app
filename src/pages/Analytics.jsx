import CategoryChart from "@/components/CategoryChart";
import { categoryData } from "@/lib/mockData";

export default function Analytics() {
	const totalSpending = categoryData.reduce((sum, cat) => sum + cat.value, 0);

	return (
		<div className="space-y-8">
			<div>
				<h1 className="text-3xl font-bold text-white mb-2">Analytics</h1>
				<p className="text-gray-400">Detailed breakdown of your spending patterns</p>
			</div>

			<div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
				<h2 className="text-xl font-bold text-white mb-2">Total Monthly Spending</h2>
				<div className="text-4xl font-bold text-purple-500">${totalSpending.toFixed(2)}</div>
			</div>

			<CategoryChart data={categoryData} />

			<div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
				<h2 className="text-xl font-bold text-white mb-6">Category Details</h2>
				<div className="space-y-4">
					{categoryData.map((category, index) => (
						<div key={index}>
							<div className="flex items-center justify-between mb-2">
								<span className="text-white font-medium">{category.name}</span>
								<span className="text-white font-bold">${category.value.toFixed(2)}</span>
							</div>
							<div className="w-full bg-gray-800 rounded-full h-2">
								<div
									className="h-2 rounded-full transition-all"
									style={{
										width: `${(category.value / totalSpending) * 100}%`,
										backgroundColor: category.color,
									}}
								/>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
