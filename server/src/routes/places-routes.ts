import express from "express";
import { check } from "express-validator";

import fileUpload from "../middleware/file-upload";

import {
  getPlaceById,
  getPlacesByUserId,
  createPlace,
  updatePlace,
  deletePlace,
} from "../controllers/places-controller";

const router = express.Router();

router.get("/:pid", getPlaceById);

router.patch(
  "/:pid",
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 }),
  ],
  updatePlace
);

router.delete("/:pid", deletePlace);

router.get("/user/:uid", check(), getPlacesByUserId);

router.post(
  "/",
  fileUpload.single('image'),
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 }),
    check("address").not().isEmpty(),
  ],
  createPlace
);

export default router;
