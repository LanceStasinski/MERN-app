import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";

import placesRoutes from "./routes/places-routes";
import ServerError from "./util/error";
//import usersRoutes from './routes/users-routes'

const app = express();

app.use('/api/places', placesRoutes);

app.use((err: ServerError, req:Request, res:Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(err.code || 500).json({message: err.message || 'An unknown error occurred.'})
})

app.listen(5000);
