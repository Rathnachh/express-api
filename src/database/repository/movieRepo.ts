import { QueryParams } from "src/controllers/user.controller";
import { Movie, movieModel } from "../models/movieModel";

export class MovieRepository {
  async getById(movieId: string) {
    return await movieModel.findById(movieId);
  }

  // static async getAll() {
  //   return await movieModel.find({});
  // }
  async getAll(options: QueryParams){


    return await userRe

    // const movies = await movieModel.find({}).skip(skip).limit(limit);
    // return movies.map(movie => ({
    //     name: movie.name || "",
    //     released_on: movie.released_on || new Date()
    // }));
}

  async countAll(): Promise<number> {
    return await movieModel.countDocuments({});
  }

  async updateById(movieId: string, movieData: any) {
    return await movieModel.findByIdAndUpdate(movieId, movieData);
  }

   async deleteById(movieId :string) {
    return await movieModel.findByIdAndDelete(movieId);
  }

  async create(movieData: any) {
    return await movieModel.create(movieData);
  }

  
}
