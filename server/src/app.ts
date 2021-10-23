import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";

import placesRoutes from "./routes/places-routes";
import usersRoutes from "./routes/users-routes";
import HttpError from "./models/http-error";
//import usersRoutes from './routes/users-routes'

dotenv.config();
const MONGO_URI = process.env.MONGO_URI!;

const app = express();

app.use(bodyParser.json());

app.use("/api/places", placesRoutes);

app.use("/api/users", usersRoutes);

app.use((req, res, next) => {
  //send 404 error if route is not found
  const error = new HttpError("Could not find this route.", 404);
  throw error; // this is sync. code so throw works here
});

app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err);
  }
  res
    .status(err.code || 500)
    .json({ message: err.message || "An unknown error occurred." });
});

mongoose
  .connect(MONGO_URI)
  .then(() => {
    app.listen(5000);
  })
  .catch(err => {
    console.log(err)
  });
