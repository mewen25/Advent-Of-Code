const dirs = {
  "U": [0, -1],
  "D": [0, 1],
  "L": [-1, 0],
  "R": [1, 0],
};
const _dirs = ["R", "D", "L", "U"];

export default function part2(data: string) {
  let maxR = 0, maxD = 0;
  let _width = 0;
  let _height = 0;

  const lines = data.split("\n").filter((l) => l !== "").map((l) => {
    const [_, __, _col] = l.split(" ");
    const col = _col.replace(/[\(\)\#]/g, "");
    const hex = col.slice(0, 5);
    const n = parseInt(hex, 16);
    const dir = _dirs[col.slice(-1)];

    // console.log({ n, dir, hex });

    if (dir === "R") _width = Math.max(0, _width + n);
    if (dir === "L") _width = Math.max(0, _width - n);
    if (dir === "U") _height = Math.max(0, _height + n);
    if (dir === "D") _height = Math.max(0, _height - n);

    maxR = Math.max(maxR, _width);
    maxD = Math.max(maxD, _height);

    return { dir, n, col: col };
  });

  console.log({ _width, _height, maxR, maxD });
  let position = [0, 0];
  let verts = [];
  for (let line of lines) {
    const { dir, n, col } = line;
    for (let i = 0; i < n; i++) {
      position = [position[0] + dirs[dir][0], position[1] + dirs[dir][1]];
      try {
        verts.push(position[0], position[1]);
      } catch (e) {
        console.log(verts.length, i);
      }
    }
  }

  console.log("verts", verts.length);

  function areaFromCoords(coordArray) {
    var x = coordArray,
      a = 0;
    if (x.length % 2) return;
    for (var i = 0, iLen = x.length - 2; i < iLen; i += 2) {
      a += x[i] * x[i + 3] - x[i + 2] * x[i + 1];
    }
    return Math.abs(a / 2);
  }

  const len = verts.length;
  let area = areaFromCoords(verts.flat()) + len / 2 + 1;
  return area;
}
