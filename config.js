const dotenv = require("dotenv").config();

const telegramApiKey = process.env.TELEGRAM_API_KEY;

module.exports = { telegramApiKey };
