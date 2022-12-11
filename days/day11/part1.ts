export default function part1(data: string) {
  const monkeys = data.split('\n\n').map(m => {
    const id = m.match(/\d+:/)[0].slice(0, -1);
    const items = m.match(/(items:\s)(.+\n)/)[0]
    const oldOp = m.match(/(new = old\s)(.+\n)/)[1];
    const test = m.match(/(by\s)(.+\n)/)[1];
    console.log(id, items, oldOp, test)
  });
  // console.log(monkeys)
}
