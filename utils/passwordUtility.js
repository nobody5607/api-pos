import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const GeneratePassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};
export const ValidatePassword = async (enterdPassword, savePassword) => {
  return await bcrypt.compare(enterdPassword, savePassword);
};
export const GenerateSignature = async (payload) => {
  return jwt.sign(
    {
      expiresInt: "1d",
      data: payload,
    },
    process.env.SECRET_KEY
  );
};
