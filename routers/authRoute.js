import express from "express";
import User from "../models/UserModel";
import {
  GeneratePassword,
  GenerateSignature,
  ValidatePassword,
} from "../utils/passwordUtility";
const authRoute = express.Router();

authRoute.post("/login", async (req, res) => {
  try {
    const { authorization, appname, version } = req.headers;
    if (!authorization || authorization.indexOf("Basic ") === -1) {
      return res.json({ status: "nok", message: "Authentication fail :(" });
    }
    if (appname != "cn-pos" || version != "1.0") {
      return res.json({ status: "nok", message: "Authentication fail :(" });
    }
    const base64Credentials = authorization.split(" ")[1];
    const credentials = Buffer.from(base64Credentials, "base64").toString(
      "ascii"
    );
    const [username, password] = credentials.split(":");

    const user = await User.findOne({ email: username });

    if (!user) {
      return res.json({ status: "nok", message: "Authentication fail :(" });
    }
    const validate = await ValidatePassword(`${password}`, `${user.password}`);

    if (validate) {
      let data = {
        id: user._id,
        email: user.email,
        name: user.name,
        permission: user.permission,
        phone: user.phone,
      };
      const token = await GenerateSignature(data);
      return res.json({ status: "ok", token, data });
    } else {
      return res.json({ status: "nok", message: "Authentication fail :(" });
    }
  } catch (error) {
    return res.json({ status: "nok", message: error });
  }
});

authRoute.post("/register", async (req, res) => {
  try {
    let data = req.fields;
    data.password = await GeneratePassword(data.password);
    const checkUser = await User.findOne({ email: data.email });
    if (checkUser) {
      return res.json({ status: "nok", message: "ชื่อผู้ใช้งานถูกใช้งานแล้ว" });
    }
    const result = await User.create(data);
    return res.json({
      status: "ok",
      message: "ลงทะเบียนสำเร็จ",
      data: result,
    });
  } catch (error) {
    return res.json(error);
  }
});
export default authRoute;
