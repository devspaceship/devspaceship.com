const flatten = <T>(arr: T[][]) => ([] as T[]).concat(...arr);

const product = <T>(...sets: T[][]) =>
  sets.reduce(
    (acc, set) => flatten(acc.map((x) => set.map((y) => [...x, y]))),
    [[]] as T[][],
  );

const get_vec4 = (...coordinates: number[]): number[][] => {
  return coordinates.map((coordinate) => [coordinate]);
};

const get_points: () => number[][][] = () => {
  const size = 1;
  return product(
    [-size, size],
    [-size, size],
    [-size, size],
    [-size, size],
  ).map((x: number[]) => get_vec4(...x));
};

const count_differences = (vector_a: number[][], vector_b: number[][]) => {
  let c = 0;
  for (let i = 0; i < 4; i++) {
    if (vector_a[i][0] != vector_b[i][0]) {
      c++;
    }
  }
  return c;
};

const connection_exists = (connection: number[][], i: number, j: number) => {
  for (const c of connection) {
    if (c[0] == i && c[1] == j) {
      return true;
    }
  }
  return false;
};

const get_connections = (points: number[][][]) => {
  const connections = [];
  for (let i = 0; i < points.length; i++) {
    for (let j = 0; j < points.length; j++) {
      if (
        count_differences(points[i], points[j]) == 1 &&
        !connection_exists(connections, j, i)
      ) {
        connections.push([i, j]);
      }
    }
  }
  return connections;
};

const get_tesseract = () => {
  const points = get_points();
  const connections = get_connections(points);
  return { points, connections };
};

const get_rot4 = (a: number, b: number) => [
  [Math.cos(a), -Math.sin(a), 0, 0],
  [Math.sin(a), Math.cos(a), 0, 0],
  [0, 0, Math.cos(b), -Math.sin(b)],
  [0, 0, Math.sin(b), Math.cos(b)],
];

function matmul(a: number[][], b: number[][]): number[][] {
  if (a[0].length != b.length) {
    throw "Dimensions do not accord.";
  }

  const c = new Array(a.length);
  for (let i = 0; i < c.length; i++) {
    c[i] = new Array(b[0].length);
  }

  for (let i = 0; i < c.length; i++) {
    for (let j = 0; j < c[0].length; j++) {
      let s = 0;
      for (let k = 0; k < a[0].length; k++) {
        s += a[i][k] * b[k][j];
      }
      c[i][j] = s;
    }
  }

  return c;
}

function project_tesseract(tesseract: number[][][], d: number) {
  const proj = new Array(tesseract.length);
  for (let i = 0; i < tesseract.length; i++) {
    const stereographic = d / (d - tesseract[i][3][0]);
    proj[i] = [
      stereographic * tesseract[i][0][0],
      stereographic * tesseract[i][1][0],
      stereographic * tesseract[i][2][0],
    ];
  }
  return proj;
}

export { get_tesseract, get_rot4, matmul, project_tesseract };
