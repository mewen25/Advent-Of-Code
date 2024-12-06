export default function part2(data: string) {
  const obstacles: number[][] = [];
  let pos!: [number, number];
  let originalPos!: [number, number];
  const xy = data.replaceAll(/\r/g, '').split(/\n/).map((d, y) => d.split("").map((c, x) => {
    if (c === "#") obstacles.push([x, y]);
    if (c === "^") originalPos = [x, y];
    return c;
  }));

  const dirs = [
    [0, -1],
    [1, 0],
    [0, 1],
    [-1, 0]
  ]

  let visited = new Map<string, number>();
  let moves = 0;
  let searchPath = new Map<string, boolean>();
  let trackPath = false;
  let rotates = 0;

  let obsHits: string[] = [];

  const squareStatus = (cords: [number, number]): ("open" | "oob" | "obstacle") => {
    const [x, y] = cords;
    if (x < 0 || x >= xy.length || y < 0 || y >= xy[0].length) return "oob";
    if (obstacles.some(o => o[0] === x && o[1] === y)) return "obstacle";
    return "open";
  }


  let searching = true;
  const moveForward = () => {
    const thisDir = dirs[rotates % dirs.length];
    const nextSquare: [number, number] = [pos[0] + thisDir[0], pos[1] + thisDir[1]];
    const posString = pos.join("_");
    const dirPosString = `${posString}_${thisDir.join("_")}`;
    const status = squareStatus(nextSquare);
    if (status === "open") {
      pos = nextSquare;
    } else if (status === "obstacle") {
      if (obsHits.includes(dirPosString)) {
        searching = false;
        return null
      }
      obsHits.push(dirPosString);
      rotates++
      moveForward();
    } else if (status === "oob") {
      searching = false;
      return true;
    }
    return true;
  }

  console.time("start")
  let loops = 0;
  searching = true;
  scan: for (let y = 0; y < xy.length; y++) {
    for (let x = 0; x < xy[0].length; x++) {
      // if (x !== 3 || y !== 6) continue;
      const thisLetter = xy[y][x];
      // if (thisLetter !== ".") continue;
      obstacles.push([x, y]);
      // console.log("TESTING obstacle at", x, y, thisLetter, originalPos, xy[y][x])
      // console.log(xy)
      visited = new Map<string, number>();
      moves = 0;
      searchPath = new Map<string, boolean>();
      trackPath = false;
      rotates = 0;
      searching = true;
      pos = originalPos;
      obsHits = [];

      while (searching) {
        if (moveForward() == null) {
          console.log("loop found", x, y)
          loops++
          break;
        }
      }
      obstacles.pop();
    }
  }

  console.timeEnd("start")
  return loops
}
