const cloudscraper = require('cloudscraper');
const $ = require('cheerio');
const got = require('got');
const FormData = require('form-data');
const { shopList } = require('../../config');

const numberPattern = /(?:\d{1,3}(?:,\d{3})*|\d+)(?:\.\d+)?/g;

const getRokomariPrices = async ({ title }) => {
  const prices = [];
  const html = await cloudscraper.get(
    encodeURI(`${shopList.rokomari.searchURL}${title}`),
  );

  const containers = $('.book-list-wrapper', html);

  for (let i = 0; i < containers.length; i += 1) {
    const bookTitle = $('.book-title', containers[i]).text();
    const bookAuthor = $('.book-author', containers[i]).text();
    const price = $('.book-price', containers[i])
      .text()
      .match(numberPattern)[0]
      .replace(/\D/g, '');
    const link = `${shopList.rokomari.website}${$('a', containers[i]).attr(
      'href',
    )}`;

    if (bookTitle.includes(title) || bookAuthor.includes(title)) {
      prices.push({
        link,
        price,
        title: bookTitle,
        author: bookAuthor,
        shop: shopList.rokomari.title,
      });
    }
  }

  return prices;
};

const getWafilifePrices = async ({ title }) => {
  const prices = [];

  const html = await got(encodeURI(`${shopList.wafilife.searchURL}${title}`));

  const containers = $('.product-meta-wrapper', html.body);
  for (let i = 0; i < containers.length; i += 1) {
    const bookTitle = $('.heading-title a', containers[i]).text();
    const link = $('.heading-title a', containers[i]).attr('href');
    const bookAuthor = $('.wd_product_categories a', containers[i])
      .first()
      .text();
    const price = $('.price ins .woocommerce-Price-amount', containers[i])
      .text()
      .replace(/\D/g, '');

    if (bookTitle.includes(title) || bookAuthor.includes(title)) {
      prices.push({
        link,
        price,
        title: bookTitle,
        author: bookAuthor,
        shop: shopList.wafilife.title,
      });
    }
  }

  return prices;
};

const getNiyamahshopPrices = async ({ title }) => {
  const prices = [];
  const form = new FormData();
  form.append('action', 'aws_action');
  form.append('keyword', `${title}`);

  const { body } = await got.post(shopList.niyamahshop.searchURL, {
    body: form,
    responseType: 'json',
  });

  const containers = JSON.parse(body).products || [];

  if (containers.length) {
    for (let i = 0; i < containers.length; i += 1) {
      const bookTitle = containers[i].title;
      const price = containers[i].f_price || '0';
      const { link } = containers[i];
      prices.push({
        link,
        price,
        title: bookTitle,
        author: '',
        shop: shopList.niyamahshop.title,
      });
    }
  }

  return prices;
};

const getBoibazarPrices = async ({ title }) => {
  const prices = [];
  const { body } = await got.get(
    encodeURI(`${shopList.boibazar.searchURL}${title}`),
  );

  const containers = $('.search-border', body);

  for (let i = 0; i < containers.length; i += 1) {
    const bookTitle = $('h1 a', containers[i])
      .text()
      .split('\n')[0];
    const link = $('.col-md-12 h1 a', containers[i]).attr('href');
    const bookAuthor = $('h3.authorSize a', containers[i])
      .text()
      .split('\n')[0];
    const price = $('h4 span.price-font', containers[i])
      .text()
      .split('\n')[0]
      .split(' ')[1];

    if (bookTitle.includes(title) || bookAuthor.includes(title)) {
      prices.push({
        link,
        price,
        title: bookTitle,
        author: bookAuthor,
        shop: shopList.boibazar.title,
      });
    }
  }

  return prices;
};

const getPriceList = async ({ title }) => {
  let list = [];

  const rokomariPriceList = await getRokomariPrices({
    title,
  });
  list = [...list, ...rokomariPriceList];

  const wafilifePriceList = await getWafilifePrices({
    title,
  });
  list = [...list, ...wafilifePriceList];

  const niyamahshopPrices = await getNiyamahshopPrices({
    title,
  });
  list = [...list, ...niyamahshopPrices];

  const boibazarPrices = await getBoibazarPrices({
    title,
  });
  list = [...list, ...boibazarPrices];

  return list;
};

module.exports = {
  getPriceList,
};
