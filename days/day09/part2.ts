export default function part2(data: string) {
  const lines = data.split("\n").map(l => l.split(" ").map(Number));

  let sum = 0
  for (let line of lines) {
    line = line.reverse()
    const len = line.length;
    let last = line.at(-1);

    for (let i = 0; i < len; i++) {
      for (let j = len - 1; j > i; j--) {
        line[j] -= line[j - 1];
      }
      console.log(line)
      last += line.at(-1)!;
    }
    sum += last
  }

  return sum;
}
