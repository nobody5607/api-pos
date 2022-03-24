import express from "express";
const app = express();
import cors from "cors";
import dotenv from "dotenv";
import formidableExpress from "express-formidable";

import { connectDatabase } from "./config/MongoDb.js";
import importRoute from "./routers/importRoute.js";
import kateCheckRoute from "./routers/kateCheckRoute.js";
dotenv.config();
connectDatabase(); //connection db

app.use(cors());
app.use(formidableExpress());
app.use(express.static("uploads"));
app.use("/uploads", express.static("uploads"));

const PORT = process.env.APP_PORT || 3000;

app.get("/", async (req, res) => {
  res.send("katexoxo");
});

app.use("/api/import/", importRoute);
app.use("/api/kate-check/", kateCheckRoute);
app.listen(PORT, () => console.log(`Start ... http://localhost:${PORT}`));