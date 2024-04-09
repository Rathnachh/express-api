import mongoose from "mongoose";
import { boolean, string } from "zod";
import bcrypt from "bcrypt";
export interface User {
  name: string;
  email: string;
  password: string;
  isVerified: boolean; 
}



const UserSchema = new mongoose.Schema({
  // userId: {
  //   type: String,
  // },
  name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
});
export const userModel = mongoose.model("User", UserSchema);
