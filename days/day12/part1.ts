export default function part1(data: string) {
  let total = 0;

  const fields = data.split("\n").map((l, i) => {
    if (i !== 0) return;
    let [springs, _notes] = l.split(" ");
    const len = springs.length;
    const notes = _notes.split(",").map(Number);
    console.log("springs", springs, "notes", notes);
    let miss = [];
    let brokeChunk = [];
    let goodChunk = [];

    const chunkSearch = (str, target, i) => {
      // console.log("search", i, str[i], target);
      let j = 0;
      while (true) {
        if (!str[i + j] || str[i + j] !== target) break;
        j++;
      }
      return j;
    };

    for (let i = 0; i < springs.length; i++) {
      if (springs[i] == "?") {
        miss.push(i);
      } else if (springs[i] === "#") {
        const j = chunkSearch(springs, "#", i);
        brokeChunk.push([...Array.from({ length: j }, (_, _i) => i + _i)]);
        i += Math.max(0, j - 1);
      } else if (springs[i] === ".") {
        const j = chunkSearch(springs, ".", i);
        // console.log("good", i, j);
        goodChunk.push([...Array.from({ length: j }, (_, _i) => i + _i)]);
        i += Math.max(0, j - 1);
      }
    }

    const canFit = (i, s = 1) => {
      const pos = springs[i];
      if (pos !== "?") return false;
      let fit = true;
      for (let i = 0; i < s; i++) {
        if (springs[i + s] !== "?") {
          fit = false;
          break;
        }
      }
      if (springs[i + s + 1] === "#") fit = false;
      return fit;
    };

    for (let i = 0; i < notes.length; i++) {
      const n = notes[i];
      for (let _b = 0; _b < brokeChunk.length; _b++) {
        const b = brokeChunk[_b];
        if (b.length === n) {
          notes.splice(i, 1);
          brokeChunk.splice(_b, 1);
        }
      }
    }

    const insertBroken = (i, s, n) => {
      let str = s;
      let invalid = false;
      for (let j = 0; j < n; j++) {
        if (springs[i + j] !== "?") {
          invalid = true;
          break;
        }
        console.log("set", i + j, "#");
        str[i + j] = "#";
      }
      if (
        !invalid && str[i + s + 1] &&
        (str[i + s + 1] !== "?" || str[i + s + 1] === "#")
      ) {
        if (str[i + s + 1] === "?") {
          str[i + s + 1] = ".";
        } else {
          invalid = true;
        }
      }
      if (invalid) return;
      return str;
    };

    const combinationString = [];
    let str = "";
    const remainingNotes = [...notes];
    for (let l = 0; l < springs.length; l++) {
      if (springs[l] !== "?") {
        str[l] += springs[l];
        continue;
      }

      let str = springs;
      insertBroken(i, str, [...notes]);
    }

    let sum = 0;
    for (let n of notes) {
      let _sum = 0;
      console.log("checking", n, miss);
      for (let p = 0; p < miss.length; p++) {
        if ((miss.slice(p, p + n).length === n) || miss.slice(p).length === n) {
          _sum++;
        } else {
          console.log("no space", p, miss[p], n);
        }
      }
      console.log(n, miss, ">", "adding", _sum);
      sum += _sum;
    }

    const combinations = console.log({
      brokeChunk,
      goodChunk,
      miss,
      notes,
      sum,
    });

    console.log(sum);
    total += sum;

    springs = springs.split("");
    return [springs, notes];
  });

  return total;
}
