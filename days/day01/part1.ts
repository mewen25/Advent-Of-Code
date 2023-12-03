export default function part1(data: string) {
  const numbersInLines = data.split("\n").map(l => Array.from(l.matchAll(/\d/g)).map(m => m[0]))
  return numbersInLines.reduce((acc, cur) => {
    if (cur.length < 1) return acc
    const nums = cur[0] + cur[cur.length - 1]
    console.log(acc, cur, nums)
    return acc + parseInt(nums)
  }, 0)
}
