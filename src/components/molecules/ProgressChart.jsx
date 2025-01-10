"use client"

import {
	Label,
	PolarGrid,
	PolarRadiusAxis,
	RadialBar,
	RadialBarChart,
} from "recharts"

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { ChartContainer } from "@/components/ui/chart"
const chartData = [{ browser: "safari", visitors: 70, fill: "green" }]

const chartConfig = {
	visitors: {
		label: "Visitors",
	},
	safari: {
		label: "Safari",
		color: "hsl(var(12 76% 61%))",
	},
}

export function ProgressChart() {
	return (
		<Card className="flex h-full flex-col">
			<CardHeader className="items-center pb-0">
				<CardTitle>Progress Chart</CardTitle>
				<CardDescription>See your Goal</CardDescription>
			</CardHeader>
			<CardContent className="items-center justify-center">
				<ChartContainer
					config={chartConfig}
					className="mx-auto my-auto aspect-square max-h-[300px]"
				>
					<RadialBarChart
						data={chartData}
						startAngle={0}
						endAngle={250}
						innerRadius={80}
						outerRadius={140}
					>
						<PolarGrid
							gridType="circle"
							radialLines={false}
							stroke="none"
							className="first:fill last:fill-white dark:fill-neutral-900"
							polarRadius={[86, 74]}
						/>
						<RadialBar
							dataKey="visitors"
							background
							cornerRadius={10}
						/>
						<PolarRadiusAxis
							tick={false}
							tickLine={false}
							axisLine={false}
						>
							<Label
								content={({ viewBox }) => {
									if (
										viewBox &&
										"cx" in viewBox &&
										"cy" in viewBox
									) {
										return (
											<text
												x={viewBox.cx}
												y={viewBox.cy}
												textAnchor="middle"
												dominantBaseline="middle"
											>
												<tspan
													x={viewBox.cx}
													y={viewBox.cy}
													className="fill-gray-800 text-4xl font-bold dark:fill-gray-200"
												>
													{chartData[0].visitors.toLocaleString()}{" "}
													%
												</tspan>
											</text>
										)
									}
								}}
							/>
						</PolarRadiusAxis>
					</RadialBarChart>
				</ChartContainer>
			</CardContent>
		</Card>
	)
}
