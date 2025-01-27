import { configureStore } from "@reduxjs/toolkit";
import { albumsApi } from "./apis/albumsApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { photosApi } from "./apis/photosApi";
import { usersApi } from "./apis/usersApi";

export const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
    [albumsApi.reducerPath]: albumsApi.reducer,
    [photosApi.reducerPath]: photosApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(albumsApi.middleware)
      .concat(photosApi.middleware)
      .concat(usersApi.middleware);
  },
});

setupListeners(store.dispatch);

export {
  useFetchAlbumsQuery,
  useAddAlbumMutation,
  useDeleteAlbumMutation,
} from "./apis/albumsApi";

export {
  useGetPhotosQuery,
  useRemovePhotoMutation,
  useAddPhotoMutation,
} from "./apis/photosApi";

export {
  useGetUsersQuery,
  useAddUserMutation,
  useDeleteUserMutation,
} from "./apis/usersApi";
