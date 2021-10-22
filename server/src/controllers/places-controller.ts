import { Request, Response, NextFunction } from "express";
import { v4 as uuid } from "uuid";

import HttpError from "../models/http-error";

const DUMMY_PLACES = [
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

export const getPlaceById = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const placeId = req.params.pid;
  const place = DUMMY_PLACES.find((p) => p.id === placeId);
  if (!place) {
    return next(
      new HttpError("Could not find place for provided place ID", 404)
    ); // will work with async code that will be implemented later
  }
  res.json({ place });
};

export const getPlacesByUserId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params.uid;
  const places = DUMMY_PLACES.find((p) => p.creator === userId);
  if (!places) {
    return next(
      new HttpError("Could not find place for provided user ID", 404)
    );
  }
  res.json({ places });
};

export const createPlace = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, description, location, address, creator } = req.body;
  const createdPlace = {
    id: uuid(),
    title,
    description,
    location,
    address,
    creator,
  };

  DUMMY_PLACES.push(createdPlace);

  res.status(201).json({ place: createdPlace });
};

export const updatePlace = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const placeId = req.params.pid;
  const { title, description, location, address } = req.body;
  const place = DUMMY_PLACES.find(p => p.id === placeId);

  if (!place) {
    return next(new HttpError('Place not found', 404))
  }

  place!.title = title;
  place!.description = description;
  place!.location = location;
  place!.address = address;

  res.status(200).json({ place: place})
};
