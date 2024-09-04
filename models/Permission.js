import mongoose from "mongoose";

const PermissionSchema = new mongoose.Schema(
  {
    name: { type: String, require: true, min: 3 },
    code: { type: String, require: true, min: 3 },
  },
  {
    timestamps: true,
  }
);

export const Permission = mongoose.model("Permission", PermissionSchema);
