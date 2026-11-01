
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',

  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000',

    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),

  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ username, password }) => {
        const body = new URLSearchParams();
        body.set('username', username);
        body.set('password', password);

        return {
          url: '/auth/login',
          method: 'POST',
          body,
        };
      },
    }),

    getMe: builder.query({
      query: () => '/users/me',
    }),

    register: builder.mutation({
        query: ({ name, email, password }) => ({
        url: '/users',
        method: 'POST',
        body: { name, email, password },
        }),
    }),    
  }),
});

export const {
  useLoginMutation,
  useGetMeQuery,
  useRegisterMutation,
} = authApi;
