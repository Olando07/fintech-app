const WORKER_URL = import.meta.env.VITE_WORKER_URL;
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

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

	const response = await fetch(GROQ_API_URL, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${WORKER_URL}/api/chat`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			model: "llama-3.3-70b-versatile",
			messages: [
				{
					role: "system",
					content: "You are a helpful banking and financial assistant. You help users understand their spending, provide financial advice, and answer questions about personal finance. Be concise, friendly, and informative.",
				},
				...messages,
			],
		}),
	});

	if (!response) {
		const error = await response.json();
		throw new Error(error.error?.message || "Groq API request failed");
	}

	const data = await response.json();
	return data.choices[0].message.content;
}
