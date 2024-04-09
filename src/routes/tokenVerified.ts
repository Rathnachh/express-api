import { userModel } from "../database/models/userModel";
import { UserService } from "../service/userService";
import { userRouter } from "./user.route";
import { Request, Response, NextFunction } from "express";

// Add a new route for email verification
userRouter.get(
  "/verify",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.query.token as string; // Extract token from URL query parameter
      const userId = await findUserIdByToken(token); // Query database to find user ID associated with the token
      const userService = new UserService();
      if (userId) {
        // Update user's isVerified field to true
        await userService.updateVerificationStatus(userId);
        res.status(200).json({ message: "Email verification successful" });
      } else {
        // Token not found in database
        res.status(400).json({ message: "Invalid or expired token" });
      }
    } catch (error: unknown) {
      next(error);
    }
  }
);

// Function to find user ID by token in the database
async function findUserIdByToken(token: string): Promise<string | null> {
  try {
    // Query the database for a user with the provided token
    const user = await userModel.findOne({ token });

    // If user is found, return the user's ID
    if (user) {
      return user._id.toString(); // Convert ObjectID to string
    } else {
      // Token not found in database
      return null;
    }
  } catch (error) {
    // Handle any errors
    console.error("Error finding user by token:", error);
    throw error;
  }
}

// Function to update user's isVerified field to true in the database
async function verifyUser(userId: string): Promise<void> {
  try {
    // Find the user by userId and update the isVerified field to true
    await userModel.findByIdAndUpdate(userId, { isVerified: true });
  } catch (error) {
    // Handle any errors
    console.error("Error updating user verification status:", error);
    throw error;
  }
}
