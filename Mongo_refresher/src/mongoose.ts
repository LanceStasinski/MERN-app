import mongoose from "mongoose";
import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";

import { productModel as Product } from "../models/product";

dotenv.config();
const MONGO_URI = process.env.MONGO_URI!;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected");
  })
  .catch(() => {
    console.log("Connection Failed");
  });

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const createdProduct = new Product({
    name: req.body.name,
    price: req.body.price,
  });
  const result = await createdProduct.save();

  res.json(result);
};

export const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const products = await Product.find().exec(); //turn into promise with exec()
  res.json(products);
};
