const Price = require("./price.model");
const puppeteer = require("../../helpers/puppeteer");

const getList = async (req, res) => {
  try {
    const { title, author, publisher } = req.query;
    const browser = await puppeteer.launch({ headless: true });

    const list = {
      rokomari: [],
      wafilife: [],
      niyamahshop: []
    };

    const rokomariPriceList = await Price.getRokomariPrices(browser, {
      title,
      author,
      publisher
    });
    list.rokomari = rokomariPriceList;

    const wafilifePriceList = await Price.getWafilifePrices(browser, {
      title,
      author,
      publisher
    });
    list.wafilife = wafilifePriceList;

    const niyamahshopPrices = await Price.getNiyamahshopPrices(browser, {
      title,
      author,
      publisher
    });
    list.niyamahshop = niyamahshopPrices;

    await browser.close();

    res.send({
      success: true,
      data: list
    });
  } catch (e) {
    res.send({
      success: false,
      error: e
    });
  }
};

module.exports = {
  getList
};
