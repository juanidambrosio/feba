const client = require("../clients/biositeClient");
const { parse } = require("node-html-parser");

let dates = undefined;

const initializeDom = async () => {
  const { data } = await client.get("/feba");
  const dom = parse(data, { blockTextElements: { script: true } });
  const partialDates = dom.getElementsByTagName("script")[0].childNodes[0].text;
  dates = JSON.parse(
    partialDates.substring(
      partialDates.indexOf("{"),
      partialDates.lastIndexOf("}") + 1
    )
  ).body[1].section.links;
};

module.exports = { initializeDom };
