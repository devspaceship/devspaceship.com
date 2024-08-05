"use client";
import { useEffect, useState } from "react";
import Papa from "papaparse";
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

type DataRow = {
  time: number;
  radius: number;
  speed: number;
  acceleration: number;
};

type MotionProps = {
  speed: boolean;
};

const MotionChart = (props: MotionProps) => {
  const [data, setData] = useState([
    { time: 0, radius: 0, speed: 0, acceleration: 0 },
  ]);

  const fetchParseData = async () => {
    const raw_res = await fetch("/static/posts/elevator/motion.csv");
    const res = await raw_res.text();
    const data_object = Papa.parse(res, { header: true, dynamicTyping: true });
    const data = data_object.data.slice(0, -1) as DataRow[];
    setData(data);
  };

  useEffect(() => {
    fetchParseData();
  }, []);

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
