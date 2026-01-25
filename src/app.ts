import path from "path";
import express from "express";
import bodyParser from "body-parser";

import * as errorController from "./controllers/error";
import sequelize from "./util/database";
import adminRoutes from "./routes/admin";
import shopRoutes from "./routes/shop";
import Product from "./models/product";
import User from "./models/user";

Product.belongsTo(User, {
  constraints: true,
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

User.hasMany(Product);

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "..", "views"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

sequelize
  .sync()
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => console.log(err));
