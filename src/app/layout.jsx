import Navbar from "@/components/organisms/Navbar"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "next-themes"
import { Geist, Geist_Mono } from "next/font/google"
import { Toaster } from "sonner"
import "./globals.css"

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
})

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
})

export const metadata = {
	title: "SwithHere.in - Ultimate companion to swith/upgrade your career",
	description:
		"SwitchHere.in is your ultimate career transformation companion, designed to help anyone switch careers or upskill seamlessly. With just your goal, our AI-powered platform generates a personalized roadmap, breaking it into smaller, achievable tasks tailored to your timeline and preferences.",
}

export default function RootLayout({ children }) {
	return (
		<html
			lang="en"
			suppressHydrationWarning
		>
			<body
				className={cn(
					"flex min-h-dvh w-screen flex-col overflow-x-hidden bg-neutral-50 text-gray-950 antialiased scrollbar dark:bg-neutral-950 dark:text-gray-50",
					geistSans.variable,
					geistMono.variable
				)}
			>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<Navbar />
					<main className="flex h-full w-full flex-1 flex-col">
						{children}
					</main>
					<Toaster
						richColors
						theme="light"
					/>
				</ThemeProvider>
			</body>
		</html>
	)
}
