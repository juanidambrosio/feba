const client = require("../clients/biositeClient");
const { parse } = require("node-html-parser");
const { nextDates, nextWeek } = require("../constants");
const { applySimpleMarkdown } = require("../parser");

let dates = undefined;

const initializeDom = async () => {
  const { data } = await client.get("/FEBA");
  const dom = parse(data, { blockTextElements: { script: true } });
  const partialDates = dom.getElementsByTagName("script")[0].childNodes[0].text;
  dates = JSON.parse(
    partialDates.substring(
      partialDates.indexOf("{"),
      partialDates.lastIndexOf("}") + 1
    )
  ).body[1].section.links;
};

const searchNextDates = (nextWeek) => {
  if (!nextWeek) {
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
    return nextWeek;
  }
};

module.exports = { initializeDom, searchNextDates };
