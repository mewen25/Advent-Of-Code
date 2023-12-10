import part1 from "./part1.ts";
import part2 from "./part2.ts";
import * as utils from "../../utils/index.ts";
const data = utils.dayInputString('08', false);
const temp = window.console.log
if (false) window.console.log = () => { }

// const p1 = part1(data);
const p2 = part2(data);

// console.log("part1:", p1);
console.log("part2:", p2);