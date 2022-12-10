import part1 from "./part1.ts";
import part2 from "./part2.ts";
import * as utils from "../../utils/index.ts";
const data = utils.dayInputString('09', true);

console.log("part1:", part1(data));

console.log("part2:", part2(data));
