const express = require("express");
const app = express();
const { priceController } = require("./app/modules/price");

const port = 5000;

// Body parser
app.use(express.urlencoded({ extended: false }));

app.get("/prices", priceController.getList);

// Listen on port 5000
app.listen(port, () => {
  console.log(`Server is booming on port 5000
Visit http://localhost:5000`);
});
