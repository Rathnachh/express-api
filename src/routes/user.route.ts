// import express from "express";
import express, { Request, Response, NextFunction, query } from "express";
// import { validateMongooseId } from "../middleware/mongoose";
import { UserController } from "../controllers/user.controller";
// import { validate } from "../middleware/validate";
import { validateEmail } from "../middleware/validateEmail";
import userSchema from "../schema/userSchema";
import { UserService } from "../service/userService";
import { userModel } from "../database/models/userModel";
import { verifyPassword } from "../utils/jwt";

interface QueryParams {
  limit: number;
  page: number;
}

export const userRouter = express.Router();
const userController = new UserController();
const userService = new UserService();

// userRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const { limit, page } = req.query;

//     const options: QueryParams = {
//       limit: parseInt(limit as string),
//       page: parseInt(page as string),
//     };

//     const users = await userController.getAll(options);
//     res.status(200).json({
//       message: "GET success",
//       users: users.usersData,
//       paginate: users.pagination,
//     });
//   } catch (error: unknown) {
//     next(error);
//   }
// });

userRouter.post(
  "/",
  validateEmail(userSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await userController.create(req, res); // Pass both req and res to create method
    } catch (error: unknown) {
      next(error);
    }
  }
);

// userRouter.get("/verify", userController.verifyEmail);
userRouter.get(
  "/verify",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.query.token as string; // Extract token from URL query parameter
      const user = await userService.findUserByToken(token); // Call the method on the userService instance
      if (user) {
        // Update user's isVerified field to true
        await userService.updateVerificationStatus(user._id);
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

userRouter.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;

      // Verify the user's credentials
      const user = await userService.findByEmail(email);
      if (!user) {
        // User not found
        return res
          .status(401)
          .json({ message: "Login failed. Email and password are incorrect." });
      }

      // Verify the password using the verifyPassword function
      const validPassword = await verifyPassword(password, user.password);
      if (!validPassword) {
        // Invalid password
        return res
          .status(401)
          .json({ message: "Login failed. Email and password are incorrect." });
      }

      // Send success message along with token
      res.status(200).json({ message: "Login Successful" });
    } catch (error: any) {
      // Handle any errors
      next(error);
    }
  }
);

// router.get(
//   "/verify",
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const token = req.query.token as string;
//       await userController.verifyEmail(token);
//       res.status(200).json({ message: "Email verification successful" });
//     } catch (error) {
//       next(error);
//     }
//   }
// );

userRouter.delete(
  "/:userId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await userController.deleteById(req, res); // Pass both req and res to deleteById method
    } catch (error: unknown) {
      next(error);
    }
  }
);
