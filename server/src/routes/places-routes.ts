import express from "express";

import { getPlaceById, getPlacesByUserId, createPlace } from "../controllers/places-controller";

const router = express.Router();



router.get("/:pid", getPlaceById);

router.get("/user/:uid", getPlacesByUserId);

router.post('/', createPlace)

export default router;
