const Book = require('./book.model');

const getPriceList = async (req, res) => {
  try {
    const { title } = req.query;

    const prices = await Book.getPriceList({
      title,
    });

    res.send({
      success: true,
      data: prices,
    });
  } catch (e) {
    console.log(e);
    res.status(500);
    res.send({
      success: false,
      message: 'Something went wrong!',
    });
  }
};

module.exports = {
  getPriceList,
};
