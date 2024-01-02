function duplicate(a: string, amount: number, join = null) {
  let result = [];
  for (let i = 0; i < amount; i++) {
    result.push(a);
  }
  if (join) return result.join(join);
  return result;
}

const cache = new Map<string, number>();

export default function part2(data: string) {
  let total = 0;
  data.split("\n").map(
    (l) =>
      [
        duplicate(l.split(" ")[0], 5, "?"),
        duplicate(l.split(" ")[1], 5),
        l.split(" ")[0],
      ].join(
        " ",
      ),
  ).map((l, idx) => {
    if (idx !== 0) return;
    console.log("l", l);
    // return;
    let [springs, _notes, pattern] = l.split(" ");
    // springs = springs + "?" + springs + "?" + springs + "?" + springs;
    const len = springs.length;
    let notes = _notes.split(",").map(Number);
    // notes = [...notes, ...notes, ...notes, ...notes, ...notes];
    const notesCheck = notes.join("-"); //sort((a, b) => a - b)
    const nTotal = notes.reduce((acc, cur) => acc + cur, 0);

    console.log(
      "springs",
      springs,
      "notes",
      notes,
      notesCheck,
      nTotal,
      pattern,
    );

    const lineCombinations = [];

    const chunkSearch = (str, target, i) => {
      let j = 0;
      while (true) {
        if (!str[i + j] || str[i + j] !== target) break;
        j++;
      }
      return j;
    };

    const isValid = (combination) => {
      let chunks = [];
      for (let i = 0; i < combination.length; i++) {
        if (combination[i] !== "#") continue;
        const s = chunkSearch(combination, "#", i);
        chunks.push(s);
        i += Math.max(0, s - 1);
      }
      if (chunks.length === 0 || notes.length === 0) {
        return false;
      }
      if (chunks.length !== notes.length) return false;

      const sort = chunks.join("-");
      if (sort === notesCheck) {
        console.log("MAtch", combination, sort, notesCheck);
      } else {
        // console.log("NOT MAtch", notesCheck, sort);
      }
      return sort === notesCheck;
    };

    const insertChar = (newStr, i = 0) => {
      const split = newStr.split("");
      if (!split.includes("?")) {
        if (split.filter((c) => c === "#").length !== nTotal) return;
        // console.log("save combination");
        lineCombinations.push(newStr);
        return;
      }

      const l = newStr[i];
      if (!l) {
        return newStr;
      }
      if (l === "." || l === "#") return insertChar(newStr, i + 1);
      if (l === "?") {
        newStr = newStr.slice(0, i) + "." + newStr.slice(i + 1);
        insertChar(newStr, i + 1);
        newStr = newStr.slice(0, i) + "#" + newStr.slice(i + 1);
        insertChar(newStr, i + 1);
      }
    };

    insertChar(springs);
    // console.log(lineCombinations);
    const valids = lineCombinations.filter(isValid).length;
    total += valids;
    return valids;
  });
  return total;
}
