"use client"

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
	ArrowRight,
	Award,
	BookOpen,
	FileText,
	Github,
	Layout,
	LineChart,
	Linkedin,
	Star,
	Twitter,
	X,
	Zap,
} from "lucide-react"
import { useState } from "react"

const LandingPage = () => {
	const [isAnnual, setIsAnnual] = useState(true)
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

	const testimonials = [
		{
			name: "Sarah Johnson",
			role: "Former Marketing Manager, Now UX Designer",
			content:
				"SwitchHere transformed my career journey with its AI-powered guidance and structured learning path.",
			company: "Design Co.",
			image: "/api/placeholder/64/64",
		},
		{
			name: "Michael Chen",
			role: "Ex-Teacher, Now Software Developer",
			content:
				"The personalized roadmap and progress tracking made my transition to tech seamless and achievable.",
			company: "Tech Solutions Inc.",
			image: "/api/placeholder/64/64",
		},
		{
			name: "Emily Rodriguez",
			role: "Finance to Data Science",
			content:
				"Thanks to SwitchHere's comprehensive resources, I landed my dream job in data science within 6 months.",
			company: "Data Analytics Pro",
			image: "/api/placeholder/64/64",
		},
	]

	const pricing = {
		monthly: [
			{
				title: "Starter",
				price: "29",
				description: "Perfect for career explorers",
				features: [
					"Basic career assessment",
					"Limited resource access",
					"Community support",
					"Email support",
				],
			},
			{
				title: "Professional",
				price: "79",
				description: "For serious career switchers",
				features: [
					"Everything in Starter",
					"AI-powered roadmap",
					"Premium resources",
					"1:1 mentor sessions",
					"Priority support",
				],
				popular: true,
			},
			{
				title: "Enterprise",
				price: "199",
				description: "For teams and organizations",
				features: [
					"Everything in Professional",
					"Custom learning paths",
					"Team analytics",
					"Dedicated success manager",
					"API access",
				],
			},
		],
		annual: [
			{
				title: "Starter",
				price: "19",
				description: "Perfect for career explorers",
				features: [
					"Basic career assessment",
					"Limited resource access",
					"Community support",
					"Email support",
				],
			},
			{
				title: "Professional",
				price: "59",
				description: "For serious career switchers",
				features: [
					"Everything in Starter",
					"AI-powered roadmap",
					"Premium resources",
					"1:1 mentor sessions",
					"Priority support",
				],
				popular: true,
			},
			{
				title: "Enterprise",
				price: "159",
				description: "For teams and organizations",
				features: [
					"Everything in Professional",
					"Custom learning paths",
					"Team analytics",
					"Dedicated success manager",
					"API access",
				],
			},
		],
	}

	const faqs = [
		{
			question: "How long does it typically take to switch careers?",
			answer: "The timeline varies depending on your target career and current skills. Most users successfully transition within 6-8 months following our structured program.",
		},
		{
			question: "Do you provide job placement assistance?",
			answer: "Yes, our Professional and Enterprise plans include job search strategy, interview preparation, and connections to hiring partners.",
		},
		{
			question: "Can I switch to any career path?",
			answer: "We support over 250+ career paths across technology, design, business, and more. Our AI assessment helps determine the most suitable paths based on your skills and goals.",
		},
		{
			question: "What if I'm not satisfied with the platform?",
			answer: "We offer a 30-day money-back guarantee. If you're not completely satisfied, we'll provide a full refund.",
		},
	]

	return (
		<div className="min-h-screen bg-slate-50">
			{/* Navbar */}
			{/* <nav className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md">
				<div className="container mx-auto flex items-center justify-between px-4 py-4">
					<div className="text-xl font-bold text-blue-600">
						SwitchHere
					</div>
					<div className="hidden space-x-6 md:flex">
						<a
							href="#features"
							className="text-slate-600 hover:text-blue-600"
						>
							Features
						</a>
						<a
							href="#how-it-works"
							className="text-slate-600 hover:text-blue-600"
						>
							How It Works
						</a>
						<a
							href="#pricing"
							className="text-slate-600 hover:text-blue-600"
						>
							Pricing
						</a>
						<a
							href="#testimonials"
							className="text-slate-600 hover:text-blue-600"
						>
							Success Stories
						</a>
					</div>
					<div className="hidden items-center gap-4 md:flex">
						<Button variant="ghost">Log in</Button>
						<Button className="bg-blue-600 hover:bg-blue-700">
							Start Free Trial
						</Button>
					</div>
					<Button
						variant="ghost"
						size="icon"
						className="md:hidden"
						onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
					>
						<Menu className="h-6 w-6" />
					</Button>
				</div>
			</nav> */}

			{/* Hero Section */}
			<div className="relative bg-white">
				<div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-slate-50 opacity-50"></div>
				<div className="container relative mx-auto px-4 py-20 md:py-32">
					<div className="mx-auto max-w-4xl text-center">
						<Badge
							variant="secondary"
							className="mb-6"
						>
							<Star className="mr-2 h-4 w-4" /> Trusted by 15,000+
							career switchers
						</Badge>
						{/* <h1 className="mb-6 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-6xl lg:text-7xl">
							Transform Your Career With AI-Powered Guidance
						</h1> */}
						<h1 className="mb-6 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-6xl lg:text-7xl">
							Transform Your Career With{" "}
							<span className="bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-500 bg-clip-text text-transparent">
								AI-Powered
							</span>{" "}
							Guidance
						</h1>
						<p className="mb-8 text-xl text-slate-600">
							Get a personalized roadmap, expert-curated
							resources, and proven frameworks to make your career
							transition successful. Join thousands who have
							already made the switch.
						</p>
						<div className="flex flex-col justify-center gap-4 sm:flex-row">
							<Button
								size="lg"
								className="bg-blue-600 hover:bg-blue-700"
							>
								Start Learning{" "}
								<ArrowRight className="ml-2 h-5 w-5" />
							</Button>
						</div>
						<div className="mt-12">
							<div className="mb-4 text-sm font-medium text-slate-500">
								Trusted by teams from
							</div>
							<div className="flex flex-wrap items-center justify-center gap-8">
								<img
									src="/api/placeholder/120/40"
									alt="Company Logo"
									className="h-8 opacity-60 grayscale transition-all hover:opacity-100 hover:grayscale-0"
								/>
								<img
									src="/api/placeholder/120/40"
									alt="Company Logo"
									className="h-8 opacity-60 grayscale transition-all hover:opacity-100 hover:grayscale-0"
								/>
								<img
									src="/api/placeholder/120/40"
									alt="Company Logo"
									className="h-8 opacity-60 grayscale transition-all hover:opacity-100 hover:grayscale-0"
								/>
								<img
									src="/api/placeholder/120/40"
									alt="Company Logo"
									className="h-8 opacity-60 grayscale transition-all hover:opacity-100 hover:grayscale-0"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Features Tabs Section */}
			<div
				id="features"
				className="container mx-auto px-4 py-20"
			>
				<div className="mb-12 text-center">
					<h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
						Everything You Need to Switch Careers
					</h2>
					<p className="mx-auto max-w-2xl text-lg text-slate-600">
						Our comprehensive platform provides all the tools and
						support you need to make a successful career transition.
					</p>
				</div>

				<Tabs
					defaultValue="roadmap"
					className="mx-auto max-w-4xl"
				>
					<TabsList className="grid w-full grid-cols-3">
						<TabsTrigger value="roadmap">AI Roadmap</TabsTrigger>
						<TabsTrigger value="resources">Resources</TabsTrigger>
						<TabsTrigger value="tracking">
							Progress Tracking
						</TabsTrigger>
					</TabsList>
					<TabsContent
						value="roadmap"
						className="mt-6"
					>
						<Card>
							<CardHeader>
								<CardTitle>
									Personalized Career Roadmap
								</CardTitle>
								<CardDescription>
									Get a customized learning path based on your
									goals and current skills
								</CardDescription>
							</CardHeader>
							<CardContent className="grid gap-6 md:grid-cols-2">
								<div className="space-y-4">
									<div className="flex items-start gap-3">
										<div className="rounded-lg bg-blue-100 p-2">
											<Layout className="h-6 w-6 text-blue-600" />
										</div>
										<div>
											<h4 className="font-semibold">
												Skill Gap Analysis
											</h4>
											<p className="text-sm text-slate-600">
												AI-powered assessment of your
												current skills vs. target role
												requirements
											</p>
										</div>
									</div>
									<div className="flex items-start gap-3">
										<div className="rounded-lg bg-blue-100 p-2">
											<Zap className="h-6 w-6 text-blue-600" />
										</div>
										<div>
											<h4 className="font-semibold">
												Dynamic Updates
											</h4>
											<p className="text-sm text-slate-600">
												Roadmap adapts based on your
												progress and learning speed
											</p>
										</div>
									</div>
								</div>
								<div className="relative aspect-video overflow-hidden rounded-lg bg-slate-100">
									<img
										src="/api/placeholder/600/400"
										alt="Roadmap Demo"
										className="object-cover"
									/>
								</div>
							</CardContent>
						</Card>
					</TabsContent>
					<TabsContent
						value="resources"
						className="mt-6"
					>
						<Card>
							<CardHeader>
								<CardTitle>
									Curated Learning Resources
								</CardTitle>
								<CardDescription>
									Access premium courses, tutorials, and
									projects from top platforms
								</CardDescription>
							</CardHeader>
							<CardContent className="grid gap-6 md:grid-cols-2">
								<div className="space-y-4">
									<div className="flex items-start gap-3">
										<div className="rounded-lg bg-blue-100 p-2">
											<BookOpen className="h-6 w-6 text-blue-600" />
										</div>
										<div>
											<h4 className="font-semibold">
												Premium Course Access
											</h4>
											<p className="text-sm text-slate-600">
												Hand-picked courses from leading
												educational platforms
											</p>
										</div>
									</div>
									<div className="flex items-start gap-3">
										<div className="rounded-lg bg-blue-100 p-2">
											<FileText className="h-6 w-6 text-blue-600" />
										</div>
										<div>
											<h4 className="font-semibold">
												Practice Projects
											</h4>
											<p className="text-sm text-slate-600">
												Real-world projects to build
												your portfolio
											</p>
										</div>
									</div>
								</div>
								<div className="relative aspect-video overflow-hidden rounded-lg bg-slate-100">
									<img
										src="/api/placeholder/600/400"
										alt="Resources Demo"
										className="object-cover"
									/>
								</div>
							</CardContent>
						</Card>
					</TabsContent>
					<TabsContent
						value="tracking"
						className="mt-6"
					>
						<Card>
							<CardHeader>
								<CardTitle>Smart Progress Tracking</CardTitle>
								<CardDescription>
									Monitor your progress and stay motivated
									with visual analytics
								</CardDescription>
							</CardHeader>
							<CardContent className="grid gap-6 md:grid-cols-2">
								<div className="space-y-4">
									<div className="flex items-start gap-3">
										<div className="rounded-lg bg-blue-100 p-2">
											<LineChart className="h-6 w-6 text-blue-600" />
										</div>
										<div>
											<h4 className="font-semibold">
												Progress Dashboard
											</h4>
											<p className="text-sm text-slate-600">
												Visual tracking of your learning
												journey
											</p>
										</div>
									</div>
									<div className="flex items-start gap-3">
										<div className="rounded-lg bg-blue-100 p-2">
											<Award className="h-6 w-6 text-blue-600" />
										</div>
										<div>
											<h4 className="font-semibold">
												Achievement System
											</h4>
											<p className="text-sm text-slate-600">
												Earn badges and certificates as
												you progress
											</p>
										</div>
									</div>
								</div>
								<div className="relative aspect-video overflow-hidden rounded-lg bg-slate-100">
									<img
										src="/api/placeholder/600/400"
										alt="Tracking Demo"
										className="object-cover"
									/>
								</div>
							</CardContent>
						</Card>
					</TabsContent>
				</Tabs>
			</div>

			{/* FAQs Section */}
			<div className="container mx-auto px-4 py-20">
				<div className="mb-12 text-center">
					<h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
						Frequently Asked Questions
					</h2>
					<p className="mx-auto max-w-2xl text-lg text-slate-600">
						Find answers to common questions about our platform
					</p>
				</div>
				<div className="mx-auto max-w-3xl">
					<Accordion
						type="single"
						collapsible
						className="w-full"
					>
						{faqs.map((faq, index) => (
							<AccordionItem
								key={index}
								value={`item-${index}`}
							>
								<AccordionTrigger>
									{faq.question}
								</AccordionTrigger>
								<AccordionContent>
									{faq.answer}
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</div>
			</div>

			{/* CTA Section */}
			<div className="container mx-auto px-4 py-20">
				<div className="rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 px-6 py-16 text-center md:px-16">
					<Badge className="mb-6 bg-blue-500/20 text-white hover:bg-blue-500/20">
						Limited Time Offer
					</Badge>
					<h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
						Start Your Career Transformation Today
					</h2>
					<p className="mb-8 text-xl text-blue-100">
						Get 30% off your first 3 months when you start your free
						trial now.
					</p>
					<div className="flex flex-col justify-center gap-4 sm:flex-row">
						<Button
							size="lg"
							className="bg-white text-blue-600 hover:bg-blue-50"
						>
							Start Learning{" "}
							<ArrowRight className="ml-2 h-5 w-5" />
						</Button>
					</div>
				</div>
			</div>

			{/* Footer */}
			<footer className="border-t bg-white">
				<div className="container mx-auto px-4 py-12">
					<div className="grid gap-8 md:grid-cols-4">
						<div>
							<div className="mb-4 text-xl font-bold text-blue-600">
								SwitchHere
							</div>
							<p className="text-sm text-slate-600">
								Your trusted partner in career transformation.
							</p>
							<div className="mt-4 flex space-x-4">
								<Twitter className="h-5 w-5 text-slate-400 hover:text-blue-600" />
								<Linkedin className="h-5 w-5 text-slate-400 hover:text-blue-600" />
								<Github className="h-5 w-5 text-slate-400 hover:text-blue-600" />
							</div>
						</div>
						<div>
							<div className="mb-4 font-semibold">Product</div>
							<ul className="space-y-2 text-sm text-slate-600">
								<li className="hover:text-blue-600">
									Features
								</li>
								<li className="hover:text-blue-600">Pricing</li>
								<li className="hover:text-blue-600">
									Case Studies
								</li>
								<li className="hover:text-blue-600">Reviews</li>
							</ul>
						</div>
						<div>
							<div className="mb-4 font-semibold">Company</div>
							<ul className="space-y-2 text-sm text-slate-600">
								<li className="hover:text-blue-600">About</li>
								<li className="hover:text-blue-600">Careers</li>
								<li className="hover:text-blue-600">Blog</li>
								<li className="hover:text-blue-600">Contact</li>
							</ul>
						</div>
						<div>
							<div className="mb-4 font-semibold">Support</div>
							<ul className="space-y-2 text-sm text-slate-600">
								<li className="hover:text-blue-600">
									Help Center
								</li>
								<li className="hover:text-blue-600">
									Documentation
								</li>
								<li className="hover:text-blue-600">
									API Reference
								</li>
								<li className="hover:text-blue-600">
									Privacy Policy
								</li>
							</ul>
						</div>
					</div>
					<div className="mt-8 flex flex-col items-center justify-between gap-4 border-t pt-8 text-sm text-slate-600 md:flex-row">
						<div>© 2025 SwitchHere. All rights reserved.</div>
						<div className="flex items-center gap-4">
							<select className="rounded border bg-transparent px-2 py-1">
								<option>🌎 English (US)</option>
								<option>🌎 Spanish</option>
								<option>🌎 French</option>
							</select>
						</div>
					</div>
				</div>
			</footer>

			{/* Mobile Menu */}
			{mobileMenuOpen && (
				<div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm">
					<div className="fixed inset-y-0 right-0 w-full max-w-xs bg-white p-6 shadow-lg">
						<div className="flex items-center justify-between">
							<div className="text-xl font-bold text-blue-600">
								SwitchHere
							</div>
							<Button
								variant="ghost"
								size="icon"
								onClick={() => setMobileMenuOpen(false)}
							>
								<X className="h-6 w-6" />
							</Button>
						</div>
						<nav className="mt-8">
							<ul className="space-y-4">
								<li>
									<a
										href="#features"
										className="text-slate-600 hover:text-blue-600"
									>
										Features
									</a>
								</li>
								<li>
									<a
										href="#how-it-works"
										className="text-slate-600 hover:text-blue-600"
									>
										How It Works
									</a>
								</li>
								<li>
									<a
										href="#pricing"
										className="text-slate-600 hover:text-blue-600"
									>
										Pricing
									</a>
								</li>
								<li>
									<a
										href="#testimonials"
										className="text-slate-600 hover:text-blue-600"
									>
										Success Stories
									</a>
								</li>
							</ul>
						</nav>
						<div className="mt-8 space-y-4">
							<Button
								variant="outline"
								className="w-full"
							>
								Log in
							</Button>
							<Button className="w-full bg-blue-600 hover:bg-blue-700">
								Start Free Trial
							</Button>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default LandingPage
