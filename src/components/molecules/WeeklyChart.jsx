"use client"

import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
	{ month: "1", desktop: 186, mobile: 80 },
	{ month: "2", desktop: 305, mobile: 200 },
	{ month: "3", desktop: 237, mobile: 120 },
	{ month: "4", desktop: 73, mobile: 190 },
]

const chartConfig = {
	desktop: {
		label: "Goal Set",
		color: "green",
	},
	mobile: {
		label: "Goal Achieved",
		color: "red",
	},
}

export function WeeklyChart() {
	return (
		<Card className="h-full">
			<CardHeader>
				<CardTitle>Monthly Progress Chart</CardTitle>
				<CardDescription>January</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer config={chartConfig}>
					<LineChart
						accessibilityLayer
						data={chartData}
						margin={{
							left: 12,
							right: 12,
						}}
					>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="month"
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							tickFormatter={value => value.slice(0, 3)}
						/>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent />}
						/>
						<Line
							dataKey="desktop"
							type="monotone"
							stroke="var(--color-desktop)"
							strokeWidth={2}
							dot={false}
						/>
						<Line
							dataKey="mobile"
							type="monotone"
							stroke="var(--color-mobile)"
							strokeWidth={2}
							dot={false}
						/>
					</LineChart>
				</ChartContainer>
			</CardContent>
		</Card>
	)
}
