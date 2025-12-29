const WORKER_URL = import.meta.env.VITE_WORKER_URL;

/**
 * Chat with Groq AI using Llama 3.1
 * @param {Array} messages - Array oof message objects
 * @returns {Promise<string>} AI response text
 */
export async function chatWithGroq(messages) {
	if (!WORKER_URL) {
		console.error("❌ GROQ_API_KEY not found in environment variables");
		throw new Error("Groq API key is not configured. Please add VITE_GROQ_API_KEY to your .env.local file");
	}

	try {
		const response = await fetch(`${WORKER_URL}/api/chat`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				model: "llama-3.3-70b-versatile",
				messages: [
					{
						role: "system",
						content: `You are a helpful banking and financial assistant. You help users understand their spending, provide financial advice, and answer questions about personal finance. Be concise, friendly, and informative.
						You are analyzing a demo banking account with the following information:

ACCOUNT OVERVIEW:
- Total Balance: $24,580.00 (up 12.5%)
- Monthly Spending: $3,240.00 (down 8.2%)
- Savings Goal Progress: 68% (up 5.0%)
- Credit Score: 742 (up 12 points)

SPENDING BY CATEGORY (This Month):
- Dining: $850.00
- Shopping: $620.00
- Transport: $340.00
- Bills: $1,200.00

MONTHLY SPENDING TREND:
- January: $2,400
- February: $1,398
- March: $3,800
- April: $2,908
- May: $4,800
- June: $3,490

RECENT TRANSACTIONS:
- Starbucks Coffee: -$45.00 (Dining, Today)
- Monthly Salary: +$3,200.00 (Income, Yesterday)
- Amazon Purchase: -$124.99 (Shopping, 2 days ago)
- Uber Ride: -$18.50 (Transport, 3 days ago)
- Netflix Subscription: -$15.99 (Bills, 4 days ago)

Use this information to provide personalized insights and advice.`,
					},
					...messages,
				],
			}),
		});

		if (!response) {
			const error = await response.json();
			throw new Error(error.error || "Groq API request failed");
		}

		const data = await response.json();
		return data.choices[0].message.content;
	} catch (error) {
		console.error("❌ Error calling Groq:", error);
		throw error;
	}
}
