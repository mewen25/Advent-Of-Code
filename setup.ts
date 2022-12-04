import { green, red, yellow } from "https://deno.land/std@0.123.0/fmt/colors.ts"
import { hasInput, fetchDayInput, padNumber, fetchTestInput, fetchDayScreenshot, validFile } from './utils/index.ts';


const args = Deno.args;

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
