import React from "react";
import { useParams } from "react-router-dom";

import PlaceList from "../components/PlaceList";
import Place from "../../models/Place";

const DUMMY_PLACES: Place[] = [
  // {
  //   id: "p1",
  //   title: "A mountain",
  //   description: "A mountain",
  //   imageUrl:
  //     "https://peakvisor.com/img/news/Mount-Thielsen-Wilderness-Trail.jpg",
  //   address: "Oregon 97733",
  //   location: {
  //     lat: 43.15279264444522,
  //     lng: -122.06632579421652,
  //   },
  //   creator: "u1",
  // },
];

const UserPlaces: React.FC = () => {
  const userId = useParams<{userId?: string}>().userId;
  const loadedPlaces = DUMMY_PLACES.filter((place) => place.creator === userId);
  return <PlaceList items={loadedPlaces}></PlaceList>;
};

export default UserPlaces;
