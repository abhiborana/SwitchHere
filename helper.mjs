// Import Firebase
import { initializeApp } from "firebase/app"
import { doc, getFirestore, setDoc } from "firebase/firestore"
// Firebase configuration
const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

// JSON object to upload
const jsonObject = {
	roadmaps: [
		{
			title: "Backend Development Journey",
			duration: 6,
			map: [
				{
					title: "Month 1",
					objective: "Python Fundamentals & Advanced Concepts",
					goals: [
						"Python Syntax and Basic Concepts",
						"Object-Oriented Programming",
						"Error Handling and Debugging",
						"File Operations and Module Management",
						"Virtual Environments and Package Management",
						"Advanced Python Features (Decorators, Generators)",
					],
				},
				{
					title: "Month 2",
					objective: "Databases & SQL",
					goals: [
						"Database Fundamentals",
						"SQL Basics (SELECT, INSERT, UPDATE, DELETE)",
						"Advanced SQL (Joins, Subqueries)",
						"Database Design and Normalization",
						"PostgreSQL Specific Features",
						"ORM Concepts with SQLAlchemy",
					],
				},
				{
					title: "Month 3",
					objective: "APIs & Web Frameworks",
					goals: [
						"HTTP Protocol Fundamentals",
						"REST API Concepts",
						"FastAPI Framework Basics",
						"API Authentication and Authorization",
						"API Documentation with Swagger/OpenAPI",
						"API Testing and Debugging",
					],
				},
				{
					title: "Month 4",
					objective: "Advanced Backend Concepts",
					goals: [
						"Asynchronous Programming",
						"WebSockets and Real-time Communication",
						"Caching Strategies (Redis)",
						"Message Queues (RabbitMQ)",
						"Background Tasks and Scheduling",
						"API Security Best Practices",
					],
				},
				{
					title: "Month 5",
					objective: "DevOps & Deployment",
					goals: [
						"Linux Basics and Shell Scripting",
						"Docker Containerization",
						"CI/CD Pipelines",
						"Cloud Services (AWS/GCP Basics)",
						"Monitoring and Logging",
						"Server Management and Scaling",
					],
				},
				{
					title: "Month 6",
					objective: "System Design & Best Practices",
					goals: [
						"System Architecture Patterns",
						"Microservices Architecture",
						"API Gateway Implementation",
						"Performance Optimization",
						"Security Best Practices",
						"Project Architecture and Documentation",
					],
				},
			],
		},
	],
	chunks: [
		[
			{
				title: "Python Fundamentals - Week 1",
				resources: [
					{
						type: "video",
						url: "https://www.coursera.org/learn/python-basics",
						title: "Python Programming Basics",
					},
					{
						type: "documentation",
						url: "https://docs.python.org/3/tutorial/",
						title: "Python Official Documentation",
					},
					{
						type: "practice",
						url: "https://www.hackerrank.com/domains/python",
						title: "Python Practice Problems",
					},
				],
				isCompleted: false,
			},
			{
				title: "Object-Oriented Programming - Week 2",
				resources: [
					{
						type: "video",
						url: "https://realpython.com/python3-object-oriented-programming/",
						title: "OOP in Python",
					},
					{
						type: "exercise",
						url: "https://www.practicepython.org/",
						title: "OOP Practice Exercises",
					},
				],
				isCompleted: false,
			},
		],
		[
			{
				title: "Database Fundamentals - Week 1",
				resources: [
					{
						type: "course",
						url: "https://www.postgresql.org/docs/current/tutorial.html",
						title: "PostgreSQL Tutorial",
					},
					{
						type: "practice",
						url: "https://www.pgexercises.com/",
						title: "PostgreSQL Exercises",
					},
				],
				isCompleted: false,
			},
			{
				title: "FastAPI Development - Week 1",
				resources: [
					{
						type: "documentation",
						url: "https://fastapi.tiangolo.com/",
						title: "FastAPI Official Documentation",
					},
					{
						type: "tutorial",
						url: "https://testdriven.io/blog/fastapi-crud/",
						title: "Building CRUD APIs with FastAPI",
					},
				],
				isCompleted: false,
			},
		],
	],
}
// Function to upload JSON`
async function uploadJson(collectionName, documentId, jsonData) {
	try {
		const docRef = doc(db, "roadmap", "4gmKFum2zDPNIEvieLL9TH52zRo1")
		await setDoc(docRef, {
			roadmaps: jsonData,
		})
		console.log(docRef)
		console.log("Document successfully written!")
	} catch (error) {
		console.error("Error writing document: ", error)
	}
}

// Call the function
uploadJson("yourCollectionName", "yourDocumentId", JSON.stringify(jsonObject))
