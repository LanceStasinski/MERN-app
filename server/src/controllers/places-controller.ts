import { Request, Response, NextFunction } from "express";
import { v4 as uuid } from "uuid";
import { validationResult } from "express-validator";

import getCoordsForAddress from "../util/location";
import HttpError from "../models/http-error";
import { placeModel as Place } from "../models/place";

interface Place {
  id: string;
  title: string;
  description: string;
  location: {
    lat: number;
    lng: number;
  };
  address: string;
  creator: string;
}

let DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "Tall building",
    location: {
      lat: 40.7484405,
      lng: -73.9878531,
    },
    address: "20 W 34th St, New York, NY 10001",
    creator: "u1",
  },
];

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

export const getPlacesByUserId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params.uid;
  const places = DUMMY_PLACES.filter((p) => p.creator === userId);
  if (!places || places.length === 0) {
    return next(
      new HttpError("Could not find places for provided user ID", 404)
    );
  }
  res.json({ places });
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
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDMN_RD207lKI3m5FZOJsgF7xvHFxluOdToA&usqp=CAU",
    creator,
  });

  try {
    await createdPlace.save();
  } catch (err) {
    const error = new HttpError("Could not save product.", 500);
    return next(error);
  }

  res.status(201).json({ place: createdPlace });
};

export const updatePlace = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs.", 422);
  }
  const placeId = req.params.pid;
  const { title, description } = req.body;
  const place = { ...DUMMY_PLACES.find((p) => p.id === placeId) }; //best practice to copy and object instead of directly modifying it

  if (!place) {
    return next(new HttpError("Place not found", 404));
  }

  const placeIndex = DUMMY_PLACES.findIndex((p) => p.id === placeId);

  place!.title = title;
  place!.description = description;

  DUMMY_PLACES[placeIndex] = place as Place;

  res.status(200).json({ place: place });
};

export const deletePlace = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const placeId = req.params.pid;
  if (!DUMMY_PLACES.find((p) => p.id === placeId)) {
    throw new HttpError("No place found to delete", 404);
  }
  DUMMY_PLACES = DUMMY_PLACES.filter((p) => p.id !== placeId);
  res.status(200).json({ message: "Deleted place" });
};
