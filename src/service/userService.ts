require("dotenv").config();

import { Request, Response, NextFunction } from "express";
import { UserRepository } from "../database/repository/userRepo";
import { User, userModel } from "../database/models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// import { QueryParams } from "src/controllers/user.controller";

import { generateEmailVerificationToken } from "../utils/randomToken";
import { saveToken } from "../service/tokenService";
import { sendVerificationEmail } from "../utils/emailSender";

export class UserService {
  private userRepo: UserRepository;

  constructor() {
    this.userRepo = new UserRepository();
  }

  // async getAll(options: QueryParams) {
  //   return await this.userRepo.getAll(options);
  // }

  async getAllCount() {
    return await userModel.countDocuments({});
  }

  async create(user: User): Promise<any> {
    try {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      const newUser = await this.userRepo.create({
        ...user,
        password: hashedPassword,
      });
      // Generate verification token
      // Send verification email
      return newUser;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }

  async deleteById(userId: string): Promise<any> {
    try {
      return await this.userRepo.deleteById(userId);
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  }

  async updateVerificationStatus(userId: string): Promise<void> {
    try {
      // Find the user by userId and update the isVerified field to true
      await userModel.findByIdAndUpdate(userId, { isVerified: true });
    } catch (error) {
      console.error("Error updating user verification status:", error);
      throw error;
    }
  }

  async verifyEmail(token: string): Promise<void> {
    try {
      const user = await this.findUserByToken(token);
      if (!user) {
        throw new Error("User not found");
      }
      await this.updateVerificationStatus(user._id);
    } catch (error: any) {
      throw new Error(error.message || "Failed to verify email");
    }
  }
  public async findUserByToken(token: string): Promise<any> {
    try {
      return await userModel.findOne({ token });
    } catch (error) {
      console.error("Error finding user by token:", error);
      throw error;
    }
  }

  async login(email: string, password: string): Promise<string> {
    try {
      // Find user by email
      const user = await userModel.findOne({ email });
      if (!user) {
        throw new Error("User not found");
      }
      if (!user.password) {
        throw new Error("User password not found");
      }

      // Generate JWT token
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET as string,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );
      return token;
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  }
  async findByEmail(email: string): Promise<User | null> {
    return await userModel.findOne({ email });
  }

  

  
  
}
