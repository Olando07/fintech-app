import { useState, useEffect, useRef } from "react";
import { Send, Sparkles } from "lucide-react";
import { chatWithGroq } from "@/lib/groq";
import { trackEvent } from "@/lib/n8n";

export default function Chat() {
	const [messages, setMessages] = useState([
		{
			role: "assistant",
			content: "Hi! I'm your AI banking assistant. Ask me about spending, budgets, or financial advice!",
		},
	]);
	const [input, setInput] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const endRef = useRef(null);

	useEffect(() => {
		endRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	const handleSend = async () => {
		if (!input.trim() || isLoading) return;

		const userMessage = { role: "user", content: input };
		setMessages((prev) => [...prev, userMessage]);
		setInput("");
		setIsLoading(true);

		// Track with n8n
		trackEvent("chat_message", { page: "Chat", message: input });

		try {
			const response = await chatWithGroq([...messages, userMessage]);
			setMessages((prev) => [...prev, { role: "assistant", content: response }]);
		} catch (error) {
			console.error("Chat error:", error);
			setMessages((prev) => [...prev, { role: "assistant", content: "Sorry, I encountered an error. Please try again." }]);
		} finally {
			setIsLoading(false);
		}
	};

	const handleKeyPress = (e) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSend();
		}
	};

	return (
		<div className="flex flex-col h-[calc(100vh-8rem)]">
			<div className="mb-6">
				<h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-2">
					<Sparkles className="text-purple-500" />
					AI Assistant
				</h1>
				<p className="text-gray-400">Powered by Groq & Llama 3.3</p>
			</div>

			<div className="flex-1 overflow-y-auto bg-gray-900 border border-gray-800 rounded-lg p-6 mb-4">
				<div className="space-y-4">
					{messages.map((msg, i) => (
						<div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
							<div className={`max-w-[80%] p-4 rounded-lg ${msg.role === "user" ? "bg-purple-500 text-white" : "bg-gray-800 text-gray-100"}`}>{msg.content}</div>
						</div>
					))}

					{isLoading && (
						<div className="flex justify-start">
							<div className="bg-gray-800 p-4 rounded-lg">
								<div className="flex items-center gap-2">
									<div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" />
									<div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
									<div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
								</div>
							</div>
						</div>
					)}

					<div ref={endRef} />
				</div>
			</div>

			<div className="flex gap-2">
				<textarea value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyPress} placeholder="Ask me anything about your finances..." rows={1} className="flex-1 bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 resize-none" />
				<button onClick={handleSend} disabled={isLoading || !input.trim()} className="bg-purple-500 hover:bg-purple-600 disabled:bg-gray-800 text-white px-6 py-3 rounded-lg transition-colors flex items-center gap-2">
					<Send size={20} />
				</button>
			</div>
		</div>
	);
}
