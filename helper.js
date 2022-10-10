const { default: axios } = require("axios");
const { parse } = require("node-html-parser");

const hasArtist = (dates, artist) =>
  dates.find((date) => date.name.toLowerCase().includes(artist));

const apiPlaces = ["mandarine", "venti"];

const getPrices = async (url, artist) => {
  const domain = url.split(".com")[0];
  switch (domain) {
    case "https://rio.loudtickets":
    case "https://crobarviernes.loudtickets":
    case "https://mandarine.loudtickets":
      return await getMandarineLoudPrices(url, artist);
    default:
      return await getBitLyPrices(url);
  }
};

const getBitLyPrices = async (url) => {
  const { request } = await axios.get(url);
  return apiPlaces.some((place) => request?.res?.responseUrl.includes(place))
    ? await getMandarinePrices(request?.res?.responseUrl)
    : await getPasslinePrices(request?.res?.responseUrl);
};

const getMandarineLoudPrices = async (url, artist) => {
  const { data } = await axios.get(url);
  const dom = parse(data);
  const link = dom
    .getElementsByTagName("a")
    .find((element) => element.attributes.href.includes(artist))
    .attributes.href;
  return await getPricesSecondLink(link);
};

const getPricesSecondLink = async (url) => {
  const { data } = await axios.get(url);
  const dom = parse(data);
  const titles = dom
    .getElementsByTagName("div")
    .filter(
      (div) => div.attributes.class === "jet-listing-dynamic-field__content"
    )
    .map((div) => div.childNodes.map((child) => child.text))
    .slice(3)
    .filter((title, index) => index % 2 === 0)
    .flat();
  const prices = dom
    .getElementsByTagName("span")
    .filter(
      (div) => div.attributes.class === "jet-listing-dynamic-field__content"
    )
    .map((div) => div.childNodes.map((child) => child.text))
    .flat();
  let response = "";
  for (let i = 0; i < titles.length; i++) {
    response = response.concat(titles[i] + ": " + prices[i] + "\n");
  }
  return response;
};
const getMandarinePrices = async (url) => {
  const apiUrl = url
    .replace("evento", "api/event/name")
    .replace("guidocarminatti", "");
  const { data } = await axios.get(apiUrl);
  return data.event.TicketTypes.reduce((acc, current) => {
    return current.canBeSelled
      ? acc + "\n" + current.name + ": " + current.priceInCents / 100
      : acc;
  }, "");
};

const getPasslinePrices = async (url) => {
  return "";
};

module.exports = { hasArtist, getPrices };
