import express from "express";
import { check } from "express-validator";

import { getUsers, signUp, login } from "../controllers/users-controller";

const router = express.Router();

router.get("/", getUsers);

router.post(
  "/signup",
  [
    check("name").not().isEmpty(),
    check("email").isEmail(),
    check("password").isLength({ min: 5 }),
  ],
  signUp
);

router.post("/login", login);

export default router;
