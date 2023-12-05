export default function part1(data: string) {
  let sum = 0;
  data.replaceAll(/Card\s+\d+\: /g, "").trim().replaceAll("  ", " ").split(
    "\n",
  ).map((p, gameId) => {
    let _sum = 0;
    let cardWins = 0;
    const [wins, num] = p.split("|").map((n) =>
      n.trim().split(" ").map(Number)
    );

    num.forEach((n) => {
      if (wins.includes(n)) cardWins++;
    });

    let _cardWins = cardWins;

    if (_cardWins === 1) {
      _sum++;
      _cardWins--;
    } else if (_cardWins > 1) {
      _sum++;
      _cardWins--;
      let temp = 1;
      while (_cardWins > 0) {
        _sum += temp;
        temp *= 2;
        _cardWins--;
      }
    }

    console.log({ gameId: gameId + 1, cardWins, _cardWins, _sum });
    sum += _sum;
  });
  return sum;
}
