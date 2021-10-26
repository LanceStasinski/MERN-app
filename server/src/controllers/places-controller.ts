import fs from "fs";

import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

import getCoordsForAddress from "../util/location";
import HttpError from "../models/http-error";
import { placeModel as Place } from "../models/place";
import { userModel as User } from "../models/user";
import mongoose from "mongoose";

export const getPlaceById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const placeId = req.params.pid;
  let place;
  try {
    place = await Place.findById(placeId);
  } catch (error) {
    return next(new HttpError("Could not find place.", 500));
  }
  if (!place) {
    return next(new HttpError("Could not find place.", 404));
  }
  res.json({ place: place.toObject({ getters: true }) }); //getters: true tells mongoose to add the id to the newly created object
};

export const getPlacesByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params.uid;

  let userWithPlaces;
  try {
    userWithPlaces = await User.findById(userId).populate("places");
  } catch (error) {
    return next(new HttpError("Could not find places for this user.", 500));
  }
  if (!userWithPlaces || userWithPlaces.places.length === 0) {
    return next(new HttpError("Could not find places for this user.", 404));
  }
  res.json({
    places: userWithPlaces.places.map((place) =>
      place.toObject({ getters: true })
    ),
  });
};

export const createPlace = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid inputs.", 422));
  }
  const { title, description, address, creator } = req.body;

  let location;
  try {
    location = await getCoordsForAddress(address);
  } catch (error) {
    return next(error);
  }

  const createdPlace = new Place({
    title,
    description,
    address,
    location,
    image: req.file!.path,
    creator,
  });

  let user;
  try {
    user = await User.findById(creator);
  } catch (error) {
    return next(new HttpError("Creating place failed", 500));
  }

  if (!user) {
    return next(new HttpError("Could not find user for provided userID", 404));
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdPlace.save({ session: sess });
    user.places.push(createdPlace);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError("Could not save place.", 500);
    return next(error);
  }

  res.status(201).json({ place: createdPlace });
};

export const updatePlace = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid inputs.", 422));
  }
  const placeId = req.params.pid;
  let place;
  const { title, description } = req.body;
  try {
    place = await Place.findById(placeId);
  } catch (error) {
    return next(new HttpError("Could not find place.", 500));
  }
  if (!place) {
    return next(new HttpError("Place not found", 404));
  }

  place.title = title;
  place.description = description;

  try {
    await place.save();
  } catch (error) {
    return next(new HttpError("Could not save place.", 500));
  }

  res.status(200).json({ place: place.toObject({ getters: true }) });
};

export const deletePlace = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const placeId = req.params.pid;

  let place;
  try {
    place = await Place.findById(placeId).populate("creator");
  } catch (error) {
    return next(new HttpError("Could not retrieve place.", 500));
  }

  if (!place) {
    return next(new HttpError("Could not find place to delete.", 404));
  }

  const imagePath = place.image;

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await place.remove({ session: sess });
    place.creator.places.pull(place);
    await place.creator.save({ session: sess });
    await sess.commitTransaction();
  } catch (error) {
    return next(new HttpError("Could not delete place.", 500));
  }

  fs.unlink(imagePath, err => {
    console.log(err)
  })

  res.status(200).json({ message: "Deleted place" });
};
