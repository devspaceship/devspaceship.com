import React from 'react';

const SPACING = 0.08;
const ROUNDNESS = 0.22;

// TODO Define types
const PolicyArrow = (props) => {
  const [visible, direction] = props.policy;
  let { rows, columns, i, j, state } = props;
  rows = parseInt(rows);
  columns = parseInt(columns);
  i = parseInt(i);
  j = parseInt(j);
  const width = 1.5 / columns;
  const height = 1 / rows;

  const dirToRot = { N: -90, E: 0, S: 90, W: 180 };

  if (visible && (state === 'S' || state === 'A')) {
    return (
      <g
        transform={`translate(${(j + 1 / 2) * width}, ${
          (i + 1 / 2) * height
        }) rotate(${dirToRot[direction]}) scale(0.72)`}
      >
        <line
          x1={-(width / 2)}
          x2={width / 2}
          y1="0"
          y2="0"
          stroke="#71d44a"
          strokeWidth="0.01"
          stroke-linecap="round"
        />
        <line
          x1={width / 4}
          x2={width / 2}
          y1={width / 4}
          y2="0"
          stroke="#71d44a"
          strokeWidth="0.01"
          stroke-linecap="round"
        />
        <line
          x1={width / 4}
          x2={width / 2}
          y1={-width / 4}
          y2="0"
          stroke="#71d44a"
          strokeWidth="0.01"
          stroke-linecap="round"
        />
      </g>
    );
  } else {
    return null;
  }
  // return <circle></circle>;
};

export default (props) => {
  let { rows, columns, i, j, state, policy } = props;
  rows = parseInt(rows);
  columns = parseInt(columns);
  i = parseInt(i);
  j = parseInt(j);

  const width = (1.5 / columns) * (1 - SPACING);
  const height = (1 / rows) * (1 - SPACING);
  const x = (1.5 / columns) * (j + SPACING / 2);
  const y = (1 / rows) * (i + SPACING / 2);
  const rx = width * ROUNDNESS;
  const ry = height * ROUNDNESS;

  let fill = '#999';
  if (state === 'T') {
    fill = '#d64b4b';
  } else if (state === 'S') {
    fill = '#d4b148';
  } else if (state === 'E') {
    fill = '#71d44a';
  }

  return (
    <g>
      <rect
        width={width}
        height={height}
        x={x}
        y={y}
        rx={rx}
        ry={ry}
        fill={fill}
      />
      <PolicyArrow
        policy={policy}
        rows={rows}
        columns={columns}
        i={i}
        j={j}
        state={state}
      />
    </g>
  );
};
