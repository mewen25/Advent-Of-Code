export default function part1(data: string) {
  const rows = data.split("\n").map((d) => d.split(" ").map(Number));
  console.log(rows);
  const safes = rows.filter((row, rowIdx) => {
    for (let i = 0; i < row.length; i++) {
      if (i === row.length - 1) continue;
      const diff = Math.abs(row[i] - row[i + 1]);
      if (diff === 0 || diff > 3) {
        console.log("fail", row[i], row[i + 1], "_", rowIdx, i);
        return false;
      }
    }

    console.log(row, rowIdx);
    return true;
  });

  console.log(safes);

  return safes.length;
}
