const { nextDates, nextWeek } = require("../constants");
const { applySimpleMarkdown } = require("../parser");
const { hasArtist } = require("../helper");
const { dates } = require("./initialState");

const searchNextDates = (artist) => {
  if (!artist) {
    return dates.reduce((acc, date) => {
      if (!date.name.includes("/")) {
        return acc;
      }
      return (
        acc +
        "\n" +
        applySimpleMarkdown(date.name, "[", "]") +
        applySimpleMarkdown(date.url, "(", ")")
      );
    }, nextDates);
  } else {
    const date = hasArtist(dates, artist);
    return date
      ? applySimpleMarkdown(date.name, "[", "]") +
          applySimpleMarkdown(date.url, "(", ")")
      : "No hay fechas para este artista";
  }
};

module.exports = { searchNextDates };
