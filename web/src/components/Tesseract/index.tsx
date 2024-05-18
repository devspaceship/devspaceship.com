"use client";
import { useState } from "react";
import ConfigSlider from "@/components/ui/custom/ConfigSlider";

const Tesseract = () => {
  const [d, setD] = useState(300);
  const [alpha, setAlpha] = useState(10);
  const [beta, setBeta] = useState(12);

  return (
    <div className="flex justify-evenly">
      <ConfigSlider
        id="d"
        label="d"
        min={200}
        max={800}
        value={d}
        onValueChange={(value) => setD(value)}
      />
      <ConfigSlider
        id="alpha"
        label="α"
        min={1}
        max={15}
        value={alpha}
        onValueChange={(value) => setAlpha(value)}
      />
      <ConfigSlider
        id="beta"
        label="β"
        min={1}
        max={15}
        value={beta}
        onValueChange={(value) => setBeta(value)}
      />
    </div>
  );
};

export default Tesseract;
