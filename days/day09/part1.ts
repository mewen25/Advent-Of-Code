// export default function part1(data: string) {
//   const lines = data.split("\n").map(l => l.split(" ").map(Number));

//   const traverseLine = (line, history, n = 0) => {
//     let lineDiff = []
//     for (let i = 0; i < line.length; i++) {
//       if (!line[i + 1]) break
//       lineDiff.push(line[i + 1] - line[i])
//     }
//     history.push(lineDiff)

//     if (!lineDiff.every(d => d === 0)) return traverseLine(lineDiff, history, n + 1)
//     else return history
//   }

//   let sum = 0;

//   for (let line of lines) {
//     const history = traverseLine(line, [line], 0)
//     let endSum = 0;
//     for (let l of history.slice(1)) {
//       if (l.length > 0) endSum += l.at(-1)
//     }
//     console.log("add", endSum)
//     sum += line.at(-1) + endSum
//   }

//   return sum;
// }

export default function part1(data: string) {
  const lines = data.split("\n").map(l => l.split(" ").map(Number));

  let sum = 0
  for (const line of lines) {
    const len = line.length;
    let last = line.at(-1);

    for (let i = 1; i < len; ++i) {
      for (let j = len - 1; j >= i; --j) {
        line[j] -= line[j - 1];
      }
      last += line.at(-1)!;
    }
    sum += last
  }

  return sum;
}
