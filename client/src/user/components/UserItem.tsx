import React from "react";
import { Link } from "react-router-dom";

import Avatar from "../../shared/components/UIElements/Avatar";
import classes from "./UserItem.module.css";
import Card from "../../shared/components/UIElements/Card";

const UserItem: React.FC<{
  image: string;
  name: string;
  placeCount: number;
  id: string;
}> = (props) => {
  return (
    <li className={classes["user-item"]}>
      <Card className={classes["user-item__content"]}>
        <Link to={`/${props.id}/places`}>
          <div className={classes["user-item__image"]}>
            <Avatar image={`http://localhost:5000/${props.image}`} alt={props.name} />
          </div>
          <div className={classes["user-item__info"]}>
            <h2>{props.name}</h2>
            <h3>
              {props.placeCount} {props.placeCount === 1 ? "Place" : "Places"}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default UserItem;
