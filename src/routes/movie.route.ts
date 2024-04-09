// import express from "express";
import express, { Request, Response, NextFunction, query } from "express";
import { MovieController } from "../controllers/movie.controller";
// import { validateMongooseId } from "../middleware/mongoose";
import { validate } from "../middleware/validate";
import movieSchema from "../schema/movieSchema";
import { validationmongoID } from "../middleware/validationMongoId";

export const movieRouter = express.Router();
const movieController = new MovieController();
// movieRouter.get("/", movieController.getAll);
// movieRouter.post("/", validate(movieSchema), movieController.create);
// movieRouter.get("/:movieId", movieController.getById);
// movieRouter.put("/:movieId", validationmongoID, movieController.updateById);
// movieRouter.delete("/:movieId", movieController.deleteById);

movieRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const movie = await movieController.getAll(req.query);
      res.status(200).json(movie);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
);

movieRouter.post(
  "/",
  validate(movieSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, released_on } = req.body;
      const createdMovie = await movieController.create({ name, released_on });
      res.status(201).json({ createdMovie });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
);

movieRouter.get(
  "/:movieId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const movieId = req.params.movieId;
      const movie = await movieController.getById(movieId);
      res.status(200).json(movie);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
);

movieRouter.delete("/:movieId", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const movieId = req.params.movieId;
    const result = await movieController.deleteById(movieId);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});
