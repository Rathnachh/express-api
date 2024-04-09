import { z } from "zod";
import { Request, Response, NextFunction } from "express";
import { userModel } from "../database/models/userModel";

const validateUniqueEmail =
  async (email: string): Promise<boolean> => {
    const existingUser = await userModel.findOne({ email });
    return !existingUser; // Return true if email is unique, false otherwise
  };

export const validateEmail =
  (schema: z.AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);

      const { email } = req.body;
      const isEmailUnique = await validateUniqueEmail(email);
      if (!isEmailUnique) {
        return res.status(400).json({ error: "Email is already in use" });
      }

      next();
    } catch (error) {
      res.status(400).json({ error});
    }
  };
