export default function part1(data: string) {
  const lines = data.split("\n").filter((l) => l !== "");
  const seeds = lines[0].match(/[0-9].+/)[0].split(" ").map(Number);
  lines.shift();
  // console.log(seeds);
  // console.log(lines);

  const cache = {};

  const convertMap = (map, value) => {
    const { from, to, contents } = map;
  };

  const instructions = lines.map((l, i, arr) => {
    // @ts-ignore
    if (isNaN(l[0])) {
      const [from, to] = l.replace("-to-", "-").replace(" map:", "").split("-");
      // console.log("WORD LINE", l);
      // console.log({ from, to });
      let contents = [];
      let _i = 1;
      while (true) {
        if (isNaN(Number(lines[i + _i]?.[0]))) break;
        contents.push(lines[i + _i].split(" ").map(Number));
        _i++;
      }
      return { from, to, contents };
    }
  }).filter(Boolean);

  for (let map of instructions) {
    let match = null;
    const seed = 14;
    for (let range of map.contents) {
      const [destination, source, length] = range;
      const isRange = seed >= source && seed <= source + length - 1;
      console.log(
        "is range",
        seed,
        source,
        source + length - 1,
        isRange,
      );
      if (isRange) {
        console.log("OUTPUT", (destination - source) + seed);
        break;
      }
    }
  }

  // return instructions;
}
