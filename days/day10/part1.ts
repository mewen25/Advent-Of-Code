const key = {
  ".": [0, 0, 0, 0],
  "|": [1, 0, 1, 0],
  "-": [0, 1, 0, 1],
  "L": [1, 1, 0, 0],
  "J": [1, 0, 0, 1],
  "7": [0, 0, 1, 1],
  "F": [0, 1, 1, 0],
  "S": [1, 1, 1, 1]
};
const key2 = {
  ".": "0000",
  "|": "1010",
  "-": "0101",
  "L": "1100",
  "J": "1001",
  "7": "0011",
  "F": "0110",
  "S": "1111"
};

const reverseKey = {
  '0': '.',
  "0000": ".",
  "1010": "|",
  "0101": "-",
  "1100": "L",
  "1001": "J",
  "0011": "7",
  "0110": "F",
  "1111": "S"
}

export default function part1(data: string) {
  let start;
  let maxDist = 0
  const field = data.split("\n").map((l, row) => l.split("").map((g, col) => {
    if (g === ".") return 0;
    if (g === "S") start = [col, row]
    return [key[g], g]
  }))

  let distanceField = Array.from({ length: field.length }, () => Array.from({ length: field[0].length }, () => -1))

  let found = false;

  const explorePath = (x, y, n = 0): null | [[number, number], [number, number]] => {
    let _pipes = []
    if (found) return
    if (!field[y] || !field[y][x] || distanceField[y][x] !== -1) {
      return null
    }
    if (field[y][x][1] === "S" && n !== 0) {
      found = true
      return null
    }

    const pipeSpot = field[y][x][0]
    distanceField[y][x] = n
    if (n === 6903) {
      console.log("MAX???", pipeSpot);
      console.table([distanceField[y - 1][x - 1], distanceField[y - 1][x], distanceField[y - 1][x + 1], distanceField[y][x - 1], distanceField[y][x + 1], distanceField[y + 1][x - 1], distanceField[y + 1][x], distanceField[y + 1][x + 1], distanceField[y][x]])
    }
    if (maxDist < n) maxDist = n

    // console.log("explore", x, y, pipeSpot, n)

    if (pipeSpot[0] === 1) _pipes.push([x, y - 1])
    if (pipeSpot[1] === 1) _pipes.push([x + 1, y])
    if (pipeSpot[2] === 1) _pipes.push([x, y + 1])
    if (pipeSpot[3] === 1) _pipes.push([x - 1, y])

    if (_pipes.length < 1) return null

    return _pipes
  }


  let pipes = [start]
  let i = 0
  while (!found && pipes.length > 0 && i < 10000) {
    let newPipes = []
    for (let p of pipes) {
      newPipes.push(explorePath(p[0], p[1], i))
    }
    i++
    pipes = newPipes.filter(Boolean).flat()
    // console.clear()
    // console.table(distanceField)
    // await new Promise(r => setTimeout(r, 1))
  }

  console.log("DONE!", pipes, start, distanceField.slice(-4))
  const nums = distanceField.flat().filter(n => n !== -1)
  const max = Math.max(...nums)
  const min = Math.min(...nums)

  // console.table(distanceField)
  // Deno.writeTextFileSync("distances.txt", JSON.stringify(distanceField))
  return max
  // return nums[nums.indexOf(Math.ceil(max / 2))]
}