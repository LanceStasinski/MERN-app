import express from "express";

import {
  getPlaceById,
  getPlacesByUserId,
  createPlace,
  updatePlace,
} from "../controllers/places-controller";

const router = express.Router();

router.get("/:pid", getPlaceById);

router.patch("/:pid", updatePlace);

router.get("/user/:uid", getPlacesByUserId);

router.post("/", createPlace);

export default router;
