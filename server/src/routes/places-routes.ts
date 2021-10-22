import express from "express";

import {
  getPlaceById,
  getPlacesByUserId,
  createPlace,
  updatePlace,
  deletePlace
} from "../controllers/places-controller";

const router = express.Router();

router.get("/:pid", getPlaceById);

router.patch("/:pid", updatePlace);

router.delete('/:pid', deletePlace)

router.get("/user/:uid", getPlacesByUserId);

router.post("/", createPlace);

export default router;
