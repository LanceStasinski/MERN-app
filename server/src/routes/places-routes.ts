import express from "express";

import HttpError from "../models/http-error";

const router = express.Router();

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

router.get("/:pid", (req, res, next) => {
  const placeId = req.params.pid;
  const place = DUMMY_PLACES.find((p) => p.id === placeId);
  if (!place) {
    return next(
      new HttpError("Could not find place for provided place ID", 404)
    ); // will work with async code that will be implemented later
  }
  res.json({ place });
});

router.get("/user/:uid", (req, res, next) => {
  const userId = req.params.uid;
  const places = DUMMY_PLACES.find((p) => p.creator === userId);
  if (!places) {
    return next(
      new HttpError("Could not find place for provided user ID", 404)
    );
  }
  res.json({ places });
});

export default router;
