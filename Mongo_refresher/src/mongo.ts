import { NextFunction, Request, Response } from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();
const MONGO_USER = process.env.MONGO_USER!;
const MONGO_PASS = process.env.MONGO_PASS!;

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const newProduct = {
    name: req.body.name,
    price: req.body.price,
  };
  const client = new MongoClient(
    `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@cluster0.l5g7f.mongodb.net/products?retryWrites=true&w=majority`
  );

  try {
    await client.connect();
    const db = client.db();
    await db.collection("products").insertOne(newProduct);
  } catch (error) {
    return res.json({ message: "Could not store data.", error: error });
  }
  client.close();

  res.json({ newProduct });
};

export const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const client = new MongoClient(
    `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@cluster0.l5g7f.mongodb.net/products?retryWrites=true&w=majority`
  );

  let products;
  try {
    await client.connect();
    const db = client.db();
    products = await db.collection("products").find().toArray();
  } catch (error) {
    return res.json({ message: "Could not retrieve products", error: error });
  }
  client.close();

  res.json(products)
};
