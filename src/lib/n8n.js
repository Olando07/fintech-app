const WORKER_URL = import.meta.env.VITE_WORKER_URL

export async function trackEvent(eventType, data = {}) {
    if (!WORKER_URL) {
        console.log('N8N webhook is not configured')
        return
    }

    function getBrowserName(userAgent) {
		if (userAgent.includes("Edg")) return "Edge";
		if (userAgent.includes("Chrome") && !userAgent.includes("Edg")) return "Chrome";
		if (userAgent.includes("Firefox")) return "Firefox";
		if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) return "Safari";
		if (userAgent.includes("Opera") || userAgent.includes("OPR")) return "Opera";
		return "Unknown";
	}

    try {
        const userAgent = navigator.userAgent;

        const payload = {
            event: eventType,
            timestamp: new Date(),
            page: data.page || window.location.hash.slice(1) || '/',
            url: window.location.href,
            browser: getBrowserName(userAgent),
            message: data.mesage || '',
            ...data,
        }

        const response = await fetch (`${WORKER_URL}/api/track`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })

        if (response.ok) {
            console.log('✅ Event tracked successfully:', eventType)
        } else {
            console.log("⚠️ Webhook responded with status:", response.status);
        }
    } catch (error) {
        console.error("❌ Webhook error:", error);
    }
}

export function trackPageVisit(pageName) {
    trackEvent("page_visit", { page: pageName });
}

