import { Request, Response } from "express";
import { UserService } from "../service/userService";
import { generateEmailVerificationToken } from "../utils/randomToken";
import { saveToken } from "../service/tokenService";
import { sendVerificationEmail } from "../utils/emailSender";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public async create(req: Request, res: Response): Promise<void> {
    try {
      // Extract user data from request body
      const { name, email, password } = req.body;

      // Create a new user using the user service
      const newUser = await this.userService.create({
        name,
        email,
        password,
        isVerified: false, // Ensure that isVerified is initially set to false
      });

      // Generate verification token, save it, and send verification email
      const token = generateEmailVerificationToken(newUser._id);
      await saveToken(newUser._id, token);
      await sendVerificationEmail(newUser, token);

      // Send success response
      res.status(201).json({
        status: "success",
        message: "User created successfully",
        data: newUser,
      });
    } catch (error: any) {
      // Send error response
      res.status(500).json({ error: error.message });
    }
  }

  public async deleteById(req: Request, res: Response): Promise<void> {
    try {
      // Extract user ID from request parameters
      const userId = req.params.userId;

      // Delete user by ID using the user service
      await this.userService.deleteById(userId);

      // Send success response
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error: any) {
      // Send error response
      res.status(500).json({ error: error.message });
    }
  }

  public async verifyEmail(req: Request, res: Response): Promise<void> {
    try {
      // Extract token from request query
      const token = req.query.token as string;

      // Verify email using the user service
      await this.userService.verifyEmail(token);

      // Send success response
      res.status(200).json({ message: "Email verification successful" });
    } catch (error: any) {
      // Send error response
      res.status(500).json({ error: error.message || "Email verification failed" });
    }
  }

  public async login(req: Request, res: Response): Promise<void> {
    try {
      // Extract email and password from request body
      const { email, password } = req.body;
  
      // Call the login method in the user service to verify credentials and generate token
      const token = await this.userService.login(email, password);
  
      // Send success response with JWT token
      res.status(200).json({ status: "success", message: "Login successful"});
    } catch (error: any) {
      // Send error response
      res.status(401).json({ status: "error", message: error.message || "Login failed" });
    }
  }
  
}
