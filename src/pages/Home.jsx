import React from "react";
import StatCard from "@/components/StatCard";
import SpendingChart from "@/components/SpendingChart";
import TransactionItem from "@/components/TransactionItem";
import { statsData, spendingData, recentTransactions } from "@/lib/mockData";

export default function Home() {
	return (
		<div>
			<div className="mb-6">
				<h1 className="text-3xl font-bold mb-2">Dashboard</h1>
				<p className="text-gray-400">Welcome back! Here is your financial overview.</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				{statsData.map((stat, index) => {
					<StatCard key={index} {...stat} />;
				})}
			</div>

			<SpendingChart data={spendingData} />

			<div className="bg-gray-900 border border-gray-800 rounded-lg p-6 mt-8">
				<h2 className="text-xl font-bold text-white mb-6">Recent Transactions</h2>
				<div className="space-y-4">
					{recentTransactions.map((tx) => (
						<TransactionItem key={tx.id} transaction={tx} />
					))}
				</div>
			</div>
		</div>
	);
}
