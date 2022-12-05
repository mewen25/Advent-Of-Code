import part1 from "./part1.ts";
import part2 from "./part2.ts";
import * as utils from "../../utils/index.ts";
let data = utils.dayInputString('05');
if(data.at(-1) === '\n') data = data.slice(0, -1);

console.log("part1:", part1(data));

console.log("part2:", part2(data));
