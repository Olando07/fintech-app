import { useRouteError, Link } from "react-router";
import { AlertCircle, Home } from "lucide-react";

export default function ErrorPage() {
	const error = useRouteError();

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-950 text-white">
			<div className="text-center space-y-6 p-8">
				<AlertCircle className="mx-auto text-red-500" size={64} />
				<h1 className="text-4xl font-bold">Oops!</h1>
				<p className="text-gray-400 text-lg">{error?.statusText || error?.message || "Something went wrong"}</p>
				<Link to="/" className="inline-flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg transition-colors">
					<Home size={20} />
					Back to Home
				</Link>
			</div>
		</div>
	);
}
