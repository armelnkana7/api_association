import mongoose from "mongoose";

const AssociationSchema = new mongoose.Schema(
  {
    name: { type: String, require: true, min: 3 },
    name_eng: { type: String, require: false, min: 3 },
    abreviation: { type: String, require: false, min: 3 },
    logo: { type: String, require: false, min: 3 },
    rule: { type: String, require: false, min: 3 },
    description: { type: String, require: false, min: 3 },
    city: { type: String, require: false, min: 3 },
    immatriculation: { type: String, require: false, min: 3 },
    day: { type: String, require: false, min: 3 }, // jour de rassemblement
    isActive: { type: Boolean, default: false },
    theme: { type: Boolean, default: true },
    members: [{ type: mongoose.Types.ObjectId, ref: "Member", require: false }],
  },
  {
    timestamps: true,
  }
);

export const Association = mongoose.model("Association", AssociationSchema);
