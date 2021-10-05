const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { port, appCorsOrigin } = require('./app/config');

const app = express();
const { booksController } = require('./app/modules/books');

app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: appCorsOrigin }));

app.get('/status', (req, res) => {
  res.send({
    success: true,
    message: 'Server is up and running!',
  });
});
app.get('/books/price', booksController.getPriceList);
app.get('/ping', (req, res) => {
  res.status(200);
  res.send({
    data: 'pong',
  });
});
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
