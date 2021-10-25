import React, { useEffect, useState } from "react";

import UsersList from "../components/UsersList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";

const Users: React.FC = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedUsers, setLoadedUsers] = useState();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_REST_API}/users`
        );

        setLoadedUsers(responseData.users);
      } catch (error: any) {}
    };
    getUsers();
  }, [sendRequest]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner asOverlay={false} />
        </div>
      )}

      {!isLoading && loadedUsers && <UsersList users={loadedUsers!} />}
    </React.Fragment>
  );
};

export default Users;
