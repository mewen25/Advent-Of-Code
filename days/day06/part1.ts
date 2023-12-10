export default function part1(data: string) {
  const [time, distance] = data.replaceAll(/(Time:\s+|Distance:\s+)/g, '').replaceAll(/\s\s+/g, ' ').split("\n").map(s => s.split(" ").map(Number))
  const races = time.map((t, i) => [t, distance[i]])
  console.log(races)
  let beats = Array.from({ length: races.length }, () => 0)
  for (let r = 0; r < races.length; r++) {
    const race = races[r]
    for (let i = 0; i < race[1]; i++) {
      const max = i * (race[0] - i)
      // console.log(race[0], max)
      if (max > race[1]) beats[r]++
    }
  }

  let total;
  for (let _beat of beats) {
    if (!total) total = _beat;
    else total *= _beat
  }
  console.log(beats, total)
  return total
}
