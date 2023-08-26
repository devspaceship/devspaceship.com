import { CellPolicy } from "../types";

const PolicyArrowLine = ({
  x1,
  y1,
  x2,
  y2,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}) => {
  return (
    <line
      x1={x1}
      x2={x2}
      y1={y1}
      y2={y2}
      strokeWidth="0.07"
      strokeLinecap="round"
    />
  );
};

const PolicyArrow = ({ policy }: { policy: CellPolicy }) => {
  const policyToRotation = {
    [CellPolicy.UP]: 0,
    [CellPolicy.RIGHT]: 90,
    [CellPolicy.DOWN]: 180,
    [CellPolicy.LEFT]: 270,
  };
  return (
    <g
      transform={`translate(0.5,0.5) scale(0.72) rotate(${policyToRotation[policy]})`}
      className="stroke-tertiary-500"
    >
      <PolicyArrowLine x1={0} y1={0.5} x2={0} y2={-0.5} />
      <PolicyArrowLine x1={-0.25} y1={-0.25} x2={0} y2={-0.5} />
      <PolicyArrowLine x1={0.25} y1={-0.25} x2={0} y2={-0.5} />
    </g>
  );
};
export default PolicyArrow;
