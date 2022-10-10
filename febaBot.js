const TelegramBot = require("node-telegram-bot-api");
const { telegramApiKey } = require("./config");

const { initializeDom } = require("./search/initialState");
const { searchNextDates } = require("./search/dates");

const { obtainPrices } = require("./search/prices");

const listen = async () => {
  const bot = new TelegramBot(telegramApiKey, { polling: true });
  bot.onText(/\/proximasfechas$/, async (msg) => {
    bot.sendMessage(msg.chat.id, searchNextDates(), { parse_mode: "Markdown" });
    console.log("Next dates");
  });

  bot.onText(/\/proximasfechas\s\w+$/, async (msg) => {
    bot.sendMessage(msg.chat.id, searchNextDates(msg.text.substring(16)), {
      parse_mode: "Markdown",
    });
    console.log(`Next dates ${msg.text.substring(16)}`);
  });

  bot.onText(/\/precios\s\w+$/, async (msg) => {
    bot.sendMessage(msg.chat.id, await obtainPrices(msg.text.substring(9)), {
      parse_mode: "Markdown",
    });
    console.log(`Price ${msg.text.substring(9)}`);
  });

  await initializeDom();
};
listen();
