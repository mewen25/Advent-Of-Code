let winStore = {};

export default function part2(data: string) {
  let sum = 0;

  const totalGames = data.replaceAll(/Card\s+\d+\: /g, "").trim().replaceAll(
    "  ",
    " ",
  ).split(
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
    winStore[gameId] = cardWins;

    // console.log({ gameId: gameId + 1, cardWins, _cardWins, _sum });
    sum += _sum;
    return _sum;
  });

  let copies = {};

  const getWins = (idx, orig) => {
    const _win = winStore[idx];
    cardsSum++;
    if (_win === 0) {
      // console.log(`END game ${idx + 1}`, _win);
      return;
    }
    // if (idx === orig) console.log("Original game", idx + 1);
    // console.log(
    //   `GAME ${idx + 1}`,
    //   Array.from(
    //     { length: _win },
    //     (_, i) => idx + 1 + i + 1,
    //   ),
    // );
    if (_win > 0) {
      for (let i = 1; i <= _win; i++) {
        // copies[idx + i] = copies[idx + i] ? copies[idx + i] + 1 : 1;
        getWins(idx + i, orig);
      }
    }
  };

  let cardsSum = 0;
  for (let i = 0; i < totalGames.length; i++) {
    getWins(i, i);
    // console.log(copies);
  }

  return cardsSum;
}
