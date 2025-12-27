import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export default function CategoryFilter({ value, onChange, categories }) {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef(null);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setIsOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<div ref={dropdownRef} className="relative min-w-[150px]">
			{/* Button that shows current selection */}
			<button type="button" onClick={() => setIsOpen(!isOpen)} className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 text-white hover:border-purple-500 transition-colors flex items-center justify-between">
				<span>{value.charAt(0).toUpperCase() + value.slice(1)}</span>
				<ChevronDown size={20} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
			</button>

			{/* Dropdown menu */}
			{isOpen && (
				<div className="absolute top-full left-0 right-0 mt-2 bg-transparent border border-transparent shadow-lg overflow-hidden z-50">
					{categories.map((cat) => (
						<button
							key={cat}
							type="button"
							onClick={() => {
								onChange(cat);
								setIsOpen(false);
							}}
							className={`w-full px-4 py-3 text-left transition-colors ${cat === value ? "text-white" : "text-gray-300 hover:bg-gray-800"}`}
						>
							{cat.charAt(0).toUpperCase() + cat.slice(1)}
						</button>
					))}
				</div>
			)}
		</div>
	);
}
