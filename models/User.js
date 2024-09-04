import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, require: true, min: 3 },
    username: {
      type: String,
      require: true,
      unique: true,
      min: 4,
    },
    password: { type: String, require: true },
    email: { type: String, require: false },
    image: { type: String, require: false },
    isActive: { type: Boolean, default: true },
    role: { type: String, default: "default-user" }, // default-user, admin-user, superadmin
    members: [{ type: mongoose.Types.ObjectId, ref: "Member", require: false }],
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", UserSchema);
