import { useAddUserMutation, useGetUsersQuery } from "../store";
import Button from "./Button";
import Skeleton from "./Skeleton";

import UsersListItem from "./UsersListItem";

function UsersList() {
  const { data, error, isFetching } = useGetUsersQuery();
  const [addUser, result] = useAddUserMutation();

  const handleUserAdd = () => {
    addUser();
  };

  let content;
  if (isFetching) {
    content = <Skeleton times={6} className="h-10 w-full" />;
  } else {
    content = data?.map((user) => {
      return <UsersListItem key={user.id} user={user} />;
    });
  }

  return (
    <div>
      <div className="flex flex-row justify-between items-center m-3">
        <h1 className="m-2 text-xl">Users</h1>
        <Button onClick={handleUserAdd}>+ Add User</Button>
      </div>
      {content}
    </div>
  );
}

export default UsersList;
