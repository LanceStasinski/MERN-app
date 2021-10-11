import React from "react";
import PlaceList from "../components/PlaceList";
import Place from "../../models/Place";

const DUMMY_PLACES: Place[] =[{
  id: 'p1',
  title: 'A mountain',
  description: 'A mountain',
  imageUrl: 'https://peakvisor.com/img/news/Mount-Thielsen-Wilderness-Trail.jpg',
  address: 'Oregon 97733',
  location: {
    lat: 43.15279264444522,
    lng: -122.06632579421652
  },
  creator: 'u1'
}]

const UserPlaces: React.FC = () => {
  return (<PlaceList items={DUMMY_PLACES}></PlaceList>)
}

export default UserPlaces;