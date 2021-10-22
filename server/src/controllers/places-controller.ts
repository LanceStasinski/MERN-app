import { Request, Response, NextFunction } from "express";
import { v4 as uuid } from "uuid";

import HttpError from "../models/http-error";

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
  const place = { ...DUMMY_PLACES.find((p) => p.id === placeId) }; //best practice to copy and object instead of directly modifying it

  if (!place) {
    return next(new HttpError("Place not found", 404));
  }

  const placeIndex = DUMMY_PLACES.findIndex((p) => p.id === placeId);

  //place!.id = DUMMY_PLACES[placeIndex].id;
  place!.title = title;
  place!.description = description;
  place!.location = location;
  place!.address = address;
  //place!.creator = DUMMY_PLACES[placeIndex].creator;

  DUMMY_PLACES[placeIndex] = place as Place;

  res.status(200).json({ place: place });
};

export const deletePlace = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const placeId = req.params.pid;
  DUMMY_PLACES = DUMMY_PLACES.filter((p) => p.id !== placeId);
  res.status(200).json({ message: 'Deleted place' });
};
