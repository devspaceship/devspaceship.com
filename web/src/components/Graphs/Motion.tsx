"use client";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import QueryClientProviderWrapper from "@/components/QueryClientProviderWrapper";
import { useMotionData } from "@/queries/elevator";
import { MotionTooltip } from "./Tooltips";

type MotionProps = {
  speed: boolean;
};

const MotionChart = ({ speed }: MotionProps) => {
  const { isPending, error, data } = useMotionData();

  if (isPending) return "Loading...";
  if (error) return "An error has occurred while loading the data";

  return (
    <ResponsiveContainer width="95%" height={400}>
      <LineChart width={400} height={400} data={data}>
        {speed ? (
          <>
            <Line type="monotone" dataKey="speed" stroke="#c5de26" />
            <Line type="monotone" dataKey="acceleration" stroke="#26c5de" />
          </>
        ) : (
          <Line type="monotone" dataKey="radius" stroke="#26c5de" />
        )}
        <CartesianGrid stroke="#aaa" />
        <XAxis dataKey="time" type="number" />
        <YAxis type="number" />
        <Tooltip
          content={<MotionTooltip speed={speed} />}
          wrapperStyle={{ backgroundColor: "#222", padding: "8px" }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

function Motion(props: MotionProps) {
  return (
    <QueryClientProviderWrapper>
      <MotionChart {...props} />
    </QueryClientProviderWrapper>
  );
}

export default Motion;
