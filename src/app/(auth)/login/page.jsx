"use client"
import { Button } from "@/components/ui/button"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { auth } from "@/lib/firebase"
import { zodResolver } from "@hookform/resolvers/zod"
import {
	createUserWithEmailAndPassword,
	GoogleAuthProvider,
	signInWithEmailAndPassword,
	signInWithPopup,
} from "firebase/auth"
import { Eye, EyeOff } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

// Define base schema for common fields
const baseSchema = {
	email: z.string().email("Invalid email address"),
	password: z.string().min(6, "Password must be at least 6 characters long"),
}

// Login schema
const loginSchema = z.object(baseSchema)

// Signup schema with confirm password
const signupSchema = z
	.object({
		...baseSchema,
		confirmPassword: z.string(),
	})
	.refine(data => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ["confirmPassword"],
	})

export default function AuthPage() {
	const [showPassword, setShowPassword] = useState(false)
	const [showConfirmPassword, setShowConfirmPassword] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState("")
	const [isLoginMode, setIsLoginMode] = useState(true)
	const router = useRouter()

	const googleProvider = new GoogleAuthProvider()

	// Initialize form with correct schema based on mode
	const form = useForm({
		resolver: zodResolver(isLoginMode ? loginSchema : signupSchema),
		defaultValues: {
			email: "",
			password: "",
			confirmPassword: "",
		},
	})

	// Reset form and validation when switching modes
	useEffect(() => {
		form.reset()
		setError("")
	}, [isLoginMode, form])

	const handleGoogleLogin = async () => {
		setIsLoading(true)
		setError("")

		try {
			const result = await signInWithPopup(auth, googleProvider)
			router.push("/dashboard")
		} catch (error) {
			console.error("Google sign-in error:", error)
			if (error.code === "auth/popup-closed-by-user") {
				setError("Sign-in cancelled. Please try again.")
			} else if (error.code === "auth/popup-blocked") {
				setError(
					"Pop-up was blocked. Please allow pop-ups for this site."
				)
			} else {
				setError("Failed to sign in with Google. Please try again.")
			}
		} finally {
			setIsLoading(false)
		}
	}

	const onSubmit = async values => {
		setIsLoading(true)
		setError("")

		try {
			if (isLoginMode) {
				// Handle Login
				const userCredential = await signInWithEmailAndPassword(
					auth,
					values.email,
					values.password
				)
				console.log("Login successful:", userCredential.user)
			} else {
				// Handle Signup
				const userCredential = await createUserWithEmailAndPassword(
					auth,
					values.email,
					values.password
				)
				console.log("Signup successful:", userCredential.user)
			}
			router.push("/dashboard")
		} catch (error) {
			console.error("Auth error:", error)
			switch (error.code) {
				case "auth/user-not-found":
					setError("No user found with this email address")
					break
				case "auth/wrong-password":
					setError("Invalid password")
					break
				case "auth/too-many-requests":
					setError("Too many failed attempts. Please try again later")
					break
				case "auth/invalid-credential":
					setError("Invalid email or password")
					break
				case "auth/email-already-in-use":
					setError("Email already registered. Please login instead")
					break
				default:
					setError(
						`Failed to ${isLoginMode ? "login" : "signup"}. Please try again`
					)
			}
		} finally {
			setIsLoading(false)
		}
	}

	const toggleMode = () => {
		setIsLoginMode(!isLoginMode)
	}

	return (
		<div className="flex min-h-screen w-full flex-col md:flex-row">
			{/* Left side (hidden on mobile) */}
			<div className="relative hidden w-1/2 flex-col justify-between border-r p-8 text-white md:flex">
				<Image
					src="/logo.png"
					fill
					alt="Logo"
					className="self-start"
				/>
			</div>

			{/* Right side (auth form) */}
			<div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:px-8">
				<div className="text-center sm:mx-auto sm:w-full sm:max-w-md">
					<Image
						src="/logo.png"
						width={140}
						height={140}
						alt="Logo"
						className="mx-auto md:hidden"
					/>
					<h1 className="mt-4 text-2xl font-bold">
						{isLoginMode ? "Login" : "Sign Up"}
					</h1>
				</div>

				<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xs">
					{error && (
						<div className="mb-4 rounded-md bg-red-50 p-4 text-sm text-red-700">
							{error}
						</div>
					)}

					{/* Google Sign In Button */}
					<Button
						type="button"
						variant="outline"
						className="mb-6 flex w-full items-center justify-center gap-2"
						onClick={handleGoogleLogin}
						disabled={isLoading}
					>
						<svg
							width="1em"
							height="1em"
							viewBox="0 0 256 262"
							xmlns="http://www.w3.org/2000/svg"
							preserveAspectRatio="xMidYMid"
						>
							<path
								d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
								fill="#4285F4"
							/>
							<path
								d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
								fill="#34A853"
							/>
							<path
								d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
								fill="#FBBC05"
							/>
							<path
								d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
								fill="#EB4335"
							/>
						</svg>
						{isLoading ? "Signing in..." : "Sign in with Google"}
					</Button>

					<div className="relative mb-6">
						<div className="absolute inset-0 flex items-center">
							<div className="w-full border-t border-gray-300" />
						</div>
						<div className="relative flex justify-center text-sm">
							<span className="bg-white px-2 text-gray-500">
								Or continue with
							</span>
						</div>
					</div>

					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="space-y-6"
						>
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input
												type="email"
												autoComplete="email"
												placeholder="example@gmail.com"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<div className="relative mt-1">
												<Input
													type={
														showPassword
															? "text"
															: "password"
													}
													autoComplete={
														isLoginMode
															? "current-password"
															: "new-password"
													}
													placeholder="******"
													{...field}
												/>
												<button
													type="button"
													onClick={() =>
														setShowPassword(
															!showPassword
														)
													}
													className="absolute inset-y-0 right-0 flex items-center pr-3"
													tabIndex={-1}
												>
													{showPassword ? (
														<EyeOff className="h-5 w-5 text-gray-400" />
													) : (
														<Eye className="h-5 w-5 text-gray-400" />
													)}
												</button>
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							{!isLoginMode && (
								<FormField
									control={form.control}
									name="confirmPassword"
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												Confirm Password
											</FormLabel>
											<FormControl>
												<div className="relative mt-1">
													<Input
														type={
															showConfirmPassword
																? "text"
																: "password"
														}
														autoComplete="new-password"
														placeholder="******"
														{...field}
													/>
													<button
														type="button"
														onClick={() =>
															setShowConfirmPassword(
																!showConfirmPassword
															)
														}
														className="absolute inset-y-0 right-0 flex items-center pr-3"
														tabIndex={-1}
													>
														{showConfirmPassword ? (
															<EyeOff className="h-5 w-5 text-gray-400" />
														) : (
															<Eye className="h-5 w-5 text-gray-400" />
														)}
													</button>
												</div>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							)}

							<Button
								type="submit"
								className="w-full"
								disabled={isLoading}
							>
								{isLoading
									? isLoginMode
										? "Logging in..."
										: "Signing up..."
									: isLoginMode
										? "Login"
										: "Sign Up"}
							</Button>

							<div className="text-center text-sm">
								<button
									type="button"
									onClick={toggleMode}
									className="text-blue-600 hover:text-blue-500 hover:underline"
								>
									{isLoginMode
										? "Don't have an account? Sign up"
										: "Already have an account? Login"}
								</button>
							</div>
						</form>
					</Form>
				</div>
			</div>
		</div>
	)
}
