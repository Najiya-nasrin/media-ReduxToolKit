import { faker } from "@faker-js/faker";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const albumsApi = createApi({
  reducerPath: "albums",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),
  endpoints(builder) {
    return {
      fetchAlbums: builder.query({
        providesTags: (result, error, user) => {
            const tags = result.map((album) => {
                return { type: "Album", id: album.userId }
            });
            tags.push({ type: "UserAlbum", id: user.id })
          return tags;
        },
        query: (user) => {
          return {
            url: "/albums",
            params: {
              userId: user.id,
            },
            method: "GET",
          };
        },
      }),
      addAlbum: builder.mutation({
        invalidatesTags: (result, error, user) => {
          return [{ type: "UserAlbum", id: user.id }];
        },
        query: (user) => {
          return {
            url: "/albums",
            method: "POST",
            body: {
              userId: user.id,
              title: faker.commerce.productName(),
            },
          };
        },
      }),
      deleteAlbum: builder.mutation({
        invalidatesTags: (result, error, album) => {
          return [{ type: "UserAlbum", id: album.userId }];
        },
        query: (album ) => {
          return {
            method: "DELETE",
            url: `/albums/${album.id}`,
          };
        },
      }),
    };
  },
});

export const { useFetchAlbumsQuery, useAddAlbumMutation, useDeleteAlbumMutation } = albumsApi;
export { albumsApi };
