import express, { Express, NextFunction, Request, Response } from "express";
import path from "path";
import { movieRouter } from "./routes/movie.route";
import { userRouter } from "./routes/user.route";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "./swagger.json";
// import { sendVerificationEmail } from "./";
import { sendVerificationEmail } from "./utils/emailSender";
import dotenv from 'dotenv';
dotenv.config();


const app: Express = express();

app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Home route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello Express and TypeScript");
});

// Movie routes
// app.use("/movie", movieRouter);
app.use("/user", userRouter);
// Error handling middleware
app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  res.status(500).json({
    message: err.message,
  });
});

//email sender usage
// async function sendEmail() {
//   const user = {
//     email: "rathna.chh@gmail.com",
//     verificationLink: "https://example.com/verify/123456789",
//   };

//   try {
//     await sendVerificationEmail(user.email, user.verificationLink);
//     console.log("Verification email sent successfully");
//   } catch (error) {
//     console.error("Error sending verification email:", error);
//   }
// }

// sendEmail();


export default app;
