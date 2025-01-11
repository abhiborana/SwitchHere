"use client"

import { generateAiRoadmap } from "@/actions/roadmap"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Ripple from "@/components/ui/ripple"
import { Timeline } from "@/components/ui/timeline"
import useSwitchStore from "@/store"
import { getDatabase, ref, set } from "firebase/database"
import { ArrowRightIcon } from "lucide-react"
import Link from "next/link"
import { useMemo, useState } from "react"
import { toast } from "sonner"

const RoadmapBuilder = () => {
	const user = useSwitchStore(store => store.user)
	const dispatch = useSwitchStore(store => store.dispatch)
	const roadmap = useSwitchStore(store => store.roadmap)
	const [input, setInput] = useState("Switch to ")
	const [status, setStatus] = useState("career")
	const [form, setForm] = useState([
		{
			title: "What are you current skills or background",
			placeholder: "Skills or background",
			value: "",
			example: "Ex. Marketing Manager, Student, etc",
		},
		{
			title: "Time commitment you can make daily (in hours)",
			placeholder: "2 hours",
			value: "",
			example: "Ex. 2 hours, 4 hours, etc",
		},
		{
			title: "Probable Estimated Time to complete the switch",
			placeholder: "6 months",
			value: "",
			example: "Ex. 6 months, 1 year, etc",
		},
	])
	const [currentStep, setCurrentStep] = useState(0)
	const [aiStatus, setAiStatus] = useState("idle")

	const handleGenerateRoadmap = async () => {
		try {
			setAiStatus("loading")
			setStatus("ai")
			const resp = await generateAiRoadmap({
				career: input,
				currentSkills: form[0].value,
				dailyTime: form[1].value,
				estimatedDuration: form[2].value,
			})
			dispatch({
				type: "SET_STATE",
				payload: {
					roadmap: resp,
				},
			})
			const db = getDatabase()
			set(ref(db, `users/${user.uid}/roadmap`), resp)
			setAiStatus("success")
			setStatus("result")
			console.log("🚀 ~ resp:", resp)
		} catch (error) {
			setAiStatus("error")
			console.error("Error generating roadmap:", error)
			toast.error("Error generating roadmap")
		}
	}

	return (
		<div className="h-navScreen container mx-auto flex w-full flex-col items-center justify-start gap-4">
			{status === "career" ? (
				<>
					<h3 className="text-2xl">
						You name it, We help you do it,
					</h3>
					<Input
						placeholder="Switch career to ..."
						className="max-w-lg rounded-full p-2 px-4 text-xl"
						value={input}
						onChange={e => setInput(e.target.value)}
						autoFocus
					/>
					<Button
						onClick={() => setStatus("form")}
						className="max-w-xs rounded-full"
					>
						Build Roadmap with AI
					</Button>
					<p className="text-center text-xs">
						Or choose from predefined switches
					</p>
					<div className="grid grid-cols-2 gap-4">
						{predefinedSwitches.map(switchName => (
							<button
								key={switchName}
								onClick={() =>
									setInput(`Switch to ${switchName}`)
								}
								className="inline-flex items-center justify-center rounded-full border p-2 px-4 transition-all duration-300 hover:scale-105 dark:border-neutral-800"
							>
								{switchName}
							</button>
						))}
					</div>
				</>
			) : status === "form" ? (
				<>
					<h3 className="text-2xl">Perfect, You wanna {input}</h3>
					<p className="text-center text-base">
						Just a few more questions to get started
					</p>
					<div className="h-3 w-full max-w-xl rounded-full border bg-neutral-200 dark:border-neutral-800 dark:bg-neutral-800">
						<div
							className="h-full w-1/3 rounded-full bg-green-500 transition-all duration-300"
							style={{
								width: `${form.filter(f => f.value.length > 3).length * 33.33}%`,
							}}
						></div>
					</div>
					<h3 className="text-2xl">{form[currentStep].title}</h3>
					<Input
						placeholder={form[currentStep].placeholder}
						value={form[currentStep].value}
						onChange={e => {
							const newForm = [...form]
							newForm[currentStep].value = e.target.value
							setForm(newForm)
						}}
						className="max-w-lg rounded-full p-2 px-4 text-xl"
						autoFocus
						onKeyDown={e => {
							if (e.key === "Enter") {
								if (currentStep === form.length - 1) {
									handleGenerateRoadmap()
								} else {
									setCurrentStep(currentStep + 1)
								}
							}
						}}
					/>
					<div className="flex w-full max-w-xl items-center justify-between">
						<p className="text-center text-xs">
							{form[currentStep].example}
						</p>
						<Button
							onClick={() => {
								if (currentStep === form.length - 1) {
									handleGenerateRoadmap()
								} else {
									setCurrentStep(currentStep + 1)
								}
							}}
						>
							Next <ArrowRightIcon />
						</Button>
					</div>
				</>
			) : status === "ai" ? (
				aiStatus === "loading" ? (
					<>
						<div className="relative flex aspect-video w-full max-w-xl flex-col items-center justify-center overflow-hidden rounded-lg border bg-background dark:border-neutral-800 md:shadow-xl">
							<p className="z-10 whitespace-pre-wrap text-center text-5xl font-medium tracking-tighter">
								Building your roadmap
							</p>
							<Ripple />
						</div>
					</>
				) : (
					<p>Some Error Occured</p>
				)
			) : status === "result" ? (
				<>
					<div className="relative w-full overflow-auto scrollbar">
						<RoadmapTimeline map={roadmap.map} />
					</div>
					<Button asChild>
						<Link href="/learn">
							Start Learning <ArrowRightIcon />
						</Link>
					</Button>
				</>
			) : null}
		</div>
	)
}

export default RoadmapBuilder

const predefinedSwitches = [
	"Fullstack Developer",
	"Data Scientist",
	"UI/UX Designer",
	"Data Analyst",
	"Prompt Engineer",
	"Machine Learning",
]

const RoadmapTimeline = ({ map = [] }) => {
	const data = useMemo(() => {
		let timeline = []
		map.forEach(map => {
			timeline.push({
				title: map?.title,
				content: (
					<div className="flex flex-col gap-4">
						<p className="text-xl font-medium">{map?.objective}</p>
						<div className="grid grid-cols-2 gap-4">
							{map?.goals?.map(goal => (
								<div
									key={goal?.goal}
									className="inline-flex items-center justify-center text-balance rounded-xl border border-green-500 p-2 px-4 text-center text-lg shadow"
								>
									{goal?.goal}
								</div>
							))}
						</div>
					</div>
				),
			})
		})
		return timeline
	}, [map])

	return <Timeline data={data} />
}
