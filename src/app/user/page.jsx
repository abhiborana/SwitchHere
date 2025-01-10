"use client"

import { database } from "@/lib/firebase" // Adjust the path to your Firebase config file
import useSwitchStore from "@/store"
import { get, ref } from "firebase/database"
import { useEffect, useState } from "react"

export default function Home() {
	const [data, setData] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const user = useSwitchStore(state => state.user)

	useEffect(() => {
		const fetchData = async () => {
			try {
				// Reference to the root of your database
				const dbRef = ref(database, `/users/${user.uid}`) // Adjust the path to your data

				// Fetch data from Firebase Realtime Database
				const snapshot = await get(dbRef)

				if (snapshot.exists()) {
					setData(snapshot.val())
				} else {
					setData(null)
				}
			} catch (err) {
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

	console.log(data)

	// console.log(user)

	if (loading) return <p>Loading...</p>
	if (error) return <p>{error}</p>

	return (
		<div>
			<h1>Firebase Data</h1>
			{data ? (
				<pre>{JSON.stringify(data, null, 2)}</pre>
			) : (
				<p>No data available.</p>
			)}
		</div>
	)
}
