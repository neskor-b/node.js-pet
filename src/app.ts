import path from "path";
import express from "express";
import bodyParser from "body-parser";

import * as errorController from "./controllers/error";
import adminRoutes from "./routes/admin";
import shopRoutes from "./routes/shop";
import { defineAssociations } from "./models";
import { setUser } from "./middleware/user";

defineAssociations();

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "..", "views"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "..", "public")));

app.use(setUser);

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

export default app;
