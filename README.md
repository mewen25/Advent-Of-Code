# Ewan's Advent of Code 2022

Project with utils to get the next day's challenge setup and ready as quickly as possible.<br />
Includes a program to automatically fetch the a day's input, test input, and question page screenshot

## Setup
install deno
### Start fresh
`rm -rf days/* && rm -rf input/* && deno run -A setup.ts`<br />

### Secrets.ts
Add your unique session cookie

## Handing a new day
Run the setup.ts file with the day number as a argument<br />
It will then attempt to fetch all the day information and place things into input/day and days/day

#### Example
`deno run -A setup.ts 1`

## Running the challenge example
`deno run -A days/day/day01/index.ts`<br />

will log the return from both functions - part1.ts and part2.ts<br />

Can choose to run the test data instead by changing: `days/day01/index.ts - utils.dayInputString('01')` to `utils.dayInputString('01', true)`