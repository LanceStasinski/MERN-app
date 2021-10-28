import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

import { userModel as User } from "../models/user";
import HttpError from "../models/http-error";

dotenv.config();
const JWT_KEY: string = process.env.JWT_KEY!;

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

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (error) {
    return next(new HttpError("Could not hash password", 500));
  }

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    image: req.file!.path,
    places: [],
  });
  try {
    await newUser.save();
  } catch (error) {
    return next(new HttpError("Signup failed.", 500));
  }

  let token;
  try {
    token = await jwt.sign(
      { userId: newUser.id, email: newUser.email },
      JWT_KEY,
      {
        expiresIn: "1hr",
      }
    );
  } catch (error) {
    return next(new HttpError("Signup failed.", 500));
  }

  res.status(201).json({
    userId: newUser.id,
    email: newUser.email,
    token: token,
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

  if (!existingUser) {
    return next(new HttpError("Invalid credentials. Could not log in.", 403));
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (error) {
    return next(new HttpError("Could not log you in.", 500));
  }

  if (!isValidPassword) {
    return next(new HttpError("Invalid credentials. Could not log in.", 403));
  }

  let token;
  try {
    token = await jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      JWT_KEY,
      {
        expiresIn: "1hr",
      }
    );
  } catch (error) {
    return next(new HttpError("Logging in failed.", 500));
  }

  res.status(200).json({
    token: token,
    userId: existingUser.id,
    email: existingUser.email,
  });
};
