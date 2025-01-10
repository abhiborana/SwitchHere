/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				background: "var(--background)",
				foreground: "var(--foreground)",
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
		},
	},
	plugins: [
		require("tailwindcss-animate"),
		// Uncomment if using Tailwind Typography
		// require("@tailwindcss/typography"),
		function ({ addUtilities }) {
			addUtilities(
				{
					".scrollbar-hide": {
						/* IE and Edge */
						"-ms-overflow-style": "none",
						/* Firefox */
						"scrollbar-width": "none",
						/* Safari and Chrome */
						"&::-webkit-scrollbar": {
							display: "none",
						},
					},
					".scrollbar": {
						/* IE and Edge */
						"-ms-overflow-style": "auto",
						/* Firefox */
						"scrollbar-width": "auto",
						/* Safari and Chrome */
						"&::-webkit-scrollbar": {
							display: "block",
							width: "6px",
							height: "6px",
						},
						"&::-webkit-scrollbar-track": {
							background: "transparent",
						},
						"&::-webkit-scrollbar-thumb": {
							background: "#8880",
							borderRadius: "35px",
						},
						"&::-webkit-scrollbar-thumb:hover": {
							background: "#555",
						},
						"&::-webkit-scrollbar-corner": {
							background: "transparent",
						},
					},
					".scrollbar:hover": {
						"&::-webkit-scrollbar-thumb": {
							background: "#888",
						},
					},
				},
				["responsive"]
			)
		},
	],
}
