import { Request, Response, NextFunction } from "express";
import { v4 as uuid } from "uuid";

import HttpError from "../models/http-error";

const DUMMY_USERS = [
  {
    name: "Lance",
    email: "lance.stasinski@gmail.com",
    password: "1234",
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
  const { name, email, password } = req.body;
  const newUser = {
    name,
    email,
    password,
    id: uuid(),
  };
  DUMMY_USERS.push(newUser);
  res.status(201).json({ message: "User created.", user: newUser });
};
