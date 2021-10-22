import express from "express";

import { getUsers, signUp } from "../controllers/users-controller";

const router = express.Router();

router.get("/", getUsers);

router.post("/signup", signUp);

export default router;
