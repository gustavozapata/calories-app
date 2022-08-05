const mongoose = require("mongoose");
const app = require("./app");

const DB = process.env.DB_URI;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("*** Connected to the database ***");
  });

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`*** Server running on port ${port} ***`));
