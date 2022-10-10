const { getDates } = require("./initialState");
const { hasArtist, getPrices } = require("../helper");

const obtainPrices = async (artist) => {
  const date = hasArtist(getDates(), artist);
  const prices = date ? await getPrices(date.url, artist) : "";
  return prices !== ""
    ? artist + "\n" + prices
    : "No hay fechas para este artista";
};

module.exports = { obtainPrices };
