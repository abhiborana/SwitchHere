"use client"

import { ProgressChart } from "@/components/molecules/ProgressChart"
import { WeeklyChart } from "@/components/molecules/WeeklyChart"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { database } from "@/lib/firebase"
import useSwitchStore from "@/store"
import { get, ref } from "firebase/database"
import Link from "next/link"
import { useEffect, useState } from "react"

const page = () => {
	const [data, setData] = useState(null)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)
	const user = useSwitchStore(state => state.user)
	const dispatch = useSwitchStore(store => store.dispatch)

	useEffect(() => {
		const fetchData = async () => {
			setLoading(false)
			try {
				const dbRef = ref(database, `/users/${user.uid}`)
				const snapshot = await get(dbRef)
				if (snapshot.exists()) {
					setData(snapshot.val())
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
		if (user?.uid) {
			fetchData()
		}
	}, [user])

	return (
		<div className="flex h-[calc(100vh-57px)] w-full flex-1 overflow-y-auto overflow-x-hidden p-4">
			<div className="mx-auto flex h-fit w-full max-w-7xl flex-col">
				<div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6">
					<Card className="w-full lg:col-span-4">
						<CardHeader>
							<CardTitle>Welcome User</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="space-y-2">
								<p className="text-xs md:text-base">
									You have completed 70% of your roadmap!
									Wohoo
								</p>
							</div>
						</CardContent>
					</Card>
					<Card className="w-full lg:col-span-2">
						<CardHeader>
							<CardTitle>Continue Learning</CardTitle>
						</CardHeader>
						<CardContent>
							<Button>
								<Link href="/learn">Start Learning</Link>
							</Button>
						</CardContent>
					</Card>
					<div className="w-full lg:col-span-2">
						<ProgressChart />
					</div>
					<div className="w-full lg:col-span-4">
						<WeeklyChart />
					</div>
				</div>
			</div>
		</div>
	)
}

export default page
