const { dates } = require("./initialState");
const { hasArtist, getPrices } = require("../helper");

const obtainPrices = (artist) => {
  const date = hasArtist(dates, artist);
  return date
    ? artist + "\n" + getPrices(date.url)
    : "No hay fechas para este artista";
};

module.exports = { obtainPrices };
