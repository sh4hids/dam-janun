const cloudscraper = require("cloudscraper");
const $ = require("cheerio");
const got = require("got");
const FormData = require("form-data");
const numberPattern = /(?:\d{1,3}(?:,\d{3})*|\d+)(?:\.\d+)?/g;

const getRokomariPrices = async ({ title, author = "", publisher = "" }) => {
  const prices = [];
  const html = await cloudscraper.get(
    encodeURI(`https://www.rokomari.com/search?term=${title}`)
  );

  const containers = $(".book-list-wrapper", html);

  for (var i = 0; i < containers.length; i++) {
    const bookTitle = $(".book-title", containers[i]).text();
    const bookAuthor = $(".book-author", containers[i]).text();
    const price = $(".book-price", containers[i])
      .text()
      .match(numberPattern)[0];
    const link = `https://www.rokomari.com${$("a", containers[i]).attr(
      "href"
    )}`;

    if (
      bookTitle.includes(title) &&
      ((author && bookAuthor.includes(author)) ||
        (publisher && bookAuthor.includes(publisher)))
    ) {
      prices.push({
        link,
        price,
        title: bookTitle,
        author: bookAuthor
      });
    }
  }

  return prices;
};

const getWafilifePrices = async ({ title, author = "", publisher = "" }) => {
  const prices = [];

  const html = await got(
    encodeURI(`https://www.wafilife.com/search/?wpsolr_q=${title}`)
  );

  const containers = $(".product-meta-wrapper", html.body);
  for (var i = 0; i < containers.length; i++) {
    const bookTitle = $(".heading-title a", containers[i]).text();
    const link = $(".heading-title a", containers[i]).attr("href");
    const bookAuthor = $(".wd_product_categories a", containers[i])
      .first()
      .text();
    const price = $(
      ".price ins .woocommerce-Price-amount",
      containers[i]
    ).text();

    if (bookTitle.includes(title)) {
      prices.push({
        link,
        price,
        title: bookTitle,
        author: bookAuthor
      });
    }
  }

  return prices;
};

const getNiyamahshopPrices = async ({ title, author = "", publisher = "" }) => {
  const prices = [];
  let form = new FormData();
  form.append("action", "aws_action");
  form.append("keyword", `${title}`);

  const { body } = await got.post(
    "https://www.niyamahshop.com/?wc-ajax=aws_action",
    {
      body: form,
      responseType: "json"
    }
  );

  const containers = JSON.parse(body).products || [];

  if (containers.length) {
    for (let i = 0; i < containers.length; i++) {
      const bookTitle = containers[i].title;
      if (bookTitle.includes(title)) {
        const price = $("ins .woocommerce-Price-amount", containers[i].price)
          .text()
          .match(numberPattern)[0];
        const link = containers[i].link;
        prices.push({
          link,
          price,
          title: bookTitle,
          author: ""
        });
      }
    }
  }

  return prices;
};

const getPriceList = async ({ title, author, publisher }) => {
  const list = {
    rokomari: [],
    wafilife: [],
    niyamahshop: []
  };

  const rokomariPriceList = await getRokomariPrices({
    title,
    author,
    publisher
  });
  list.rokomari = rokomariPriceList;

  const wafilifePriceList = await getWafilifePrices({
    title,
    author,
    publisher
  });
  list.wafilife = wafilifePriceList;

  const niyamahshopPrices = await getNiyamahshopPrices({
    title,
    author,
    publisher
  });
  list.niyamahshop = niyamahshopPrices;

  return list;
};

module.exports = {
  getPriceList
};
