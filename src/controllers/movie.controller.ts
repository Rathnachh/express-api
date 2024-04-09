// import { Request, Response, NextFunction } from "express";
// import { MovieService } from "../service/movieService";

// export class MovieController {
//   static async getById(req: Request, res: Response, next: NextFunction) {
//     await MovieService.getById(req, res, next);
//   }

//   static async getAll(req: Request, res: Response) {
//     await MovieService.getAll(req, res);
//   }

//   static async updateById(req: Request, res: Response) {
//     await MovieService.updateById(req, res);
//   }

//   static async deleteById(req: Request, res: Response, next: NextFunction) {
//     try {
//       const movieId = req.params.movieId;
//       // Call the service method to delete the movie
//       await MovieService.deleteById(movieId);
//       // Respond with success message
//       res.status(200).json({ message: "Movie deleted successfully" });
//     } catch (error) {
//       // Handle errors
//       next(error); // Pass the error to the error handling middleware
//     }
//   }

//   static async create(req: Request, res: Response) {
//     await MovieService.create(req, res); // Pass movie data
//   }
// }

import { Request, Response } from "express";
import { Movie } from "../database/models/movieModel";
import { MovieService } from "../service/movieService";
import {
  Route,
  Get,
  Post,
  Request as TsoaRequest,
  Response as TsoaResponse,
  Body,
  Delete,
  Query,
  Queries,
  Tags,
} from "tsoa";
import { skip } from "node:test";

interface MovieParams {
  limit?: string;
  page?: string;
}

const movieService = new MovieService();
@Route("movie")
@Tags ("Movies")
export class MovieController {
  @Get("/")
  public async getAll(@Queries() queryParams: MovieParams): Promise<any> {
    try {
      const pageNumber = queryParams ? parseInt(queryParams.page as string) : 1;
      const pageSize = queryParams ? parseInt(queryParams.limit as string) : 10;

      const movie = await movieService.getAll(pageNumber, pageSize);

      const totalCount = await movieService.getAllCount();
      const totalPages = Math.ceil(totalCount / pageSize);

      return {
        status: "success",
        message: "Users are found",
        data: movie,
        meta: {
          page: pageNumber,
          limit: pageSize,
          total: totalCount,
          totalPages: totalPages,
        },
      };
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  @Get("/:movieId")
  public async getById(movieId: string): Promise<any> {
    try {
      const movieService = new MovieService();
      const movie = await movieService.getById(movieId);
      if (movie) {
        return {
          status: "success",
          message: "Movie is found",
          data: movie,
        };
      } else {
        throw new Error("Movie not found");
      }
    } catch (error: any) {
      throw new Error(error.message || "Updated Failed");
    }
  }

  @Post("/")
  public async create(@Body() requestBody: Movie): Promise<void> {
    try {
      const movieService = new MovieService();
      const { name, released_on } = requestBody;
      const newMovie = await movieService.create({ name, released_on });
      return newMovie;
    } catch (error: any) {
      throw error;
    }
  }

  @Delete("/:movieId")
  public async deleteById(movieId: string): Promise<any> {
    try {
      const movieService = new MovieService();
      await movieService.deleteById(movieId);
      return { message: "Movie deleted successfully" };
    } catch (error: any) {
      throw new Error(error.message || "Failed to delete movie");
    }
  }
}
