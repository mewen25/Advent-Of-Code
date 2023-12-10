const fetchInstructions = (data: string) => {
  const lines = data.split("\n").filter((l) => l !== "");
  const seeds = lines[0].match(/[0-9].+/)[0].split(" ").map(Number);
  lines.shift();

  const instructions = lines.map((l, i, arr) => {
    if (isNaN(l[0])) {
      const [from, to] = l.replace("-to-", "-").replace(" map:", "").replace(/\r/, '').split("-");
      let contents = [];
      let _i = 1;
      while (true) {
        if (isNaN(Number(lines[i + _i]?.[0]))) break;
        contents.push(lines[i + _i].split(" ").map(Number));
        _i++;
      }
      contents = contents.filter(c => c[0] !== 0 || c.length > 1)
      return { from, to, contents };
    }
  }).filter(Boolean);
  return [seeds, instructions]
}

export default function part1(data: string) {
  const [seeds, instructions] = fetchInstructions(data);

  console.log("SEEDS", seeds);
  console.log("INSTRUCTIONS", instructions);
  // return

  let lowestSeed = null
  for (let seed of seeds) {
    let temp = seed
    for (let map of instructions) {

      const result = map.contents.reduce((acc, [destination, source, length]) => {
        const isRange = temp >= source && temp <= source + length - 1;
        if (isRange) {
          acc = (destination - source) + temp
        }
        return acc;
      }, temp);

      temp = result
    }
    console.log("temp result", temp, seed)
    if (!lowestSeed || temp < lowestSeed) lowestSeed = temp
  }

  return lowestSeed;
}
