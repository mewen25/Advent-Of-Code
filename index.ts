import { padNumber } from './utils/index.ts';

function createFoldersAndFiles() {
    const part1Str = 'export default function part1(data: string) {\n  return 0;\n}\n';
    const part2Str = 'export default function part2(data: string) {\n  return 0;\n}\n';
    
    const indexStr = (day: string) => {
        return `import part1 from "./part1.ts";\nimport part2 from "./part2.ts";\nimport * as utils from "../../utils/index.ts";\nconst data = utils.dayInputString('${day}');\n\nconsole.log("part1:", part1(data));\n\nconsole.log("part2:", part2(data));\n`;
    }
    
    const days = [...new Array(25)].map((_, i) => i + 1);
    days.forEach(day => {
        const dayStr = padNumber(day);
        Deno.mkdirSync(`input/${ dayStr }`);
        Deno.mkdirSync(`days/day${ dayStr }`);
        Deno.writeTextFile(`input/${ dayStr }/input.txt`, '');
        Deno.writeTextFile(`input/${ dayStr }/test.txt`, '');
        Deno.writeTextFile(`days/day${ dayStr }/part1.ts`, part1Str);
        Deno.writeTextFile(`days/day${ dayStr }/part2.ts`, part2Str);
        Deno.writeTextFile(`days/day${ dayStr }/index.ts`, indexStr(dayStr));
    });
}

createFoldersAndFiles();

console.log('done');
