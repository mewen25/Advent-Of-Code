import { CHAR_FORWARD_SLASH } from "https://deno.land/std@0.165.0/path/_constants.ts";

const order = ["J", "2", "3", "4", "5", "6", "7", "8", "9", "T", "Q", "K", "A"]

// five, four, full, three, 2p, 1p, h
const scores = [
  [],
  [],
  [],
  [],
  [],
  [],
  [],
]

export default function part2(data: string) {
  const hands = data.split("\n").map((h, hidx) => {
    let [cards, bid] = h.split(" ");
    bid = Number(bid)

    let handType = 6 // high

    const sortedCards = cards.split("").sort((a, b) => b.localeCompare(a)).filter(c => c !== "J")
    let countedCards = {}
    let check = null
    for (let i = 0; i < sortedCards.length; i++) {
      let j = 1;
      const card = sortedCards[i]
      if (!check) { check = card }
      while (true) {
        if (sortedCards[i] + j && (sortedCards[i + j] === card)) {
          j++
        }
        else break
      }
      if (!countedCards[card]) countedCards[card] = j
      else countedCards[card] += j
      i += j - 1; continue
    }

    const jokerCount = cards.split("").filter(h => h === "J").length

    let values = cards === "JJJJJ" ? [5] : Object.values(countedCards).sort((a, b) => b - a).map((n, i) => i === 0 ? n + jokerCount : n)
    console.log('>>>', cards, values)
    // check five
    if (values.includes(5)) {
      console.log("FIVE KIND", cards, bid)
      handType = 0
    } // check four
    else if (values.includes(4)) {
      console.log("FOUR OF A KIND", cards, bid)
      handType = 1
    } // check full
    else if (values.includes(3) && values.includes(2)) {
      console.log("FULL HOUSE", cards, bid)
      handType = 2
    } // check three
    else if (values.includes(3)) {
      console.log("THREE OF A KIND", cards, bid)
      handType = 3
    } // check 2p
    else if (values.filter(v => v === 2).length === 2) {
      console.log("TWO PAIR", cards, bid)
      handType = 4
    } // check 1p
    else if (values.includes(2)) {
      console.log("ONE PAIR", cards, bid)
      handType = 5
    } else {
      console.log("HIGH CARD", cards, bid)
    }

    const handOrder = cards.split("").map(c => order.indexOf(c))

    return { cards: cards, bid, countedCards, handType, handOrder }
  })

  const rankOrder = hands.sort((a, b) => {
    if (a.handType === b.handType) {
      // const aScore = a.handOrder.reduce((acc, cur) => {return acc + order.indexOf(cur)}, 0)
      let bHigher = false
      for (let i = 0; i < a.handOrder.length; i++) {
        if (a.handOrder[i] === b.handOrder[i]) continue;
        if (b.handOrder[i] > a.handOrder[i]) bHigher = true
        break
      }
      return bHigher ? 1 : -1
    } else return a.handType - b.handType
  })

  return rankOrder.reverse().reduce((acc, cur, idx) => {
    const rankNumber = (idx + 1) * cur.bid
    console.log(idx, '>', cur.cards, rankNumber);
    return acc + rankNumber
  }, 0)
}
