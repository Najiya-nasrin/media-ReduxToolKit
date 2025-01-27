import { GoTrashcan } from "react-icons/go";
import Button from "./Button";

import ExpandablePanel from "./ExpandablePanel";
import AlbumsList from "./AlbumsList";
import { useDeleteUserMutation } from "../store";

function UsersListItem({ user }) {
  const [deleteUser, result] = useDeleteUserMutation();

  const handleClick = () => {
    deleteUser(user);
  };

  const header = (
    <>
      <Button className="mr-3" onClick={handleClick}>
        <GoTrashcan />
      </Button>

      {user?.name}
    </>
  );

  return (
    <ExpandablePanel header={header}>
      <AlbumsList user={user} />
    </ExpandablePanel>
  );
}

export default UsersListItem;
