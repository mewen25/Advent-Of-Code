// Camp cleanup day 4 part 1

export default function part1(data: string) {
  const pairs = data.split("\n").filter(d => d !== "");

  const rangeToArr = (range: string) => {
    const [start, end] = range.split("-").map(Number);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const containedCount = pairs.reduce((acc, pair) => {
    const [first, second] = pair.split(",");
    const [smallerRange, largerRange] = [rangeToArr(first), rangeToArr(second)].sort((a, b) => a.length - b.length);
    if(smallerRange.every(num => largerRange.includes(num))) acc += 1;
    return acc;
  }, 0);

  return containedCount;
}
