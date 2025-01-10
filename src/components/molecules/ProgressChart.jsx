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

const chartData = [{ browser: "safari", visitors: 100, fill: "green" }]

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
	const maxValue = 100
	const currentValue = chartData[0].visitors
	const normalizedEndAngle = (currentValue / maxValue) * 360

	return (
		<Card className="flex h-full flex-col">
			<CardHeader>
				<CardTitle>Progress Chart</CardTitle>
				<CardDescription>See your Goal</CardDescription>
			</CardHeader>
			<CardContent className="flex h-full w-full items-center justify-center">
				<ChartContainer
					config={chartConfig}
					className="mx-auto my-auto aspect-square h-full max-h-[320px] min-h-[280px]"
				>
					<RadialBarChart
						data={chartData}
						startAngle={0}
						endAngle={normalizedEndAngle}
						innerRadius={100}
						outerRadius={160}
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
							fill={chartData[0].fill}
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
