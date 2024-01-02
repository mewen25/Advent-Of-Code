export default function part1(data: string) {
  const lines = data.split("\n").filter(l => l !== "").map(l => {
    const [pos1, pos2] = l.split("~").map(p => p.split(",").map(Number))
    return [pos1, pos2]
  })
  return lines
}
