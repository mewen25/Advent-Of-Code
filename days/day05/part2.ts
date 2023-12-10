const fetchInstructions = (data: string) => {
  const lines = data.split("\n").filter((l) => l !== "");
  let seeds = lines[0].match(/[0-9].+/)[0].split(" ").map(Number);
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

  seeds = seeds.reduce((acc, cur, i) => {
    if (i == 0) {
      acc[0] = [cur];
      return acc
    }
    const idx = Math.floor(i / 2);
    if (!acc[idx]) acc[idx] = []
    acc[idx].push(cur)
    return acc
  }, [])

  return [seeds, instructions]
}

export default function part2(data: string) {


  let [seeds, instructions] = fetchInstructions(data);

  let saved = 0
  seeds = seeds.sort((a, b) => a[0] - b[0])
  // seeds = seeds.reduce((acc, cur, i) => {
  //   const [n1, r] = cur;
  //   const n2 = n1 + r //220

  //   if (i === 8) {
  //     console.log("test", n2, acc[i + 1][0])
  //   }

  //   for (let i = 1; i < acc.length - 1; i++) {
  //     if (acc[i]?.[0] < n1) {
  //       console.log("range overlap", n1, '->', acc[i][0])
  //       saved += (n1 + 1) - acc[i][0]
  //       acc[i][0] = n1 + 1
  //     }
  //   }

  //   acc[i] = cur;
  //   return acc;
  // }, seeds)
  console.log("seeds", seeds, "saved", saved)
  // return
  // console.log("INSTRUCTIONS", _seed[0].replace("INSTRUCTIONS", "map((acc, cur, i) => {

  let seedCache = {}

  // console.log("SEEDS", seeds);
  // console.log("INSTRUCTIONS", instructions);
  // return
  let x = 0
  console.log("CHECKING", seeds)
  let lowestSeed = null
  for (let _seed of seeds) {
    x = 0
    console.log("SEED PAIR", _seed)
    for (let seed = _seed[0]; seed < _seed[0] + _seed[1]; seed++) {
      let temp = seed
      for (let map of instructions) {
        let _temp = temp
        for (let cont of map.contents) {
          if (temp >= cont[1] && temp <= cont[1] + cont[2] - 1) _temp = (cont[0] - cont[1]) + temp
        }
        temp = _temp
      }
      x++
      if (!lowestSeed || temp < lowestSeed) lowestSeed = temp
      if (x % (Math.floor(_seed[0] / 100)) === 0) {
        console.log("PROGRESS", x, _seed[0], (_seed[0] + _seed[1]) - seed)
      }
    }
  }

  return lowestSeed;
}
