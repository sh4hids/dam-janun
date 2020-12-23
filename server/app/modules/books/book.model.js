const cloudscraper = require('cloudscraper');
const $ = require('cheerio');
const got = require('got');
const FormData = require('form-data');
const { shopList } = require('../../config');

const numberPattern = /(?:\d{1,3}(?:,\d{3})*|\d+)(?:\.\d+)?/g;

const getRokomariPrices = async ({ title }) => {
  try {
    const prices = [];
    const html = await cloudscraper.get(
      encodeURI(`${shopList.rokomari.searchURL}${title}`),
    );

    const containers = $('.book-list-wrapper', html);

    for (let i = 0; i < containers.length; i += 1) {
      const bookTitle = $('.book-title', containers[i]).text();
      const bookAuthor = $('.book-author', containers[i]).text();
      const priceTag = $('.book-price', containers[i])[0].children;
      const price = priceTag[3]
        ? priceTag[3].children[0].data
            .match(numberPattern)[0]
            .replace(/\D/g, '')
        : $('.book-price', containers[i])
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
  } catch (e) {
    console.log(e);
    return [];
  }
};

const getWafilifePrices = async ({ title }) => {
  try {
    const prices = [];

    const html = await got(encodeURI(`${shopList.wafilife.searchURL}${title}`));

    const containers = $('.product-meta-wrapper', html.body);
    for (let i = 0; i < containers.length; i += 1) {
      const bookTitle = $('.heading-title a', containers[i]).text();
      const link = $('.heading-title a', containers[i]).attr('href');
      const bookAuthor = $('.wd_product_categories a', containers[i])
        .first()
        .text();

      const price = $(
        '.price ins .woocommerce-Price-amount',
        containers[i],
      ).text()
        ? $('.price ins .woocommerce-Price-amount', containers[i])
            .text()
            .replace(/\D/g, '')
        : $('.price .woocommerce-Price-amount', containers[i])
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
  } catch (e) {
    console.log(e);
    return [];
  }
};

const getNiyamahshopPrices = async ({ title }) => {
  try {
    const prices = [];
    const form = new FormData();
    form.append('action', 'aws_action');
    form.append('keyword', `${title}`);

    const { body } = await got.post(shopList.niyamahshop.searchURL, {
      body: form,
      responseType: 'json',
    });

    const books = body.products || [];

    for (let i = 0; i < books.length; i += 1) {
      const { title: bookTitle, link, f_price: price = '0' } = books[i];

      prices.push({
        link,
        price,
        title: bookTitle,
        author: '',
        shop: shopList.niyamahshop.title,
      });
    }

    return prices;
  } catch (e) {
    console.log(e);
    return [];
  }
};

const getBoibazarPrices = async ({ title }) => {
  try {
    const prices = [];
    const { body } = await got.get(
      encodeURI(`${shopList.boibazar.searchURL}${title}`),
    );

    const containers = $('.search-border', body);

    for (let i = 0; i < containers.length; i += 1) {
      const bookTitle = $('h1 a', containers[i]).text().split('\n')[0];
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
  } catch (e) {
    console.log(e);
    return [];
  }
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
