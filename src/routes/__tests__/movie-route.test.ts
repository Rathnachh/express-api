import { Response } from "supertest";
import supertest from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../../app";
import mongoose from "mongoose";
import { MovieRepository } from "../../database/repository/movieRepo";
import { dbConnect, dbDisconnect } from "../../utils/test-utils/dbhandler";

describe("GET /movies/:moveId", () => {
  let movieId: string;
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    await dbConnect();
  });

  afterAll(async () => {
    await dbDisconnect();
  });
  let repository: MovieRepository;
  beforeEach(() => (repository = new MovieRepository()));

  test("GET /movies should return status 200", async () => {
    const response = await supertest(app).get("/movie");
    expect(response.status).toBe(200);
  });

  test("POST /movies should return status 404 for valid movie data", async () => {
    const movieData = { name: "Test Movie", released_on: "2024-03-21" };
    const existingMovie = await MovieRepository.create(movieData);
    const response = await supertest(app).post("/movies").send(existingMovie);
    expect(response.status).toBe(404);
  });
  // test("DELETE /movies/:movieId should return status 200 for valid deletion", async () => {
  //   const response = await supertest(app).delete(`/movie/${movieId}`);
  //   expect(response.status).toBe(200);
  // });

  // test("DELETE /movies/:movieId should return status 404 for invalid movie ID", async () => {
  //   const invalidMovieId = "invalid_id";
  //   const response = await supertest(app).delete(`/movie/${invalidMovieId}`);
  //   expect(response.status).toBe(404);
  // });

  
});
