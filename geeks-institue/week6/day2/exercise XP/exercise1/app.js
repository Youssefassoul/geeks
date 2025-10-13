const express = require("express");
const path = require("path");
const app = express();
const routes = require("./routes/index");

const port = process.env.PORT || 3000;

// Mount routes
app.use("/", routes);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
