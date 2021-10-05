const Book = require('./book.model');

const getPriceList = async (req, res) => {
  try {
    const { title } = req.query;

    if (title) {
      const prices = await Book.getPriceList({
        title,
      });

      res.status(200);
      res.send({
        success: true,
        data: prices,
      });
    } else {
      res.status(400);
      res.send({
        success: false,
        message: 'Invalid title',
      });
    }
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
