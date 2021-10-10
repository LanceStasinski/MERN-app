import React from "react";

import UsersList from "../components/UsersList";
import User from "../../models/User";

const Users: React.FC = () => {
  const USERS: User[] = [
    new User(
      "Lance",
      "https://media-exp1.licdn.com/dms/image/D4D35AQGVLcDRyjsPMw/profile-framedphoto-shrink_400_400/0/1622477235040?e=1633993200&v=beta&t=eRUFZptz3zOrth7xGRhdNaRNGa7KeF68I0i67GrasHg",
      2
    ),
  ];
  return <UsersList users={USERS} />;
};

export default Users;
