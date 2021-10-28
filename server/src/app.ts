import fs from 'fs';
import path from 'path';

import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";

import placesRoutes from "./routes/places-routes";
import usersRoutes from "./routes/users-routes";
import HttpError from "./models/http-error";
//import usersRoutes from './routes/users-routes'

dotenv.config();
const MONGO_USER = process.env.MONGO_USER!;
const MONGO_PASS = process.env.MONGO_PASS!;
const MONGO_NAME = process.env.MONGO_NAME!;
const MONGO_URI = `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@cluster0.l5g7f.mongodb.net/${MONGO_NAME}`

const app = express();

app.use(bodyParser.json());

app.use('/uploads/images', express.static(path.join('uploads', 'images')))

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"),
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

app.use("/api/places", placesRoutes);

app.use("/api/users", usersRoutes);

app.use((req, res, next) => {
  //send 404 error if route is not found
  const error = new HttpError("Could not find this route.", 404);
  throw error; // this is sync. code so throw works here
});

app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    })
  }
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
  .catch((err) => {
    console.log(err);
  });
