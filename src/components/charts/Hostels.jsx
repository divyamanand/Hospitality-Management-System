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
const chartData = [
  { Hostels: "HostelA", Occupied: 186, Vacant: 80 },
  { Hostels: "February", Occupied: 305, Vacant: 200 },
  { Hostels: "March", Occupied: 237, Vacant: 120 },
  { Hostels: "April", Occupied: 73, Vacant: 190 },
  { Hostels: "May", Occupied: 209, Vacant: 130 },
  { Hostels: "June", Occupied: 214, Vacant: 140 },
]

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
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hostels</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
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
