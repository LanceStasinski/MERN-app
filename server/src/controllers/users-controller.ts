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

export const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  if (email.length === 0 || password.length === 0) {
    return next(new HttpError("No name or password provided", 404));
  }

  const user = DUMMY_USERS.find((u) => u.email === email);
  if (!user) {
    return next(new HttpError("Incorrect name or password", 404));
  }
  if (password !== user!.password) {
    return next(new HttpError("Incorrect name or password", 404));
  }
  res.status(200).json({ message: "User logged in", user });
};
