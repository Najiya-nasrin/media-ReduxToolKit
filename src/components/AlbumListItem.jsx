import { useDeleteAlbumMutation } from "../store";
import Button from "./Button";
import ExpandablePanel from "./ExpandablePanel";
import { GoTrashcan } from "react-icons/go";
import PhotosList from "./PhotosList";

export default function AlbumListItem({ album }) {
  const [deleteAlbum, result] = useDeleteAlbumMutation();

  const handleAlbumDelete = (album) => {
    deleteAlbum(album);
  };

  const headerItems = (
    <>
      <Button
        danger
        className="mr-3"
        loading={result.isLoading}
        onClick={() => handleAlbumDelete(album)}
      >
        <GoTrashcan />
      </Button>
      {album.title}
    </>
  );

  return (
    <>
      <ExpandablePanel header={headerItems}>
        {" "}
        <PhotosList album={album} />{" "}
      </ExpandablePanel>
    </>
  );
}
