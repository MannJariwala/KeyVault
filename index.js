import express, { urlencoded } from "express";
const app = express();
import authRoutes from "./routes/authRoute.js";
import cookieParser from "cookie-parser";
import apiFeatureRoutes from "./routes/apiFeatureRoute.js";

app.set("view engine", "ejs");
app.use(cookieParser());
app.use(urlencoded({ extended: false }));
app.use("/", apiFeatureRoutes);
app.use("/", authRoutes);

app.listen(5000, () => {
  console.log("Server running at 5000");
});
