"use server"

import { google } from "@ai-sdk/google"
import { generateObject } from "ai"
import { z } from "zod"

const roadMapSchema = z.object({
	title: z.string().describe("Title of the roadmap"),
	duration: z.number().describe("Duration of the roadmap in weeks"),
	map: z
		.array(
			z
				.object({
					title: z.string().describe("Month/Week Counter"),
					objective: z
						.string()
						.describe("Objective of the task to be completed"),
					goals: z
						.array(
							z.object({
								goal: z
									.string()
									.describe(
										"A query to be searched on internet to achieve the goal"
									),
								isCompleted: z
									.boolean()
									.describe("Status of the goal")
									.default(false),
							})
						)
						.describe("Goals to be achieved"),
				})
				.describe("Roadmap Object for each month/week")
		)
		.describe("Roadmap for the entire duration"),
})

export const generateAiRoadmap = async body => {
	console.log("🚀 ~ body:", body)
	const { career, currentSkills, dailyTime, estimatedDuration } = body

	const systemPrompt = `Generate a highly personalized roadmap to switch career to ${career} from ${currentSkills} in ${estimatedDuration} weeks. The user has ${dailyTime} hours to spend on learning each day. Plan the roadmap in clear and concise steps with clear objectives and goals for each step. The monthly objective will be divided into weekly goals of small chunks.`

	const { object } = await generateObject({
		model: google("gemini-1.5-flash"),
		prompt: systemPrompt,
		schema: roadMapSchema,
	})
	console.log("🚀 ~ resp:", object)

	return object
}
