const flatten = (arr: any[]) => [].concat.apply([], arr);

const product = (...sets: any[]) =>
  sets.reduce(
    (acc, set) => flatten(acc.map((x: any) => set.map((y: any) => [...x, y]))),
    [[]]
  );

const get_vec4 = (x: number, y: number, z: number, w: number) => {
  let vec = new Array(4);
  for (let i = 0; i < vec.length; i++) {
    vec[i] = new Array(1);
  }
  vec[0][0] = x;
  vec[1][0] = y;
  vec[2][0] = z;
  vec[3][0] = w;
  return vec;
};

const get_points: () => number[][][] = () => {
  const size = 1;
  let tesseract = product(
    [-size, size],
    [-size, size],
    [-size, size],
    [-size, size]
  );
  tesseract = tesseract.map((x: [x: number, y: number, z: number, w: number]) =>
    get_vec4.apply(null, x)
  );
  return tesseract;
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
  for (let c of connection) {
    if (c[0] == i && c[1] == j) {
      return true;
    }
  }
  return false;
};

const get_connections = (points: any[]) => {
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

  let c = new Array(a.length);
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
  let proj = new Array(tesseract.length);
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
