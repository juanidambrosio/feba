const hasArtist = (dates, artist) =>
  dates.find((date) => date.name.toLowerCase().includes(artist));

const getPrices = (url) => {
  const domain = url.split(".com")[0];
  switch (domain) {
    case "https://rio.loudtickets":
      return;
    case "https://mandarinegroup":
      return;
    case "https://crobarviernes.loudtickets":
      return;
    case "https://www.passline":
      return;
    case "https://venti":
      return;
    case "https://mandarine.loudtickets":
      return;
  }
};

module.exports = { hasArtist, getPrices };
