import {
  useAddAlbumMutation,
  useFetchAlbumsQuery,
} from "../store";
import AlbumListItem from "./AlbumListItem";
import Button from "./Button";
import Skeleton from "./Skeleton";

function AlbumsList({ user }) {
  const { data, error, isLoading } = useFetchAlbumsQuery(user);
  const [addAlbum, result] = useAddAlbumMutation();

  const handleOnClick = () => {
    addAlbum(user);
  };

  return (
    <div>
      <div className="m-2 flex flex-row items-center justify-between">
        <h3 className="text-lg font-bold">Albums for {user.name}</h3>
        <Button
          loading={result.isLoading}
          primary
          rounded
          onClick={handleOnClick}
        >
          {" "}
          + Add Album{" "}
        </Button>
      </div>
      <div>
        {isLoading ? (
          <Skeleton className="h-10 w-full" times={3} />
        ) : (
          data.map((album) => <AlbumListItem key={album.id} album={album} />)
        )}
      </div>
    </div>
  );
}

export default AlbumsList;
