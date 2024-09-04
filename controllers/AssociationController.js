import { Association } from "../models/Association";

/**
 * auth middleware
 * @param {Request} req
 * @param {Response} res
 */
export const switchAssociation = async (req, res) => {
  const { id } = req.body;
  try {
    const association = await Association.findById(id);
    if (!association.isActive) {
      return res.status(403).json({
        message:
          "Cette association est désactivé. Contacter les administrateurs.",
      });
    }

    req.user.association = association;

    return res.status(200).json({
      message: `Vous êtes à présent connecter a l'association ${association.name}`,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Une erreur est survenu du côté du serveur." });
  }
};

/**
 * auth middleware
 * @param {Request} req
 * @param {Response} res
 */
export const addAssociation = async (req, res) => {
  const {
    name,
    name_eng,
    description,
    abreviation,
    logo,
    rule,
    day,
    city,
    immatriculation,
  } = req.body;
  try {
    return res.status(200).json({
      message: `Vous êtes à présent connecter a l'association ${association.name}`,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Une erreur est survenu du côté du serveur." });
  }
};
