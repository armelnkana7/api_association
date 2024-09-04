import { User } from "../models/User.js";
import { Role } from "../models/Role.js";

/**
 * get user
 * @param {Request} req
 * @param {Response} res
 */
export const getUser = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log(error);

    res
      .status(500)
      .json({ message: "Une erreur est survenu du côté du serveur." });
  }
};

/**
 * get all user
 * @param {Request} req
 * @param {Response} res
 */
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    console.log(error);

    res
      .status(500)
      .json({ message: "Une erreur est survenu du côté du serveur." });
  }
};

/**
 * get all user
 * @param {Request} req
 * @param {Response} res
 */
export const switchState = async (req, res) => {
  const { id, state } = req.body;
  try {
    const user = await User.findById(id);

    await User.findByIdAndUpdate(id, { $set: { isActive: state } });

    let message = state ? "Activé" : "Déactivé";

    res.status(200).json({
      message: `L'état du compte utilisateur de ${user.name} à été ${message} avec succes`,
    });
  } catch (error) {
    console.log(error);

    res
      .status(500)
      .json({ message: "Une erreur est survenu du côté du serveur." });
  }
};

/**
 * get all user
 * @param {Request} req
 * @param {Response} res
 */
export const switchRole = async (req, res) => {
  const { id, roleName } = req.body;
  try {
    const user = await User.findById(id);

    const role = await Role.findOne({ name: roleName });

    await User.findByIdAndUpdate(id, { $set: { role: role.name } });

    res.status(200).json({
      message: `Le role de l'utilisateur ${user.name} est désormai ${role.name}.`,
    });
  } catch (error) {
    console.log(error);

    res
      .status(500)
      .json({ message: "Une erreur est survenu du côté du serveur." });
  }
};
/**
 * update user
 * @param {Request} req
 * @param {Response} res
 */
export const updateUser = async (req, res) => {
  const { id, email, username, password, name, image } = req.body;
  try {
    res.status(200).json({
      message: `Le role de l'utilisateur ${user.name} est désormai ${role.name}.`,
    });
  } catch (error) {
    console.log(error);

    res
      .status(500)
      .json({ message: "Une erreur est survenu du côté du serveur." });
  }
};

/**
 * verify username
 * @param {Request} req
 * @param {Response} res
 */
export const VerifyUsername = async (req, res) => {
  const { username } = req.body;
  try {
    const user = await User.findOne({ username: username });

    if (!user) {
      res.status(400).json({
        message: `Déja pris`,
      });
    }

    res.status(200).json({
      message: `Disponible`,
    });
  } catch (error) {
    console.log(error);

    res
      .status(500)
      .json({ message: "Une erreur est survenu du côté du serveur." });
  }
};
