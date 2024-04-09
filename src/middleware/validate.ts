import { z } from "zod";
import { Request, Response, NextFunction } from "express";

export const validate =
  (schema: z.AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parse(req.body);
      next();
    } catch (error) {
      res.status(400).json({ error });
    }
  };
