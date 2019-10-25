const Price = require("./price.model");

const getList = async (req, res) => {
  try {
    const { title, author, publisher } = req.query;

    const list = {
      rokomari: [],
      wafilife: [],
      niyamahshop: []
    };

    const rokomariPriceList = await Price.getRokomariPrices({
      title,
      author,
      publisher
    });
    list.rokomari = rokomariPriceList;

    const wafilifePriceList = await Price.getWafilifePrices({
      title,
      author,
      publisher
    });
    list.wafilife = wafilifePriceList;

    const niyamahshopPrices = await Price.getNiyamahshopPrices({
      title,
      author,
      publisher
    });
    list.niyamahshop = niyamahshopPrices;

    res.send({
      success: true,
      data: list
    });
  } catch (e) {
    console.log(e);
    res.status(500);
    res.send({
      success: false,
      message: "Something went wrong"
    });
  }
};

module.exports = {
  getList
};
