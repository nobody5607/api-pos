import express from "express";
const app = express();
import cors from "cors";
import dotenv from "dotenv";
import formidableExpress from "express-formidable";
import { connectDatabase } from "./config/MongoDb";
import importRoute from "./routers/importRoute";
import productRoute from "./routers/productRoute";
import orderRoute from "./routers/orderRoute";
import authRoute from "./routers/authRoute";
import attributeRoute from "./routers/attributeRoute";
import customerRoute from "./routers/customerRoute";
dotenv.config();
connectDatabase(); //connection db
app.use(cors());
app.use(formidableExpress());
app.use(express.static("uploads"));
app.use("/uploads", express.static("uploads"));
const PORT = process.env.APP_PORT || 3000;
app.get("/", async (req, res) => {
  res.send("cn-pos");
});
app.use("/api/auth/", authRoute);
app.use("/api/import/", importRoute);
app.use("/api/product", productRoute);
app.use("/api/order", orderRoute);
app.use("/api/customer", customerRoute);
app.use("/api/attribute", attributeRoute);
app.listen(PORT, () => console.log(`Start ... http://localhost:${PORT}`));
