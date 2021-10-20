import React from "react";

import UsersList from "../components/UsersList";
import User from "../../models/User";

const Users: React.FC = () => {
  const USERS: User[] = [
    new User(
      "Lance",
      "https://cdn.cnn.com/cnnnext/dam/assets/211019120241-05-leaf-clip-dryas-plants-exlarge-169.jpg",
      2
    ),
  ];
  return <UsersList users={USERS} />;
};

export default Users;
