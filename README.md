# Advent of Code 2022

Advent of code Project built in Deno with utils to get the next day's challenge setup and ready as quickly as possible.<br />
Includes a program to automatically fetch a day's input, test input, and question page screenshot

## Setup
install deno
### To start fresh
- `rm -rf days && rm -rf input` (Remove existing data)<br />
- `deno run -A setup.ts` (Recreate folder structure)
### Cookie
`Add unique session cookie from logging into adventofcode.com to secrets.ts`

## Usage
Run the setup.ts file with the day number as an argument<br />
It will then attempt to fetch all the day information and place info into input/dayNumber and days/dayNumber

#### Example
`deno run -A setup.ts 1`

### Executing a day
`deno run -A days/day01/index.ts`<br />

This will log the return from both functions - part1.ts and part2.ts<br />

You can choose to run the test data instead by changing: `days/day01/index.ts > utils.dayInputString('01')` to `utils.dayInputString('01', true)`