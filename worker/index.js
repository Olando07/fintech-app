export default {
	async fetch(request, env) {
		const corsHeaders = {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "GET, POST, OPTIONS",
			"Access-Control-Allow-Headers": "Content-Type",
		};

		if (request.method === "OPTIONS") {
			return new Response(null, { headers: corsHeaders });
		}

		const url = new URL(request.url);

		try {
			if (url.pathname === "/api/chat") {
				return handleGroqRequest(request, env, corsHeaders);
			}

			if (url.pathname === "/api/track") {
				return handleN8nRequest(request, env, corsHeaders);
			}

			if (url.pathname === "/api/health") {
				return new Response(JSON.stringify({ status: "ok" }), {
					headers: { ...corsHeaders, "Content-Type": "application/json" },
				});
			}

			return new Response("Not Found", { status: 404, headers: corsHeaders });
		} catch (error) {
			return new Response(JSON.stringify({ error: error.message }), {
				status: 500,
				headers: { ...corsHeaders, "Content-Type": "application/json" },
			});
		}
	},
};

async function handleGroqRequest(request, env, corsHeaders) {
	if (request.method !== "POST") {
		return new Response("Method not allowed", { status: 405, headers: corsHeaders });
	}

	const body = await request.json();

	const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
		method: "POST",
		headers: {
			Authorization: `Bearer ${env.GROQ_API_KEY}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ 
			model: "llama-3.3-70b-versatile",
			messages: body.messages,
			temperature: body.temperature || 0.7,
			max_tokens: body.max_tokens || 1024,
		}),
	});

	const data = await response.text();

	return new Response(data, {
		status: response.status,
		headers: { ...corsHeaders, "Content-Type": "application/json" },
	});
}

async function handleN8nRequest(request, env, corsHeaders) {
	if (request.method !== "POST") {
		return new Response("Method not allowed", { status: 405, headers: corsHeaders });
	}

	const body = await request.json();

	const response = await fetch(env.N8N_WEBHOOK_URL, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(body),
	});

	return new Response(JSON.stringify({ success: response.ok }), {
		status: response.status,
		headers: { ...corsHeaders, "Content-Type": "application/json" },
	});
}
