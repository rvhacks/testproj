const express = require("express");
const app = express();
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successful"))
  .catch((err) => console.log(err));

app.use(bodyParser.json({ limit: "50mb" }));
app.use(express.json());
app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.listen(process.env.PORT || 4000, () => {
  console.log(`Server is running on port no ${process.env.PORT || 4000}`);
});
