const digitWords = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]

export default function part2(data: string) {
  const numbersInLines = data.split("\n").map(l => Array.from(l.matchAll(/(?=(\d|one|two|three|four|five|six|seven|eight|nine))/g)).map(m => { return m[1] }))
  return numbersInLines.reduce((acc, cur) => {
    if (cur.length < 1) return acc
    cur = cur.map(c => digitWords.indexOf(c) !== -1 ? String(digitWords.indexOf(c) + 1) : c)
    const nums = cur[0] + cur[cur.length - 1]
    console.log(acc, cur, nums)
    return acc + parseInt(nums)
  }, 0)
}
