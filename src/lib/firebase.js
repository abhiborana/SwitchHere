"use client"

import { getApps, initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getDatabase } from "firebase/database"

// Firebase configuration using environment variables
const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
	databaseURL: "https://switch-here-default-rtdb.firebaseio.com/", // Use your database URL directly
}

// Initialize Firebase App (Singleton Pattern)
const firebaseApp = !getApps().length
	? initializeApp(firebaseConfig)
	: getApps()[0]

// Initialize Firebase Authentication
const auth = getAuth(firebaseApp)

// Initialize Firebase Realtime Database
const database = getDatabase(firebaseApp)

// Export Firebase App, Auth, and Database for use in the application
export { auth, database, firebaseApp }
