export default function part2(data: string) {
  let total = 0
  data.split("\n").map((g, gameId) => {

    let str = g.split(":")[1];
    if (!str) {
      return null
    }
    const colourSums = {
      blue: 1,
      red: 1,
      green: 1
    }

    str.replaceAll(';', ',').split(",").forEach((cube) => {
      const [n, c] = cube.trim().split(" ");
      if (Number(n) > colourSums[c]) {
        colourSums[c] = Number(n)
      }
    })

    // console.log(colourSums)
    total += colourSums.blue * colourSums.red * colourSums.green
  })
  // console.log({ total })
  return total
}
