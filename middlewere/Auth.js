import jwt from "jsonwebtoken";
export const Auth = (req, res, next) => {
  const seecret_key = process.env.SECRET_KEY;
  try {
    const token = req.headers.authorization.split(" ")[1];
    const { data } = jwt.verify(token, seecret_key);
    req.user = data;
    next();
  } catch (error) {
    console.log(seecret_key, "error");
    res.json({ status: "nok", message: "Unauthorized" });
  }
};
