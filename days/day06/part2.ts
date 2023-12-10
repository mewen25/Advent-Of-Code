export default function part2(data: string) {
  const [time, distance] = data.replaceAll(/(Time:\s+|Distance:\s+)/g, '').split("\n").map(s => s.replaceAll(/\s/g, '')).map(Number)
  let beats = 0
  for (let i = 0; i < distance; i++) {
    const max = i * (time - i)
    if (max > distance) beats++
    // if (i % 10000 === 0) console.log(i, beats)
  }
  return beats
}
