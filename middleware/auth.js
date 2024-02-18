import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    let decodedData;

    if (token) {
      const jwtsecret = process.env.LOGIN_SECRET;

      decodedData = jwt.verify(token, jwtsecret);

      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);

      req.userId = decodedData?.sub;
    }

    next();
  } catch (error) {
    res
      .status(401)
      .json({ message: "No token or invalid token, authorization denied" });
  }
};

export default auth;
