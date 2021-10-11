import React from "react";

import classes from "./UsersList.module.css";
import UserItem from "./UserItem";
import Card from "../../shared/components/UIElements/Card";
import User from "../../models/User";

const UsersList: React.FC<{ users: User[] }> = (props) => {
  if (props.users.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No users found</h2>
        </Card>
      </div>
    );
  }

  return (
    <ul className={classes["users-list"]}>
      {props.users.map((user: User) => (
        <UserItem
          key={user.id}
          id={user.id}
          image={user.image}
          name={user.name}
          placeCount={user.places}
        />
      ))}
    </ul>
  );
};

export default UsersList;
