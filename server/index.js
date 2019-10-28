const express = require('express');
const cors = require('cors');

const app = express();
const { booksController } = require('./app/modules/books');

const port = 8081;

// Body parser
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get('/status', (req, res) => {
  res.send({
    success: true,
    message: 'Server is up and running!',
  });
});
app.get('/books/price', booksController.getPriceList);
app.get('*', (req, res) => {
  res.status(404);
  res.send({ success: false, message: '404 | Not found' });
});

// Listen on port 5000
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is booming on port ${port}
Visit http://localhost:${port}/status to check status`);
});
