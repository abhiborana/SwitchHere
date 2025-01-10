"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import Image from "next/image"
import Link from "next/link"
import { Button } from "../ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu"

const Navbar = () => {
	const { setTheme } = useTheme()

	return (
		<nav className="sticky top-0 flex w-full items-center justify-between border-b bg-neutral-50/50 px-4 py-2 shadow backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/50">
			<Link
				href="/"
				className="inline-flex items-center gap-2"
			>
				<Image
					src="/logo.png"
					alt="SwitchHere.in"
					width={40}
					height={40}
				/>
				<h1 className="text-xl font-bold tracking-wide text-neutral-700 dark:text-neutral-300">
					SwitchHere
				</h1>
			</Link>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="outline"
						size="icon"
					>
						<Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
						<Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
						<span className="sr-only">Toggle theme</span>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuItem onClick={() => setTheme("light")}>
						Light
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => setTheme("dark")}>
						Dark
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => setTheme("system")}>
						System
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</nav>
	)
}

export default Navbar
