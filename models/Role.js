import mongoose from "mongoose";

const RoleSchema = new mongoose.Schema(
  {
    name: { type: String, require: true, min: 3 },
    permissions: [
      { type: mongoose.Types.ObjectId, ref: "Permission", require: false },
    ],
  },
  {
    timestamps: true,
  }
);

export const Role = mongoose.model("Role", RoleSchema);
