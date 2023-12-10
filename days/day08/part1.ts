export default function part1(data: string) {

  let tree = []

  const lines = data.split("\n")
  const instructions = lines[0].replaceAll('R', 1).replaceAll('L', 0).split("");
  lines.slice(2).forEach(l => {
    l = l.replaceAll(/[\s\(\)]/g, '')
    const [key, options] = l.split("=").map((_, i) => i === 1 ? _.split(",") : _)
    tree[key] = options
  })

  console.log(tree, instructions)
  let steps = 0;
  let loops = 0;
  let current = "AAA"
  let found = false
  search: while (!found) {
    for (let step of instructions) {
      const item = tree[current][step];
      steps++
      if (item === "ZZZ") {
        console.log("FOUD ZZZ!", steps, current, item);
        break search
      }
      current = item
    }
    loops++
    if (loops % 10000 === 0) {
      console.log("LOOPS", loops, steps, current);
    }
  }
  return steps
}
