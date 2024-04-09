import mongoose from "mongoose";
export interface Movie {
  name: string;
  released_on: Date;
}
//Schema កំណត់រូបរាងទិន្នន័យក្នុង database
const MovieSchema = new mongoose.Schema({
  movieId: {
    type: String,
  },
  name: {
    type: String,
    trim: true,
  },
  released_on: {
    type: Date,
    trim: true,
  },
});
export const movieModel = mongoose.model("Movie", MovieSchema); //model is use to interact with database
