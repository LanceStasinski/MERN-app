import express from "express";
import bodyParser from "body-parser";

import { createProduct, getProducts } from "./mongo";

const app = express();

app.use(bodyParser.json());

app.post("/products", createProduct);

app.get("/products", getProducts);

app.listen(5000);
