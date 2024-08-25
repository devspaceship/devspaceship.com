import { useQuery } from "@tanstack/react-query";
import Papa from "papaparse";

export type DataRow = {
  radius: number;
  density: number;
  mass: number;
  gravity: number;
};

export const useDensityData = () => {
  return useQuery({
    queryKey: ["densityData"],
    queryFn: async () => {
      const response = await fetch("/static/posts/elevator/density.csv");
      const text = await response.text();
      const data = Papa.parse(text, { header: true, dynamicTyping: true });
      const rows = data.data.slice(0, -1) as DataRow[];
      for (const row of rows) {
        row.mass = Number(row.mass);
      }
      return rows;
    },
  });
};
