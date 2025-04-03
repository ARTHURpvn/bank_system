"use client";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import { Card, CardContent } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";
import { fetchNui } from "@/hooks/nui";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function ChartComponent() {
  const [chartData, setChartData] = useState<{ type: string; value: number }[]>([]);
  useEffect(() => {
    const getUserInfo = async () => {
      const result = await fetchNui("getChartInfos", {}, [
        {
          type: "Deposito",
          value: 220,
        },
        {
          type: "Retirar",
          value: 120,
        },
        {
          type: "Retirar",
          value: 190,
        },
      ]);

      setChartData(result);
    };
    getUserInfo();
  }, []);
  return (
    <Card className="h-full w-full">
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
              dataKey="type"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="value"
              type="natural"
              stroke="var(--chart-1)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
