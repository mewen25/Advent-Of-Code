const dirs = {
  "U": [0, -1],
  "D": [0, 1],
  "L": [-1, 0],
  "R": [1, 0],
};

export default function part1(data: string) {
  let maxR = 0, maxD = 0;
  let _width = 0;
  let _height = 0;

  const lines = data.split("\n").filter((l) => l !== "").map((l) => {
    const [dir, _n, col] = l.split(" ");
    const n = Number(_n);

    if (dir === "R") _width = Math.max(0, _width + n);
    if (dir === "L") _width = Math.max(0, _width - n);
    if (dir === "U") _height = Math.max(0, _height + n);
    if (dir === "D") _height = Math.max(0, _height - n);

    maxR = Math.max(maxR, _width);
    maxD = Math.max(maxD, _height);

    return { dir, n, col: col.replace(/[\(\)]/g, "") };
  });

  let map = new Array(maxD + 1).fill(".").map(() =>
    new Array(maxR + 1).fill(".")
  );

  let m = 0;
  let position = [0, 0];
  let verts = [];
  for (let line of lines) {
    const { dir, n, col } = line;
    for (let i = 0; i < n; i++) {
      position = [position[0] + dirs[dir][0], position[1] + dirs[dir][1]];
      if (!map[position[1]]) map[position[1]] = new Array(maxR + 1).fill(".");
      map[position[1]][position[0]] = "#";
      verts.push([position[0], position[1]]);
      m++;
    }
  }

  function areaFromCoords(coordArray) {
    var x = coordArray,
      a = 0;
    if (x.length % 2) return;
    for (var i = 0, iLen = x.length - 2; i < iLen; i += 2) {
      a += x[i] * x[i + 3] - x[i + 2] * x[i + 1];
      console.log({ a });
    }
    return Math.abs(a / 2);
  }

  const len = verts.length;
  let area = areaFromCoords(verts.flat()) + len / 2 + 1;
  return area;
}
