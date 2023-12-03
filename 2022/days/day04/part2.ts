// Camp cleanup day 4 part 2

export default function part2(data: string) {
  const pairs = data.split("\n").filter(d => d !== "");

  const rangeToArr = (range: string) => {
    const [start, end] = range.split("-").map(Number);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const overlapCount = pairs.reduce((acc, pair) => {
    const [first, second] = pair.split(",");
    const [largerRange, smallerRange] = [rangeToArr(first), rangeToArr(second)].sort((a, b) => b.length - a.length);
    const overlapArr = largerRange.filter(num => smallerRange.includes(num));
    if(overlapArr.length > 0) acc += 1;
    return acc;
  }, 0);

  return overlapCount;
}
