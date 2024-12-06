export default function part1(data: string) {
  const rows = data.split("\n").map((d) => d.split(" ").map(Number));
  // console.log(rows);
  const safes = rows.filter((row, rowIdx) => {
    let increaseSwitch: boolean | null = null;
    for (let i = 0; i < row.length; i++) {
      if (i === row.length - 1) continue;
      const [compare1, compare2] = [row[i], row[i + 1]];

      const diff = Math.abs(compare1 - compare2);

      const isIncrease = compare1 < compare2;
      if (increaseSwitch === null) increaseSwitch = isIncrease

      if (diff === 0 || diff > 3 || increaseSwitch !== isIncrease) {
        console.log("fail", row[i], row[i + 1], Math.abs(row[i] - row[i + 1]), "_", rowIdx, i);
        return false;
      }

    }

    console.log(row, rowIdx);
    return true;
  });

  console.log(safes, safes.length, rows.length);

  return safes.length;
}
