import z from "zod";

const movieSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Moviename must be at least 3 characters long" }),
});

export default movieSchema;
