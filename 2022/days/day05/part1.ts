export const solution = "CFFHVVHNC";

export default function part1(data: string) {
  let [crates, instructions] = data.split('\n\n');
  crates = crates.replaceAll(/[\[\]]/g, '').replaceAll(/\s{4}/g, '-').replaceAll(/\s/g, '')
  const letters = crates.slice(0, -9)

  const groups = [...Array(letters.length)].reduce((acc, _, i) => {
    if(letters[i]!=='-') acc[i%9].push(letters[i])
    return acc;
  }, Array.from({ length: 9 }, () => []));

  instructions.split('\n').forEach(i => {
    const [amount, from, to] = [...i.matchAll(/\d+/g)].map(Number);
    const select = groups[from-1].slice(0, amount);
    groups[to-1].unshift(...select.reverse())
    groups[from-1].splice(0, amount)
  })

  const result = groups.map(g => g[0]).join('');
  return result;
}
