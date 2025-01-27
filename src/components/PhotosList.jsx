import { useAddPhotoMutation, useGetPhotosQuery } from "../store";
import PhotoListItem from "./PhotoListItem";
import Skeleton from "./Skeleton";
import Button from "./Button";

export default function PhotosList({ album }) {
  const { data, isFetching, error } = useGetPhotosQuery(album);
  const [addPhoto, result] = useAddPhotoMutation();

  const addNewPhoto = () => {
    console.log("added");
    addPhoto(album);
  };

  return (
    <div>
      <div className="flex flex-row items-center justify-between">
        <h3 className="text-lg font-bold">Photos in {album.title}</h3>
        <Button loading={result.isLoading} primary rounded onClick={addNewPhoto}>
          + Add Photo
        </Button>
      </div>
      <div className="mx-8 flex flex-row flex-wrap justify-center">
        {isFetching
          ? <Skeleton className="h-8 w-8" times={4} />
          : data?.map((photo) => (
              <PhotoListItem key={photo.id} photo={photo} />
            ))}
      </div>
    </div>
  );
}
