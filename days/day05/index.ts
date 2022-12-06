import part1, { solution as part1Solution } from "./part1.ts";
import part2, { solution as part2Solution } from "./part2.ts";
import * as utils from "../../utils/index.ts";
let data = utils.dayInputString('05');
if(data.at(-1) === '\n') data = data.slice(0, -1);

console.time('day5')
console.log("part1:", part1(data));

console.log("part2:", part2(data));
console.timeEnd('day5')

export { part1, part2, part1Solution, part2Solution }