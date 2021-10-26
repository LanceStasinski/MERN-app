import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Place from "../../models/Place";
import PlaceList from "../components/PlaceList";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";


const UserPlaces: React.FC = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedPlaces, setLoadedPlaces]= useState<Place[]>();
  const userId = useParams<{ userId?: string }>().userId;
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_REST_API}/places/user/${userId}`
        );
        setLoadedPlaces(responseData.places);
      } catch (error) {}
    };
    fetchPlaces();
  }, [sendRequest, userId]);

  const placeDeleteHandler = (deletedPlaceId: string) => {
    setLoadedPlaces(prevPlaces => prevPlaces!.filter(place => place.id !== deletedPlaceId))
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner asOverlay={false} />
        </div>
      )}
      {!isLoading && loadedPlaces && <PlaceList items={loadedPlaces!} onDeletePlace={placeDeleteHandler}></PlaceList>}
    </React.Fragment>
  );
};

export default UserPlaces;
