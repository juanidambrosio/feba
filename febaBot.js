const TelegramBot = require("node-telegram-bot-api");
const { telegramApiKey } = require("./config");

const { nextDates, nextWeek } = require("./constants");

const { initializeDom, searchNextDates } = require("./search/dates");

const listen = async () => {
  const bot = new TelegramBot(telegramApiKey, { polling: true });
  bot.onText(/\/proximasfechas$/, async (msg) =>
    bot.sendMessage(msg.chat.id, nextDates + (await searchNextDates()))
  );

  bot.onText(/\/proximasfechas\s\w+$/, async (msg) =>
    bot.sendMessage(msg.chat.id, nextWeek + (await searchNextDates(true)))
  );

  await initializeDom();
};
listen();
