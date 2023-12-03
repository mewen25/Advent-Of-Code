

export default function part1(data: string) {
  let total = 0
  let wins = 0;
  const games = data.split("\n").map((g, gameId) => {

    let str = g.split(":")[1];
    if (!str) {
      return null
    }
    const gameTotals = {
      blue: 14,
      red: 12,
      green: 13
    }

    const isLoss = str.replaceAll(';', ',').split(",").reduce((acc, cur) => {
      if (acc === true) return acc
      const [n, c] = cur.trim().split(" ");
      gameTotals[c] -= Number(n);
      if (gameTotals[c] < 0) {
        return true
      }
      gameTotals[c] += Number(n);
      return acc
    }, false)

    if (isLoss) {
      return null
    }

    total += gameId + 1
    wins++
  })
  // console.log({ total })
  return total
}
