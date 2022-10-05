const client = require("../clients/biositeClient");
const JSDOM = require("jsdom").JSDOM;

let html = undefined;
let body = undefined;

const initializeDom = async () => {
  const { data } = await client.get("/FEBA");
  html = data;
  body = new JSDOM(html, { runScripts: "dangerously" }).window.document;
  console.log(body)
};

const searchNextDates = async (nextWeek) => {
  const { data } = await client.get("/FEBA");
  console.log(data);
  return "";
};

module.exports = { initializeDom, searchNextDates };
