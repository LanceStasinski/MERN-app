import React from "react";

import classes from "./PlaceList.module.css";
import Card from "../../shared/components/UIElements/Card";
import PlaceItem from "./PlaceItem";
import Place from "../../models/Place";
import Button from "../../shared/components/FormElements/Button";

const PlaceList: React.FC<{ items: Place[], onDeletePlace: (deletedPlaceId: string) => void }> = (props) => {
  if (props.items.length === 0) {
    return (
      <div className={`${classes["place-list"]} center`}>
        <Card className='pad'>
          <h2>No places found. Would you like to create one?</h2>
          <Button to='/places/new'>Share Place</Button>
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
          image={place.image}
          title={place.title}
          description={place.description}
          address={place.address}
          coordinates={place.location}
          onDelete={props.onDeletePlace}
          creatorId={place.creator}
        />
      ))}
    </ul>
  );
};

export default PlaceList;
