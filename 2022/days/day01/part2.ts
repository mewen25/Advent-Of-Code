export default function part2(data: string) {
  const elves: number[] = [];
  let currentElf = 0;
  const split = data.split("\r\n");

  split.forEach(_value => {
    if(_value == "") {
      elves.push(currentElf)
      currentElf = 0
    } else currentElf += parseInt(_value)
  });
  const topThreeTotal = elves.sort((a, b) => b - a).slice(0,3).reduce((a, b) => a + b, 0);
  return topThreeTotal;
}
