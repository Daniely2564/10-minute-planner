import mongoose, { Model } from "mongoose";
import bcrypt from "bcryptjs";
import type { User as UserSchema } from "@custom/types/models";

const { Schema } = mongoose;

const userSchema = new Schema<UserSchema>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: "/img/empty-profile.jpg",
    },
    userType: {
      type: String,
      enum: ["ADMIN", "USER"],
      default: "USER",
    },
    resetToken: String,
    resetTokenExpiration: Date,
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const hashSalt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, hashSalt);
});

userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User =
  (mongoose.models?.User as Model<UserSchema>) ||
  mongoose.model<UserSchema, Model<UserSchema>>("User", userSchema);

export { User };
