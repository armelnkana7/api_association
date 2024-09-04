import mongoose from "mongoose";

const MemberSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "User", require: true },
    association: {
      type: mongoose.Types.ObjectId,
      ref: "Association",
      require: true,
    },
    isActive: { type: Boolean, default: true },
    permissions: [
      { type: mongoose.Types.ObjectId, ref: "Permission", require: false },
    ],
  },
  {
    timestamps: true,
  }
);

export const Member = mongoose.model("Member", MemberSchema);
