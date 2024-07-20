"use client"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useData } from "@/data/useData"
import { convertHostelData } from "@/data/dashboardData"

const chartConfig = {
  Occupied: {
    label: "Occupied",
    color: "hsl(var(--chart-1))",
  },
  Vacant: {
    label: "Vacant",
    color: "hsl(var(--chart-2))",
  },
}

export default function Hostels() {
  const {allotment} = useData()
  const chartData = convertHostelData(allotment)
  
  return (
    <Card>
      <CardContent>
        <ChartContainer config={chartConfig} className = "min-w-72 max-w-96">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="Hostels"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="Occupied"
              stackId="a"
              fill="var(--color-Occupied)"
              radius={[0, 0, 10, 10]}
            />
            <Bar
              dataKey="Vacant"
              stackId="a"
              fill="var(--color-Vacant)"
              radius={[10, 10, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
