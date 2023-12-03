const isNumber = (s: string) => !isNaN(Number(s));


export default function part2(data: string) {
  const rowWidth = data.split("\n")[0].length;
  data = data.replaceAll(/\n/g, '')
  const gears = Array.from(data.matchAll(/[*]/g)).map(m => m.index);
  console.log(gears)
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


  for (let gear of gears) {
    let close = [];
    let blockIndexes = []
    dirs: for (let dir of directions) {
      const t = (gear + dir[0] + dir[1])
      if (!isNumber(data[t])) continue
      const b = blocks.find((b, i) => {
        return t >= b[1] && t < b[1] + b[0].length
      })
      if (b) {
        const _b = Number(b[0])
        if (!blockIndexes.includes(b[1])) close.push(_b)
        blockIndexes.push(b[1])
        continue dirs
      }
    }
    console.log("GEAR RESULT", close)
    if (close.length == 2) {
      sum += (close[0] * close[1])
    }
  }
  return sum
}
