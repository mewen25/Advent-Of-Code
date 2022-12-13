export default function part1(data: string) {
  const monkeys = data.split('\n\n').map(m => {
    const id = m.match(/\d+:/)[0].slice(0, -1);
    const items = m.match(/(items:\s)(.+\n)/)[2].split(',').map(Number);
    const oldOp = m.match(/(new = old\s)(.+\n)/)[2].slice(0,-1);
    const test = m.match(/(by\s)(.+\n)/)[2].slice(0,-1);
    const isTrue = m.match(/true.+?(?=\d)(.+)/)[1];
    const isFalse= m.match(/false.+?(?=\d)(.+)/)[1]
    return { id, items, oldOp, test, isTrue, isFalse, inspects: 0 };
  });

  function nextRound() {
    for(let monkey of monkeys) {
      for(let item of monkey.items) {
        monkey.inspects++;
        const [op, amount] = monkey.oldOp.split(' ');
        const opAmount = amount === 'old' ? item : Number(amount);
        const newWorryValue = Math.floor(eval(`${Number(item)} ${op} ${opAmount}`) / 3);
        let throwTo;
        if(newWorryValue % Number(monkey.test) === 0) {
          throwTo = monkeys.find(m => m.id === monkey.isTrue);
        } else {
          throwTo = monkeys.find(m => m.id === monkey.isFalse);
        }
        throwTo.items.push(newWorryValue);
        monkey.items = monkey.items.filter(i => i !== item);
      }
    }
  }

  for(let i=0; i< 20;i++) {
    nextRound();
  }
  
  const monkeyBusiness = monkeys.sort((a, b) => b.inspects - a.inspects).slice(0,2).reduce((acc, m) => acc * m.inspects, 1)
  return monkeyBusiness
}
