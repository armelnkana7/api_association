import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

const secret = process.env.SECRET || "123456789AXEL";

/**
 * auth middleware
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const AuthMiddleware = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //get token from header
      token = req.headers.authorization.split(" ")[1];

      if (!token) {
        return res.status(401).json({ message: "Non Autoriser pas de token." });
      }

      //verify token
      const decoded = jwt.verify(token, secret);

      console.log(decoded);

      //get user from token
      req.user = await User.findById(decoded.id);

      if (!req.user.isActive) {
        return res.status(403).json({
          message:
            "Votre compte utilisateur est désactivé. Contacter les administrateurs.",
        });
      }

      next();
    } catch (error) {
      // console.log(error, jwt.JsonWebTokenError);
      return res.status(401).json({
        message: "Token de connexion expiré ou invalide ! reconnectez-vous !!",
      });
    }
  } else {
    return res.status(203).json({ message: "Non autoriser" });
  }
};
