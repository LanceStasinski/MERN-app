import express from "express";

import { getUsers, signUp, login } from "../controllers/users-controller";

const router = express.Router();

router.get("/", getUsers);

router.post("/signup", signUp);

router.post("/login", login);
export default router;
