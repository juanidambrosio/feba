const TelegramBot = require("node-telegram-bot-api");
const { telegramApiKey } = require("./config");

const { initializeDom, searchNextDates } = require("./search/dates");

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
    console.log("Next dates artist");
  });

  await initializeDom();
};
listen();
