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

export default function part2(data: string) {
  let start;
  let maxDist = 0

  const field = data.split("\n").map((l, row) => l.split("").map((g, col) => {
    if (g === ".") return 0;
    if (g === "S") start = [col, row]
    return [key[g], g]
  }))
  let distanceField = Array.from({ length: field.length }, () => Array.from({ length: field[0].length }, () => -1))

  const explorePath = (x, y, n = 0) => {
    const newLocationsFromSpot = []
    if (!field[y] || !field[y][x] || distanceField[y][x] !== -1) {
      return null
    }
    if (field[y][x][1] === "S") {
      if (n !== 0) return null
      distanceField[y][x] = 0
    }

    const pipeSpot = field[y][x][0]
    distanceField[y][x] = n

    const isValid = (x, y, d) => field[y] && field[y][x] && field[y][x][0][d]

    if (maxDist < n) maxDist = n
    if (pipeSpot[0] && isValid(x, y - 1, 2)) newLocationsFromSpot.push([x, y - 1])
    if (pipeSpot[1] && isValid(x + 1, y, 3)) newLocationsFromSpot.push([x + 1, y])
    if (pipeSpot[2] && isValid(x, y + 1, 0)) newLocationsFromSpot.push([x, y + 1])
    if (pipeSpot[3] && isValid(x - 1, y, 1)) newLocationsFromSpot.push([x - 1, y])
    if (newLocationsFromSpot.length < 1) return null
    return newLocationsFromSpot
  }


  let pipes = [start]
  let i = 0
  while (pipes.length > 0) {
    let newPipes = []
    for (let p of pipes) {
      newPipes.push(explorePath(p[0], p[1], i))
    }
    i++
    pipes = newPipes.filter(Boolean).flat()
  }


  const dirCheck = (x, y) => {
    if (!distanceField[y] || !distanceField[y][x] || distanceField[y][x] === -2) return false;
    if (distanceField[y][x] === -1) return -1
    if (distanceField[y][x] > -1) return true
  }

  const dirs = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1]
  ]
  const checkSpot = (x, y) => {
    const checks = dirs.map(d => dirCheck(x + d[0], y + d[1]))
    if (checks.some(s => s === false)) {
      if (distanceField[y] && distanceField[y][x] === -1) distanceField[y][x] = -2
      for (let d of dirs) {
        if (dirCheck(x + d[0], y + d[1]) === -1) {
          checkSpot(x + d[0], y + d[1])
          break
        }
      }
    } else return true
  }

  for (let y = 0; y < distanceField.length; y++) {
    for (let x = 0; x < distanceField[y].length; x++) {
      if (distanceField[y][x] === -1) {
        const hit = checkSpot(x, y)
      }
    }
  }


  // console.table(distanceField)

  const nums = distanceField.flat().filter(n => n === -1)
  return nums.length
}