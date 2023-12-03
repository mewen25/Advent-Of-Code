const isNumber = (s: string) => !isNaN(Number(s));

export default function part1(data: string) {
  const rowWidth = data.split("\n")[0].length;
  data = data.replaceAll(/\n/g, '')
  let sum = 0
  let blocks = []
  for (let i = 0; i < data.length; i++) {
    let block = ''
    if (isNumber(data[i])) {
      block += data[i]
      let j = 0;
      while (true) {
        if (!isNumber(data[i + 1 + j])) {
          break
        } else {
          block += data[i + 1 + j]
          j++
        }
      }
      if (Number(block) > 0) blocks.push([String(Number(block)), i])
      i += j;
    }
  }

  const directions = [
    [-1, -rowWidth],
    [0, -rowWidth],
    [1, -rowWidth],
    [-1, 0],
    [1, 0],
    [-1, rowWidth],
    [0, rowWidth],
    [1, rowWidth],
  ]

  console.log(data, data[13])
  _blocks: for (let block of blocks) {
    for (let n = 0; n < block[0].length; n++) {
      if (directions.some(d => {
        const t = (block[1] + n) + d[0] + d[1];
        if (!data[t]) return false
        return !isNumber(data[t]) && data[t] !== "."
      })) {
        sum += Number(block[0]);
        continue _blocks;
      }
    }
  }

  return sum;
}
