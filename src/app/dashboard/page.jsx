"use client"

import { ProgressChart } from "@/components/molecules/ProgressChart"
import { WeeklyChart } from "@/components/molecules/WeeklyChart"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { database } from "@/lib/firebase"
import useSwitchStore from "@/store"
import { get, ref } from "firebase/database"
import { SparkleIcon } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

const page = () => {
	const [data, setData] = useState(null)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)
	const user = useSwitchStore(state => state.user ?? null)
	const dispatch = useSwitchStore(store => store.dispatch)
	const roadmap = useSwitchStore(store => store.roadmap)

	useEffect(() => {
		const fetchData = async () => {
			setLoading(false)
			try {
				const dbRef = ref(database, `/users/${user.uid}`)
				const snapshot = await get(dbRef)
				if (snapshot.exists()) {
					setData(snapshot.val())
					dispatch({
						type: "SET_STATE",
						payload: {
							roadmap: snapshot.val().roadmap,
						},
					})
				} else {
					setData(null)
				}
			} catch (err) {
				setLoading(false)
				console.error("Error fetching Firebase data:", err)
				setError("Failed to fetch data.")
			} finally {
				setLoading(false)
			}
		}
		if (user?.uid && !roadmap) {
			fetchData()
		}
		if (roadmap) setData({ roadmap: roadmap })
	}, [user])

	if (!user) return null

	return (
		<div className="flex w-full overflow-hidden p-4">
			{data ? (
				<div className="mx-auto flex h-fit w-full max-w-7xl flex-col">
					<div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6">
						<Card className="w-full lg:col-span-4">
							<CardHeader>
								<CardTitle>
									Welcome {user.displayName || user.email}
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-2">
									<p className="text-xs md:text-base">
										You have completed{" "}
										{(data.roadmap.map.filter(
											e => e?.isCompleted
										) /
											data.roadmap.map.length) *
											100}
										% of your roadmap!!!
									</p>
								</div>
							</CardContent>
						</Card>
						<Card className="w-full lg:col-span-2">
							<CardHeader>
								<CardTitle>Continue Learning</CardTitle>
							</CardHeader>
							<CardContent>
								<Button asChild>
									<Link href="/learn">Start Learning</Link>
								</Button>
							</CardContent>
						</Card>
						<div className="w-full lg:col-span-2">
							<ProgressChart
								progress={
									(data.roadmap.map.filter(
										e => e?.isCompleted
									) /
										data.roadmap.map.length) *
									100
								}
							/>
						</div>
						<div className="w-full lg:col-span-4">
							<WeeklyChart />
						</div>
					</div>
				</div>
			) : (
				<div className="flex h-full w-full flex-col items-center justify-center gap-2 py-10">
					<h1 className="text-xl font-semibold md:text-3xl">
						Want to switch your career? Get started now!
					</h1>
					<Button
						asChild
						className="transition-all duration-500 hover:scale-110"
					>
						<Link href="/new">
							Build my Roadmap{" "}
							<SparkleIcon className="text-green-500" />
						</Link>
					</Button>
				</div>
			)}
		</div>
	)
}

export default page
