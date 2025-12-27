import React from "react";
import { useState } from "react";
import { Search } from "lucide-react";
import TransactionItem from "@/components/TransactionItem";
import CategoryFilter from "@/components/CategoryFilter";
import { transactions } from "@/lib/mockData";

export default function Transactions() {
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("all");

	const categories = ["all", "dining", "shopping", "transport", "bills", "income"];

	console.log("categories array:", categories);
	console.log("categories length:", categories.length);
	console.log("Is categories an array?", Array.isArray(categories));

	const filteredTransactions = transactions.filter((tx) => {
		const matchesSearch = tx.description.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesCategory = selectedCategory === "all" || tx.category.toLowerCase();
		return matchesSearch && matchesCategory;
	});

	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-3xl font-bold text-white mb-2">Transactions</h1>
				<p className="text-gray-400">View and manage all your transactions</p>
			</div>

			<div className="flex flex-col sm:flex-row gap-4">
				<div className="flex-1 relative">
					<Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
					<input
						type="text"
						placeholder="Search transactions..."
						value={searchTerm}
						onChange={(e) => {
							setSearchTerm(e.target.value);
						}}
						className="w-full bg-gray-900 border border-gray-800 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
					/>
				</div>

				<div className="relative">
					<CategoryFilter value={selectedCategory} onChange={setSelectedCategory} categories={categories}></CategoryFilter>
				</div>
			</div>

			<div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
				{filteredTransactions.length === 0 ? (
					<div className="p-12 text-center text-gray-400">No transactions found</div>
				) : (
					<div className="divide-y divide-gray-800">
						{filteredTransactions.map((tx) => (
							<div key={tx.id} className="p-6">
								<TransactionItem transaction={tx} />
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
