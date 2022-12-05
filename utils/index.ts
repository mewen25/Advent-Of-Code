import puppeteer from "puppeteer";
import { SESSION_COOKIE } from "../secrets.ts";

let __dirname = new URL('../', import.meta.url).pathname;
if(Deno.build.os === 'windows') __dirname = __dirname.slice(1);

export const getDirName = () => {
    return __dirname;
}

export function existsSync(filePath: string | URL): boolean {
    try {
      Deno.statSync(filePath);
      return true;
    } catch (_err) {
        return false;
    }
}

export const padNumber = (num: number) => {
    return num.toString().padStart(2, '0');
}
export const dayInputString = (day: string, testData = false) => Deno.readTextFileSync(`${__dirname}input/${ day }/${ testData ? 'test' : 'input' }.txt`);

export const getQuestionPage = async (day: number) => {
    const response = await fetch(`https://adventofcode.com/2022/day/${ day }`);
    const text = await response.text();
    return text;
}

export const fetchDayInput = async (day: number) => {
    const response = await fetch(`https://adventofcode.com/2022/day/${ day }/input`, {
        headers: {
            cookie: `session=${SESSION_COOKIE}`
        }
    });
    const text = await response.text();
    return text;
}

export const browserToQuestionPage = async (day: number, path?: string) => {
    const browser = await puppeteer.launch({
        headless: true,
    });
    const page = await browser.newPage();
    // await page.setCookie({
    //     name: 'session',
    //     value: SESSION_COOKIE,
    //     domain: 'https://adventofcode.com',
    // });
    await page.goto(path ?? `https://adventofcode.com/2022/day/${ day }`);
    await page.waitForNetworkIdle();
    return { page, browser };
}

export const fetchTestInput = async (day: number) => {
    const { page, browser } = await browserToQuestionPage(day);
    const text = await page.$eval('.day-desc > pre > code', (el: any) => el.innerText);
    await browser.close();
    return text ?? null;
}

export const fetchDayScreenshot = async (day: number) => {
    const { page, browser } = await browserToQuestionPage(day);
    try {
        await page.screenshot({ path: `${__dirname}days/day${padNumber(day)}/question.png`, fullPage: true });
    } catch (err) {
        console.log('failed to create screenshot', err);
    }
    await browser.close();
}

export const hasInput = (day: number) => {
    const str = Deno.readTextFileSync(`../input/${ padNumber(day) }/input.txt`);
    return str && str.length > 0;
}

export const validFile = (path: string, txt = false) => {
    if(!existsSync(path)) return false;
    console.log('opening', path, txt);
    
    const file = txt ? Deno.readTextFileSync(path) : Deno.readFileSync(path);
    console.log('file', file);
    return file && file !== ""
}