import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: String,
    phone: { type: String, required: true, unique: true },
    role: { type: String, default: "general" },
    otp: String,
    otpExpires: Date,
    token: String,
    email: String,
    image: String,
    password: String,
    refer: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    address: String,
    guardian: String,
    guardianPhone: String,
    education: String,
    institute: String,
    status: { type: String, required: true, default: "unverified" },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.models.User || mongoose.model("User", userSchema);

export default userModel;
