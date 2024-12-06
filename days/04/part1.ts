export default function part1(data: string) {
  const code = "XMAS";
  const xy = data.split(/\n|\r/).map((d) => d.split(""));

  const dirs = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
    [1, 1],
    [-1, -1],
    [1, -1],
  ]

  const lookForMatch = (row, col, prevDir) => {
    console.log("looking", row, col, prevDir)
    for (let dir of dirs) {
      if (prevDir && dir[0] === prevDir[0] && dir[1] === prevDir[1]) continue;
      const [x, y] = [row + dir[0], col + dir[1]];
      console.log(x, y, dir, xy[x]?.[y])
    }
    // const validDirs = dirs.filter(d => (!prevDir || (d[0] !== prevDir[0] && d[1] !== prevDir[1])) && xy[row + d[0]])
    // console.log(validDirs, row, col, prevDir, dirs.map(d => xy[row + d[0]]))
  }

  rows: for (let x = 0; x < xy.length; x++) {
    const row = xy[x];
    for (let y = 0; y < row.length; y++) {
      const col = row[y];
      console.log(x, y, col)
      lookForMatch(x, y, null)
      break rows
    }
  }

  // console.log(xy);
  return 0;
}
