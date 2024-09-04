import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const secret = process.env.SECRET || "123456789AXEL";

/**
 * auth function
 * @param {Request} req
 * @param {Response} res
 */
export const login = async (req, res) => {
  console.log(req.body);
  const { unique, password } = req.body;

  try {
    if (!unique) {
      return res
        .status(500)
        .json({ message: "L'email ou le nom d'utilisateur est requis !" });
    }
    if (!unique) {
      return res.status(500).json({ message: "Le mot de passe est requis !" });
    }

    const user = await User.findOne({
      $or: [{ email: unique }, { username: unique }],
    });

    if (!user) {
      return res.status(500).json({
        message:
          "Aucun utilisateur ne possède cette adresse mail ou ce nom d'utilisateur dans nos données.",
      });
    }

    const correctPassword = await bcrypt.compare(password, user.password);

    if (!correctPassword) {
      return res.status(500).json({
        message: "Le mot de passe est incorrect.",
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        message:
          "Votre compte utilisateur est désactivé. Contacter les administrateurs.",
      });
    }

    let token = jwt.sign({ id: user._id }, secret, {
      expiresIn: "1h",
    });

    return res.status(200).json({ user, token });
  } catch (error) {
    console.log(error);

    res
      .status(500)
      .json({ message: "Une erreur est survenu du côté du serveur." });
  }
};

/**
 * register function
 * @param {Request} req
 * @param {Response} res
 */
export const register = async (req, res) => {
  console.log(req.body);

  try {
    const { email, username, password, name } = req.body;
    if (!name) {
      return res.status(500).json({ message: "Le nom est requis !" });
    }
    if (!email) {
      return res.status(500).json({ message: "L'email est requis !" });
    }
    if (!username) {
      return res
        .status(500)
        .json({ message: "Le nom d'utilisateur est requis !" });
    }
    if (!password) {
      return res
        .status(500)
        .json({ message: "Le mot de passe est requis est requis !" });
    }

    const existUser = await User.findOne({ email: email });

    if (existUser) {
      return res.status(403).json({ message: "L'email est déja pris." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      username,
      email,
      password: hashedPassword,
    });

    let token = jwt.sign({ id: user._id }, secret, {
      expiresIn: "1h",
    });

    return res.status(201).json({ user, token });
  } catch (error) {
    console.log(error);

    res
      .status(500)
      .json({ message: "Une erreur est survenu du côté du serveur." });
  }
};
