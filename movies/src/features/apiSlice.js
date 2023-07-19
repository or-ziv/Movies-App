import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const moviesApi = createApi({
    reducerPath: 'moviesApi',
    baseQuery: fetchBaseQuery({ baseUrl: "https://api.themoviedb.org/3/movie/" }),
    endpoints: (builder) => ({
        getTopRatedMovies: builder.query({
            query: () => `top_rated?language=en-US&page=1&api_key=4a8e3679e70d606a9981baa4c0311d38`,
        }),
        getPopularMovies: builder.query({
            query: () => 'popular?language=en-US&page=1&api_key=4a8e3679e70d606a9981baa4c0311d38',
        }),
        getUpComingMovies: builder.query({
            query: () => 'upcoming?language=en-US&page=1&api_key=4a8e3679e70d606a9981baa4c0311d38',
        }),
    }),
});

export const { useGetTopRatedMoviesQuery, useGetPopularMoviesQuery, useGetUpComingMoviesQuery } = moviesApi;

