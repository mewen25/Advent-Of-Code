export default function part1(data: string) {
  let sum = 0;
  data.replaceAll(/Card \d\: /g, "").split("\n").map((p, gameId) => {
    let _sum = 0;
    let cardWins = 0;
    const [wins, num] = p.split("|").map((n) =>
      n.trim().split(" ").map(Number).reduce((acc, cur) => {
        if (acc.includes(cur)) return acc;
        return [...acc, cur];
      }, [])
    );

    num.forEach((n) => {
      if (wins.includes(n)) cardWins++;
    });

    if (cardWins > 1) _sum += cardWins ^ cardWins - 1;

    console.log({ gameId, cardWins, _sum });
    sum += _sum;
  });
  return sum;
}
