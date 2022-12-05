import { green, red, yellow } from "https://deno.land/std@0.123.0/fmt/colors.ts"
import { fetchDayInput, padNumber, fetchTestInput, fetchDayScreenshot, validFile, getDirName } from './utils/index.ts';

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

const args = Deno.args;
console.log(args);


if(args.length === 0) {
    console.log("no args, building folders");
    try {
        createFoldersAndFiles();
    } catch(e) {
        console.log('failed', e);
    }
    Deno.exit(0);
}

const day = Number(args[0]);

console.clear();
console.log(green(`Setting up day ${day}`));

// input/[day]/input.txt
if(!validFile(`input/${padNumber(day)}/input.txt`, true)) {
    console.log(yellow(`Creating input file for day ${day}`));
    const input = await fetchDayInput(day)
    Deno.writeTextFileSync(`input/${padNumber(day)}/input.txt`, input);
} else {
    console.log(yellow(`Input file already exists for day ${day}`));
}

// days/[day]/question.jpg
if(validFile(`days/day${padNumber(day)}/question.jpg`)) {
    console.log(yellow(`Question screenshot already exists for day ${day}`));
} else {
    console.log(yellow(`Attempting to fetch question screenshot`));
    await fetchDayScreenshot(day);
}

// input/[day]/test.txt
if(!validFile(`input/${padNumber(day)}/test.txt`, true)) {
    console.log(yellow(`Attempting to fetch test input`));
    const testInput = await fetchTestInput(day);
    if(!testInput) {
        console.log(red(`Failed to fetch test input`));
    } else {
        console.log(red(testInput));
        const validInput = prompt('Is this valid test input? (check screenshot) (y/n)');
        if(validInput === 'y') {
            Deno.writeTextFileSync(`input/${padNumber(day)}/test.txt`, testInput);
        } else {
            console.log(red('Please enter valid test input manually'));
        }
    }  
} else {
    console.log(yellow(`Test input already exists for day ${day}`));
}


console.log(green(`Setup complete`));

console.log(getDirName())
