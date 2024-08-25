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

type MotionProps = {
  speed: boolean;
};

const MotionChart = (props: MotionProps) => {
  const { isPending, error, data } = useMotionData();

  if (isPending) return "Loading...";
  if (error) return "An error has occurred while loading the data";

  const CustomTooltip = ({
    payload,
    active,
  }: {
    payload?: {
      payload: {
        radius: number;
        time: number;
        speed: number;
        acceleration: number;
      };
    }[];
    active?: unknown;
  }) => {
    if (!active || !payload) {
      return null;
    }

    const data = payload[0].payload;
    const time = Math.round(data.time / 10) * 10;
    const radius = Math.round(data.radius / 50) * 50;
    const speed = Math.round(data.speed * 10) / 10;
    const acceleration = Math.round(data.acceleration * 10) / 10;

    return (
      <div>
        <p>{`time: ${time}s`}</p>
        {props.speed ? (
          <>
            <p>{`speed: ${speed}km/s`}</p>
            <p>{`acceleration: ${acceleration}m/(s^2)`}</p>
          </>
        ) : (
          <p>{`radius: ${radius}km`}</p>
        )}
      </div>
    );
  };

  return (
    <ResponsiveContainer width="95%" height={400}>
      <LineChart width={400} height={400} data={data}>
        {props.speed ? (
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
          content={<CustomTooltip />}
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

// TODO Fix react hydration error
// TODO Refactor all the math.round
// TODO Merge Motion and Density in same component
