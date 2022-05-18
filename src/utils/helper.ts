import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { APP_SECRET } from "../config/credentials";

class Helper {

  static genToken(payload: any) {
    return jwt.sign(payload, APP_SECRET, { expiresIn: "24hr" });
  }

  static verifyToken(token: string) {
    return jwt.verify(token, APP_SECRET);
  }

  static genHash(password: string) {
    return bcrypt.hashSync(password, 10);
  }

  static verifyHash(password: string, hash: string) {
    return bcrypt.compareSync(password, hash);
  }

}

export default Helper;
