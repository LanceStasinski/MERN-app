import React from "react";
import { useParams } from "react-router-dom";

import Place from "../../models/Place";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../../util/validators";

const DUMMY_PLACES: Place[] = [
  {
    id: "p1",
    title: "A mountain",
    description: "A mountain",
    imageUrl:
      "https://peakvisor.com/img/news/Mount-Thielsen-Wilderness-Trail.jpg",
    address: "Oregon 97733",
    location: {
      lat: 43.15279264444522,
      lng: -122.06632579421652,
    },
    creator: "u1",
  },
];

const UpdatePlace: React.FC = () => {
  const placeId = useParams<{ placeId: string }>().placeId;

  const identifiedPlace = DUMMY_PLACES.find((p) => p.id === placeId);

  if (!identifiedPlace) {
    return (
      <div className="center">
        <h2>Could not find place</h2>
      </div>
    );
  }
  return (
    <form>
      <Input
        id="title"
        element="input"
        type="text"
        label="title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title"
        onInput={() => {}}
        value={identifiedPlace.title}
        valid={true}
      ></Input>
      <Input
        id="description"
        element="textarea"
        label="description"
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (min. 5 characters)."
        onInput={() => {}}
        value={identifiedPlace.description}
        valid={true}
      ></Input>
      <Button type="submit" disabled={true}>
        UPDATE PLACE
      </Button>
    </form>
  );
};

export default UpdatePlace;
