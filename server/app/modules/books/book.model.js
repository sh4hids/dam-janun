const cloudscraper = require('cloudscraper');
const $ = require('cheerio');
const got = require('got');
const FormData = require('form-data');

const { getBrowserInstance } = require('../../utils/puppeteer');
const { shopList } = require('../../config');

const numberPattern = /(?:\d{1,3}(?:,\d{3})*|\d+)(?:\.\d+)?/g;

const getRokomariPrices = async ({ title }) => {
  try {
    const browser = await getBrowserInstance();
    const page = await browser.newPage();
    await page.goto(encodeURI(`${shopList.rokomari.searchURL}${title}`), {
      timeout: 0,
    });

    const prices = await page.evaluate(() => {
      const nodes = document.getElementsByClassName('book-list-wrapper');
      const items = [];
      [...nodes].map((item) => {
        items.push({
          link: item.children[0].href,
          title: item.children[0].children[1].children[0].innerText,
          author: item.children[0].children[1].children[1].innerText,
          price: item.children[0].children[1].children[3].children[1]
            ? item.children[0].children[1].children[3].children[1].innerText
            : item.children[0].children[1].children[3].children[0].innerText,
        });
      });

      return items;
    });

    return prices;
  } catch (e) {
    console.log(e);
    return [];
  }
};

const getWafilifePrices = async ({ title }) => {
  try {
    const browser = await getBrowserInstance();
    const page = await browser.newPage();
    await page.goto(encodeURI(`${shopList.wafilife.searchURL}${title}`), {
      timeout: 0,
    });

    const prices = await page.evaluate(() => {
      const nodes = document.getElementsByClassName('product-meta-wrapper');
      const items = [];
      [...nodes].map((item) => {
        items.push({
          link: item.children[0].children[0].href,
          title: item.children[0].children[0].innerText,
          author: item.children[1].children[1].innerText,
          price: item.children[2].children[1]
            ? item.children[2].children[1].children[0].innerText
            : item.children[2].children[0].innerText,
        });
      });

      return items;
    });

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

  // const wafilifePriceList = await getWafilifePrices({
  //   title,
  // });
  // list = [...list, ...wafilifePriceList];

  // const niyamahshopPrices = await getNiyamahshopPrices({
  //   title,
  // });
  // list = [...list, ...niyamahshopPrices];

  // const boibazarPrices = await getBoibazarPrices({
  //   title,
  // });
  // list = [...list, ...boibazarPrices];

  return list;
};

module.exports = {
  getPriceList,
};
