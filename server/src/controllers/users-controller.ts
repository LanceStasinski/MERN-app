import { Request, Response, NextFunction } from "express";
import { v4 as uuid } from "uuid";
import { validationResult } from "express-validator";

import HttpError from "../models/http-error";

const DUMMY_USERS = [
  {
    name: "Lance",
    email: "lance.stasinski@gmail.com",
    password: "tester",
    id: "u1",
  },
];

export const getUsers = (req: Request, res: Response, next: NextFunction) => {
  let userNames = [];
  for (const user of DUMMY_USERS) {
    userNames.push(user.name);
  }

  if (userNames.length === 0) {
    return next(new HttpError("No users found.", 404));
  }
  res.json({ userNames });
};

export const signUp = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError('Invalid inputs.', 422)
  }
  const { name, email, password } = req.body;

  const hasUser = DUMMY_USERS.find(u => u.email === email);
  if (hasUser){
    return next(new HttpError('User already exists.', 422))
  }
  const newUser = {
    name,
    email,
    password,
    id: uuid(),
  };
  DUMMY_USERS.push(newUser);
  res.status(201).json({ message: "User created.", user: newUser });
};

export const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  const identifiedUser = DUMMY_USERS.find((u) => u.email === email);

  if (!identifiedUser || password !== identifiedUser!.password) {
    return next(new HttpError("Incorrect name or password", 404));
  }

  res.status(200).json({ message: "User logged in", identifiedUser });
};
