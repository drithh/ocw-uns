"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer = require("puppeteer");
const file_1 = require("./file");
const telegraf_1 = require("telegraf");
const bot_1 = require("./bot");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const { botToken, email, password } = (0, file_1.readProfile)();
    const browser = yield setupBrowser();
    const page = yield browser.newPage();
    (0, bot_1.telegram)(new telegraf_1.Telegraf(botToken), page, email, password);
});
const setupBrowser = () => __awaiter(void 0, void 0, void 0, function* () {
    const browser = yield puppeteer.launch({
        headless: true,
        userDataDir: './cache',
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu',
        ],
    });
    yield browser
        .defaultBrowserContext()
        .overridePermissions('https://ocw.uns.ac.id', ['geolocation']);
    const browserVersion = yield browser.version();
    console.log(`Started ${browserVersion}`);
    return browser;
});
main();
//# sourceMappingURL=index.js.map