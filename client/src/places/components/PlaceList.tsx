import React from "react";

import classes from "./PlaceList.module.css";
import Card from "../../shared/components/UIElements/Card";
import PlaceItem from "./PlaceItem";
import Place from "../../models/Place";

const PlaceList: React.FC<{ items: Place[] }> = (props) => {
  if (props.items.length === 0) {
    return (
      <div className={classes["place-list center"]}>
        <Card>
          <h2>No places found. Would you like to create one?</h2>
          <button>Share Place</button>
        </Card>
      </div>
    );
  }

  return (
    <ul className={classes["place-list"]}>
      {props.items.map((place) => (
        <PlaceItem
          key={place.id}
          id={place.id}
          image={place.imageUrl}
          title={place.title}
          description={place.description}
          address={place.address}
          coordinates={place.location}
        />
      ))}
    </ul>
  );
};

export default PlaceList;
