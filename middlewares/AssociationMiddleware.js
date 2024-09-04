import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { Member } from "../models/Member.js";

const secret = process.env.SECRET || "123456789AXEL";

/**
 * auth middleware
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const AssociationMiddleware = async (req, res, next) => {
  try {
    if (!req.association) {
      return res.status(403).json({
        message:
          "Vous n'êtes pas autoriser à acceder a cette interface. Contacter les administrateurs.",
      });
    }

    if (!req.association.isActive) {
      return res.status(403).json({
        message:
          "Cette association est désactivé. Contacter les administrateurs.",
      });
    }

    const member = await Member.findOne({
      $and: [{ user: req.user._id }, { user: req.association._id }],
    });

    if (!member) {
      return res.status(403).json({
        message:
          "Vous n'êtes pas ou plus membre de cette association. contacter les administrateurs.",
      });
    }

    if (!member.isActive) {
      return res.status(403).json({
        message:
          "Votre profil de membre est désactivé. contacter les administrateurs.",
      });
    }

    req.user.actualMember = member;
    next();
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Une erreur est survenu." });
  }
};
