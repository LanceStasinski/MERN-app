import React, { useState, useContext } from "react";

import Card from "../../shared/components/UIElements/Card";
import classes from "./PlaceItem.module.css";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import Map from "../../shared/components/UIElements/Map";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const PlaceItem: React.FC<{
  id: string;
  image: string;
  title: string;
  description: string;
  address: string;
  coordinates: { lat: number; lng: number };
  onDelete: (deletedPlaceId: string) => void;
  creatorId: string;
}> = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const openMapHandler = () => setShowMap(true);

  const closeMapHandler = () => setShowMap(false);

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);
    try {
      await sendRequest(
        `${process.env.REACT_APP_REST_API}/places/${props.id}`,
        "DELETE", {
          Authorization: 'Bearer ' + auth.token,
        }
      );
      props.onDelete(props.id);
    } catch (error) {}
  };
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={props.address}
        contentClass={classes["place-item__modal-content"]}
        footerClass={classes["place-item__modal-actions"]}
        footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
      >
        <div className={classes["map-container"]}>
          <Map center={props.coordinates} zoom={16} />
        </div>
      </Modal>
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?"
        footerClass={classes["place-item__modal-actions"]}
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              DELETE
            </Button>
          </React.Fragment>
        }
      >
        <p>
          Do you want to proceed and delete this place? Please note that this
          cannot be undone.
        </p>
      </Modal>
      <li className="place-item">
        <Card className={classes["place-item__content"]}>
          {isLoading && <LoadingSpinner asOverlay />}
          <div className={classes["place-item__image"]}>
            <img src={`http://localhost:5000/${props.image}`} alt={props.title} />
          </div>
          <div className={classes["place-item__info"]}>
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className={classes["place-item__actions"]}>
            <Button inverse onClick={openMapHandler}>
              VIEW ON MAP
            </Button>

            {auth.userId === props.creatorId && (
              <Button to={`/places/${props.id}`}>EDIT</Button>
            )}
            {auth.userId === props.creatorId && (
              <Button danger onClick={showDeleteWarningHandler}>
                DELETE
              </Button>
            )}
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default PlaceItem;
