import * as puppeteer from 'puppeteer';
import { login, listAlpha, countAlpha } from './scrapper';
import { File } from './file';

import { Telegraf } from 'telegraf';
import { Bot } from './bot';

// TODO
// User Profile
// Wait for anonther Function

const main = async () => {
  let file: File = new File();
  file.read();

  const browser: puppeteer.Browser = await setupBrowser();

  const page = await browser.newPage();

  const bot: Bot = new Bot(new Telegraf(file.profile.botToken), file, page);
  // await browser.close();
};

const setupBrowser = async () => {
  const browser = await puppeteer.launch({
    headless: true,
    userDataDir: './cache',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
    ],
  });
  await browser
    .defaultBrowserContext()
    .overridePermissions('https://ocw.uns.ac.id', ['geolocation']);
  const browserVersion = await browser.version();
  console.log(`Started ${browserVersion}`);
  return browser;
};

main();
