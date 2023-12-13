const galaxyDict = {};

const dist = {
  m: 1_000_000,
};

export default function part2(data: string) {
  let galaxyNumber = 0;

  let convertedData = data.split("\n").map((l, row) => {
    return l.split("").map((g, col) => {
      if (g === ".") return "-1";
      galaxyNumber++;
      return galaxyNumber;
    });
  });

  let expanded = convertedData;

  function insertRowOrColumn(matrix, index, isRow) {
    if (isRow) {
      matrix[index] = matrix[index].map((m) => "m");
    } else {
      for (let i = 0; i < matrix.length; i++) {
        matrix[i][index] = "m";
      }
    }
  }

  let rowsToInsert = [];
  row: for (let x = 0; x < convertedData.length; x++) {
    for (let y = 0; y < convertedData[0].length; y++) {
      if (convertedData[x][y] !== "-1") continue row;
    }
    rowsToInsert.push(x);
  }

  let colsToInsert = [];
  col: for (let y = 0; y < convertedData[0].length; y++) {
    for (let x = 0; x < convertedData.length; x++) {
      if (convertedData[x][y] !== "-1") continue col;
    }
    colsToInsert.push(y);
  }

  console.log("rowsToInsert", rowsToInsert);
  console.log("colsToInsert", colsToInsert);

  for (let i = 0; i < rowsToInsert.length; i++) {
    insertRowOrColumn(expanded, rowsToInsert[i], true);
  }

  for (let i = 0; i < colsToInsert.length; i++) {
    insertRowOrColumn(expanded, colsToInsert[i], false);
  }

  const field = expanded.map((l, row) => {
    const r = l.map((_l) => _l === "m" ? dist["m"] : 1);
    return l.map((g, col) => {
      if (g === "-1") return "";
      if (g === "m") return "m";

      const colTotal = r.slice(0, col).reduce((a, b) => a + b, 0);

      let rowTotal = expanded.map((l) => l[col]).map((n) =>
        n === "m" ? dist["m"] : 1
      ).slice(0, row).reduce((a, b) => a + b, 0);

      galaxyDict[g] = [
        colTotal,
        rowTotal,
      ];
      return [colTotal, rowTotal];
    });
  });

  const getPairDist = (g1, g2) => {
    if (!galaxyDict[g1] || !galaxyDict[g2]) {
      return -1;
    }
    const [x1, y1] = galaxyDict[g1];
    const [x2, y2] = galaxyDict[g2];
    const diff = Math.abs(x1 - x2) + Math.abs(y1 - y2);
    return diff;
  };

  let pairs = {};

  for (let i = 1; i <= galaxyNumber; i++) {
    for (let j = 1; j <= galaxyNumber; j++) {
      const nums = [i, j].sort((a, b) => a - b).join("-");
      if (i === j || pairs[nums]) continue;
      pairs[nums] = getPairDist(i, j);
    }
  }

  console.table(field);

  return Object.values(pairs).reduce((a, b) => a + b, 0);
}
