"use client"
import { Button } from "@/components/ui/button"
import useSwitchStore from "@/store"
import { getDatabase, ref, set } from "firebase/database"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { toast } from "sonner"

const VideoArticle = () => {
	const router = useRouter()
	const [data, setData] = useState([])
	const roadmap = useSwitchStore(store => store.roadmap)
	console.log("🚀 ~ VideoArticle ~ roadmap:", roadmap)
	const dispatch = useSwitchStore(store => store.dispatch)

	// const thumbnailSrc = resource?.pagemap?.cse_thumbnail?.[0]?.src
	// const altText = resource?.title || "Thumbnail image"
	const [currentMap, currentStep] = useMemo(() => {
		if (!roadmap) return [null, null]
		const currentMap = roadmap?.map.find(s => !s.isCompleted)
		const currentStep = currentMap?.goals.find(s => !s.isCompleted)
		return [currentMap, currentStep]
	}, [roadmap])

	useEffect(() => {
		if (!roadmap) {
			router.push("/dashboard")
			toast.error("Please generate a roadmap first.")
		}
		const fetchData = async () => {
			console.log("🚀 ~ fetchData ~ async:")
			try {
				const response = await fetch(
					`https://www.googleapis.com/customsearch/v1?key=${process.env.NEXT_PUBLIC_SEARCH_KEY}&cx=${process.env.NEXT_PUBLIC_CX_KEY}&q=${currentStep?.goal || currentStep}`
				)
					.then(response => response.json())
					.catch(error => {
						console.error("Error fetching data:", error)
						toast.error("Failed to fetch data.")
						router.push("/dashboard")
					})
				console.log("🚀 ~ fetchData ~ response:", response)
				if (response.error) {
					console.error("Error fetching data:", response.error)
					toast.error("Failed to fetch data.")
					router.push("/dashboard")
				}
				const formattedResp = response.items
					.slice(0, 5)
					.sort((a, b) => {
						console.log(a, b)
						return a.displayLink.includes("youtube") ? -1 : 1
					})
				console.log(formattedResp)
				setData(formattedResp)
			} catch (error) {
				console.error("Error fetching data:", error)
			}
		}

		fetchData()
	}, [currentMap, currentStep, router])

	return !data.length ? null : (
		<div className="flex w-full flex-col p-4">
			<h1>
				{currentMap.title} - {currentStep.goal}
			</h1>
			<div className="grid grid-cols-4 gap-4">
				<div className="col-span-4 flex flex-col items-center justify-start gap-4 md:col-span-3">
					<div className="aspect-video w-full overflow-y-auto rounded-xl bg-neutral-100 p-2">
						<iframe
							src={`https://www.youtube.com/embed/${data[0].link.split("v=")[1]}`}
							title={data[0].title}
							frameBorder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowFullScreen
							className="h-full w-full rounded-xl"
						></iframe>
					</div>
					<Button
						variant="outline"
						className="ml-auto w-fit rounded-full border-green-500 text-green-500"
						onClick={() => {
							const newMap = roadmap.map.map(map => {
								if (map.title === currentMap.title) {
									const newGoals = map.goals.map(goal => {
										if (goal === currentStep) {
											return {
												...goal,
												isCompleted: true,
											}
										}
										return goal
									})
									return { ...map, goals: newGoals }
								}
								return map
							})
							dispatch({
								type: "SET_STATE",
								payload: {
									roadmap: {
										...roadmap,
										map: newMap,
									},
								},
							})
							// const db = database.ref(
							// 	`users/${roadmap.uid}/roadmap`
							// )
							// db.set(roadmap)
							const db = getDatabase()
							set(ref(db, `users/${user.uid}/roadmap`), roadmap)
						}}
					>
						Mark as Completed
					</Button>
				</div>
				<div className="col-span-4 h-[calc(100vh-25px)] flex-1 overflow-y-auto rounded-xl bg-neutral-100 p-2 scrollbar md:col-span-1">
					{data.slice(1, data.length).map((resource, index) => (
						<Link
							href={resource.link}
							key={index}
							target="_blank"
							className="flex flex-1 flex-col gap-2"
						>
							<div className="col-span-3 aspect-video rounded-xl bg-neutral-100 scrollbar">
								<Image
									src={resource?.pagemap?.cse_image?.[0]?.src}
									alt="Thumbnail image"
									width={400}
									height={225}
									unoptimized
									className="rounded-xl border border-red-500"
								/>
							</div>
							<span className="line-clamp-2 px-2 pr-7 text-sm font-medium underline-offset-2 group-hover/resource:underline dark:text-slate-600">
								{resource.title}
							</span>
							<span
								className="line-clamp-2 text-xs text-gray-500"
								dangerouslySetInnerHTML={{
									__html: resource.description,
								}}
							/>
						</Link>
					))}
				</div>
			</div>
		</div>
	)
}

export default VideoArticle

// import {
// 	Card,
// 	CardContent,
// 	CardDescription,
// 	CardHeader,
// 	CardTitle,
// } from "@/components/ui/card"

// const Learn = () => {
// 	const cards = Array.from({ length: 3 }, (_, i) => i + 4)
// 	console.log(cards)

// 	return (
// 		<div className="grid w-full grid-cols-1 gap-4 p-4 md:grid-cols-2 xl:grid-cols-3">
// 			{cards.map((card, index) => (
// 				<Card key={index}>
// 					<CardContent className="relative aspect-video w-full rounded-md py-2">
// 						<iframe
// 							src="https://www.youtube.com/embed/unxRddbofI8"
// 							title={`YouTube video player ${index + 1}`}
// 							frameBorder="0"
// 							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
// 							allowFullScreen
// 							className="h-full w-full"
// 						></iframe>
// 					</CardContent>
// 					<CardHeader className="py-0 pb-4">
// 						<CardTitle className="text-lg font-medium">
// 							Virat Kohli's game-changing knock | IND v PAK |
// 							T20WC 2022
// 						</CardTitle>
// 						<CardDescription>
// 							Card {card} - Video Description Here
// 						</CardDescription>
// 					</CardHeader>
// 				</Card>
// 			))}
// 		</div>
// 	)
// }

// export default Learn
