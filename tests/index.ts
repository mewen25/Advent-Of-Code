import { padNumber } from "../utils/index.ts";

const args = Deno.args;

if(args.length === 0) {
    console.log("no args, testing all days");
    try {
        await testAllDays();
    } catch(e) {
        console.log('failed', e);
    }
    Deno.exit(0);
} else testDay(Number(args[0]));

async function testDay(day: number) {
    const dayModule = await import(`../days/day${padNumber(day)}/index.ts`);
    dayModule
}

async function testAllDays() {
    for(let i = 1; i <= 25; i++) {
        await testDay(i);
    }
}