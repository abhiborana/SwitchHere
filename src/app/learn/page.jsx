"use client"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

const VideoArticle = () => {
	const [data, setData] = useState([])

	// const thumbnailSrc = resource?.pagemap?.cse_thumbnail?.[0]?.src
	// const altText = resource?.title || "Thumbnail image"

	useEffect(() => {
		const fetchData = async () => {
			try {
				const query = "Nextjs React Tailwind"

				const response = await fetch(
					`https://www.googleapis.com/customsearch/v1?key=${process.env.NEXT_PUBLIC_SEARCH_KEY}&cx=${process.env.NEXT_PUBLIC_CX_KEY}&q=${query} video`
				).then(response => response.json())

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
	}, [])

	return !data.length ? null : (
		<div className="flex w-full flex-col p-4">
			<div className="grid grid-cols-4 gap-4">
				<div className="col-span-3 aspect-video overflow-y-auto rounded-xl bg-neutral-100 p-2">
					<iframe
						src={`https://www.youtube.com/embed/${data[0].link.split("v=")[1]}`}
						title={data[0].title}
						frameBorder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowFullScreen
						className="h-full w-full rounded-xl"
					></iframe>
				</div>

				<div className="col-span-1 h-[calc(100vh-25px)] flex-1 overflow-y-auto rounded-xl bg-neutral-100 p-2 scrollbar">
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
