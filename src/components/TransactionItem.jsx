import { CreditCard } from "lucide-react";

export default function TransactionItem({ transaction }) {
	const { description, amount, category, date } = transaction;

	return (
		<div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
			<div className="flex items-center gap-4">
				<div className={`p-2 rounded-lg ${amount > 0 ? "bg-green-500/10" : "bg-purple-500/10"}`}>
					<CreditCard size={20} className={amount > 0 ? "text-green-500" : "text-purple-500"} />
				</div>
				<div>
					<div className="font-medium text-white">{description}</div>
					<div className="text-sm text-gray-400">
						{category} • {date}
					</div>
				</div>
			</div>
			<div className={`font-bold ${amount > 0 ? "text-green-500" : "text-white"}`}>
				{amount > 0 ? "+" : ""}${Math.abs(amount).toFixed(2)}
			</div>
		</div>
	);
}
