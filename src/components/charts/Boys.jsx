import React, { useState, useMemo } from "react";
import { Label, Pie, PieChart, Sector } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const memberData = [
  { hostel: "Hostel A", members: 186, fill: "var(--color-january)" },
  { hostel: "Hostel B", members: 305, fill: "var(--color-february)" },
  { hostel: "Hostel C", members: 237, fill: "var(--color-march)" },
  { hostel: "Hostel D", members: 173, fill: "var(--color-april)" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  members: {
    label: "Members",
  },
  hostelA: {
    label: "Hostel A",
    color: "hsl(var(--chart-1))",
  },
  hostelB: {
    label: "Hostel B",
    color: "hsl(var(--chart-2))",
  },
  hostelC: {
    label: "Hostel C",
    color: "hsl(var(--chart-3))",
  },
  hostelD: {
    label: "Hostel D",
    color: "hsl(var(--chart-4))",
  },
};

export default function Boys() {
  const id = "pie-interactive";
  const [activeHostel, setActiveHostel] = useState(memberData[0].hostel);

  const activeIndex = useMemo(
    () => memberData.findIndex((item) => item.hostel === activeHostel),
    [activeHostel]
  );
  const hostels = useMemo(() => memberData.map((item) => item.hostel), []);

  return (
    <Card data-chart={id} className="flex flex-col">
      <ChartStyle id={id} config={chartConfig} />
      <CardHeader className="flex-row items-start space-y-0 pb-0">
        <div className="grid gap-1">
          <CardTitle>Boys</CardTitle>
        </div>
        <Select value={activeHostel} onValueChange={setActiveHostel}>
          <SelectTrigger
            className="ml-auto h-7 w-[130px] rounded-lg pl-2.5"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Select hostel" />
          </SelectTrigger>
          <SelectContent align="end" className="rounded-xl">
            {hostels.map((key) => {
              const config = chartConfig[key.replace(/\s+/g, '').toLowerCase()];

              if (!config) {
                return null;
              }

              return (
                <SelectItem
                  key={key}
                  value={key}
                  className="rounded-lg [&_span]:flex"
                >
                  <div className="flex items-center gap-2 text-xs">
                    <span
                      className="flex h-3 w-3 shrink-0 rounded-sm"
                      style={{
                        backgroundColor: `var(--color-${key.replace(/\s+/g, '').toLowerCase()})`,
                      }}
                    />
                    {config.label}
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="flex flex-1 justify-center pb-0">
        <ChartContainer
          id={id}
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={memberData}
              dataKey="members"
              nameKey="hostel"
              innerRadius={60}
              strokeWidth={5}
              activeIndex={activeIndex}
              activeShape={({ outerRadius = 0, ...props }) => (
                <g>
                  <Sector {...props} outerRadius={outerRadius + 10} />
                  <Sector
                    {...props}
                    outerRadius={outerRadius + 25}
                    innerRadius={outerRadius + 12}
                  />
                </g>
              )}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
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
                          className="fill-foreground text-3xl font-bold"
                        >
                          {memberData[activeIndex].members.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Members
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
