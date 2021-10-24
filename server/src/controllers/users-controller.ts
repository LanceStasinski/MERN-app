import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { userModel as User } from "../models/user";

import HttpError from "../models/http-error";

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let users;
  try {
    users = await User.find({}, "-password"); //return email and name (minus password)
  } catch (error) {
    return next(new HttpError("Could not find users", 500));
  }
  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
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
    places: [],
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
    return next(new HttpError("Invalid credentials. Could not log in.", 401));
  }
  res.status(200).json({ message: "User logged in" });
};
