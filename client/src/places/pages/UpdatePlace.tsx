import React, { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Place from "../../models/Place";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../../util/validators";
import classes from "./PlaceForm.module.css";
import { useForm } from "../../shared/hooks/form-hook";
import Card from "../../shared/components/UIElements/Card";

const DUMMY_PLACES: Place[] = [
  {
    id: "p1",
    title: "A mountain",
    description: "A mountain",
    image:
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
  const [isLoading, setIsLoading] = useState(true);
  const placeId = useParams<{ placeId: string }>().placeId;

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const identifiedPlace = DUMMY_PLACES.find((p) => p.id === placeId);

  useEffect(() => {
    if (identifiedPlace) {
      setFormData(
        {
          title: {
            value: identifiedPlace!.title,
            isValid: true,
          },
          description: {
            value: identifiedPlace!.description,
            isValid: true,
          },
        },
        true
      );
    }
    setIsLoading(false);
  }, [setFormData, identifiedPlace]);

  const placeUpdateSubmitHandler = (event: FormEvent) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  if (!identifiedPlace) {
    return (
      <div className="center">
        <Card className='pad'>
          <h2>Could not find place.</h2>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="center">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <form className={classes["place-form"]} onSubmit={placeUpdateSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title"
        onInput={inputHandler}
        initialValue={formState.inputs.title!.value}
        initialValid={formState.inputs.title!.isValid}
      ></Input>
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (min. 5 characters)."
        onInput={inputHandler}
        initialValue={formState.inputs.description!.value}
        initialValid={formState.inputs.description!.isValid}
      ></Input>
      <Button type="submit" disabled={!formState.isValid}>
        UPDATE PLACE
      </Button>
    </form>
  );
};

export default UpdatePlace;
