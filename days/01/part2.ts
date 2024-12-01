export default function part2(data: string) {
  let lines = data.split("\n");
  lines = lines.map((d) => d.replaceAll(/\s+/g, "-"));
  let col1 = [];
  let col2 = [];

  let col2NumberCount = new Map();

  lines.forEach((line) => {
    const [col1Val, col2Val] = line.split("-");
    console.log(line);
    col1.push(Number(col1Val));
    col2.push(Number(col2Val));
  });
  let sum = 0;

  col2.forEach((val) => {
    col2NumberCount.set(
      String(val),
      (col2NumberCount.get(String(val)) || 0) + 1,
    );
  });

  col1.forEach((val) => {
    sum += val * (col2NumberCount.get(String(val)) || 0);
  });

  return sum;
}
