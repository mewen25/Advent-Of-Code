export default function part1(data: string) {
  let total = 0;
  data.split("\n").map((l, idx) => {
    // if (idx !== 0) return;
    let [springs, _notes] = l.split(" ");
    const len = springs.length;
    const notes = _notes.split(",").map(Number);
    const notesCheck = notes.join("-"); //sort((a, b) => a - b)
    const nTotal = notes.reduce((acc, cur) => acc + cur, 0);

    console.log("springs", springs, "notes", notes);

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
        // console.log("EDGE CASE?", chunks, notes);
        return false;
      }
      if (chunks.length !== notes.length) return false;

      const sort = chunks.join("-");
      if (sort === notesCheck) {
        // console.log("MAtch", combination, sort, notesCheck);
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
    // console.log("e", lineCombinations, springs);
    console.log(lineCombinations);
    const valids = lineCombinations.filter(isValid).length;
    // if (valids !== order.indexOf()) {
    //   console.log("INCORRECT", valids, order[idx], springs);
    //   newTests.push(l);
    // }
    // console.log({ valids });
    total += valids;
    return valids;

    //3, 10, 7, 3, 6, 2
  });
  console.log(total === 31);
  return total;
}
