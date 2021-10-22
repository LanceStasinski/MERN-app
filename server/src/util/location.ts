import dotenv from "dotenv";
import axios from "axios";
import HttpError from "../models/http-error";

dotenv.config();
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

async function getCoordsForAddress(address: string) {
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${GOOGLE_API_KEY}`
  );

  const data: any = response.data;

  if (!data || data.status === "Zero_RESULTS") {
    const error = new HttpError(
      "Could not find location for specified address",
      422
    );
    throw error;
  }

  const location = data.results[0].geometry.location;
  return location;
}

export default getCoordsForAddress;