export default function part1(data: string) {
  const obstacles: number[][] = [];
  let pos!: [number, number];
  const xy = data.replaceAll(/\r/g, '').split(/\n/).map((d, y) => d.split("").map((c, x) => {
    if (c === "#") obstacles.push([x, y]);
    if (c === "^") pos = [x, y];
    return c;
  }));

  const dirs = [
    [0, -1],
    [1, 0],
    [0, 1],
    [-1, 0]
  ]

  const visited = new Map<string, number>();
  let moves = 0;

  let rotates = 0;

  const squareStatus = (cords: [number, number]): ("open" | "oob" | "obstacle") => {
    const [x, y] = cords;
    if (x < 0 || x >= xy.length || y < 0 || y >= xy[0].length) return "oob";
    if (obstacles.some(o => o[0] === x && o[1] === y)) return "obstacle";
    return "open";
  }

  let searching = true;
  const moveForwrd = () => {
    const thisDir = dirs[rotates % dirs.length];
    const nextSquare: [number, number] = [pos[0] + thisDir[0], pos[1] + thisDir[1]];
    const status = squareStatus(nextSquare);
    console.log(`${pos} (${thisDir}) -> ${nextSquare} (${status})`)
    if (status === "open") {
      pos = nextSquare;
      visited.set(pos.join(","), 1);
      moves++;
    } else if (status === "obstacle") {
      rotates++
      moveForwrd();
    } else if (status === "oob") {
      console.log("END", rotates, thisDir, visited.size)
      searching = false;
    }
  }

  visited.set(pos.join(","), 1);
  while (searching) {
    moveForwrd();
  }

  return [visited.size, moves]

}
