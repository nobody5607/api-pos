import express from "express";
import fs from "fs";
import Branch from "../models/BranchModel";
import Brand from "../models/BrandModel";
import Category from "../models/CategoryModel";
import Product from "../models/ProductModel";
import Unit from "../models/UnitModel";
import User from "../models/UserModel";
const importRoute = express.Router();

//category
importRoute.get("/data", async (req, res) => {
  fs.readFile("./data/data.json", "utf8", async function (err, data) {
    if (err) throw err;
    let dataObj = JSON.parse(data);

    // await Branch.insertMany(dataObj["branchs"]);
    // await Brand.insertMany(dataObj["brands"]);
    // await Category.insertMany(dataObj["categorys"]);
    // Unit.insertMany(dataObj["units"]);
    await Product.insertMany(dataObj["products"]);
    // await User.insertMany(dataObj["users"]);
    res.send(dataObj);
  });
});
export default importRoute;
