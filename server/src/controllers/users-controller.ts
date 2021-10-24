import { Request, Response, NextFunction } from "express";
import { v4 as uuid } from "uuid";
import { validationResult } from "express-validator";
import { userModel as User } from "../models/user";

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

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid inputs.", 422));
  }
  const { name, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    return next(
      new HttpError("Signing up failed, please try again later", 500)
    );
  }

  if (existingUser) {
    return next(new HttpError("A user with this email already exists", 422));
  }

  const newUser = new User({
    name,
    email,
    password,
    image:
      "https://cdn.cnn.com/cnnnext/dam/assets/211019120241-05-leaf-clip-dryas-plants-exlarge-169.jpg",
    places: "Some IDs",
  });

  try {
    await newUser.save();
  } catch (error) {
    return next(new HttpError("Signup failed.", 500));
  }

  res.status(201).json({
    message: "User created.",
    user: newUser.toObject({ getters: true }),
  });
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    return next(
      new HttpError("Logging in failed, please try again later", 500)
    );
  }

  if (!existingUser || existingUser.password !== password) {
    return next(new HttpError('Invalid credentials. Could not log in.', 401))
  }
  res.status(200).json({ message: "User logged in"});
};
