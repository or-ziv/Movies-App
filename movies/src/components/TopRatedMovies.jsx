import React from "react";
import { useGetTopRatedMoviesQuery } from '../features/apiSlice'
import MovieCard from "./MovieCard";

export default function TopRatedMovies() {

    const { data } = useGetTopRatedMoviesQuery();
    const topMovies = data?.results;


    return (
        <div className="topRatedMovies flex">

            <div className="topRatedMap">
                {topMovies?.map((movie, index) => {
                    return (
                        <div key={index}>
                            <MovieCard movie={movie} index={index} />
                        </div>
                    )
                })}
            </div>

        </div>
    )
}
