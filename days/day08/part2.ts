

export default function part2(data: string) {
  let tree = []

  const lines = data.split("\n")
  const instructions = lines[0].replaceAll('R', 1).replaceAll('L', 0).split("");
  lines.slice(2).forEach(l => {
    l = l.replaceAll(/[\s\(\)]/g, '')
    const [key, options] = l.split("=").map((_, i) => i === 1 ? _.split(",") : _)
    tree[key] = options
  })

  const movers = Object.keys(tree).filter(t => t[2] === "A").reduce((acc, cur, i) => {
    acc[i] = [cur, 0]
    return acc
  }, [])

  const APaths = Object.keys(tree).filter(t => t[2] === "A");
  const ZPaths = Object.keys(tree).filter(t => t[2] === "Z");

  console.log(tree, instructions, { APaths, ZPaths })
  // return
  let steps = 0;
  let loops = 0;
  let highestZees = 0;

  moverSearch: for (let i = 0; i < movers.length; i++) {
    const mover = movers[i]
    console.log("searching", i)

    while (true) {
      for (let step of instructions) {
        movers[i][1]++
        steps++
        movers[i][0] = tree[mover[0]][step];
        if (movers[i][0][2] === "Z") {
          console.log("Z found for", i, mover[1])
          continue moverSearch;
        }
      }
    }
  }

  console.log("FINISHED", steps, movers)
  const highestPath = movers.sort((a, b) => b[1] - a[1])[0][1]

  const lcm = (...arr) => {
    const gcd = (x, y) => (!y ? x : gcd(y, x % y));
    const _lcm = (x, y) => (x * y) / gcd(x, y);
    return [...arr].reduce((a, b) => _lcm(a, b));
  };

  return lcm(...movers.map(m => m[1]))

}
