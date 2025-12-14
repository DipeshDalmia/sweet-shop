require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db.js");

connectDB();

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server runs on port ${port}`);
});