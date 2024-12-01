export default function part1(data: string) {
  let lines = data.split("\n");
  lines = lines.map((d) => d.replaceAll(/\s+/g, "-"));
  let col1 = [];
  let col2 = [];
  lines.forEach((line) => {
    const [col1Val, col2Val] = line.split("-");
    console.log(line);
    col1.push(Number(col1Val));
    col2.push(Number(col2Val));
  });

  col1 = col1.sort((a, b) => a - b);
  col2 = col2.sort((a, b) => a - b);

  let sum = 0;
  for (let i = 0; i < col1.length; i++) {
    const dist = Math.abs(col1[i] - col2[i]);
    console.log(dist, sum, col1[i], col2[i]);
    sum += dist;
  }

  return sum;
}
