import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { faker } from "@faker-js/faker";

const usersApi = createApi({
  reducerPath: "users",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),
  endpoints(builder) {
    return {
      getUsers: builder.query({
        providesTags: (result) => {
          const tags = result.map((user) => {
            return { type: "Users", id: user.id };
          });
          tags.push({ type: "UserAdded" });
          return tags;
        },
        query: () => {
          return {
            url: "/users",
            method: "GET",
          };
        },
      }),
      addUser: builder.mutation({
        invalidatesTags: () => {
          return [{ type: "UserAdded" }];
        },
        query: () => {
          return {
            url: "/users",
            method: "POST",
            body: {
              name: faker.name.fullName(),
            },
          };
        },
      }),
      deleteUser: builder.mutation({
        invalidatesTags: (result, error, user) => {
          return [{ type: "Users", id: user.id }];
        },
        query: (user) => {
          return {
            url: `/users/${user.id}`,
            method: "DELETE",
          };
        },
      }),
    };
  },
});

export { usersApi };
export const { useGetUsersQuery, useAddUserMutation, useDeleteUserMutation } =
  usersApi;
