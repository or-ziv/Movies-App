import React from "react";
import { useGetTopRatedMoviesQuery } from '../features/apiSlice'
import RenderMovies from "./RenderMovies";

export default function TopRatedMovies(props) {

    const { data } = useGetTopRatedMoviesQuery();
    const topMovies = data?.results;


    return (
        <div className="topRatedMovies flex">

            <div className="topRatedMap">
                {topMovies?.map((movie) => {
                    return (
                        <div key={movie.id}>
                            <RenderMovies setSelectedMovie={props.setSelectedMovie} upComingMovies={topMovies} />
                            {/* <MovieCard movie={movie} index={index} /> */}
                        </div>
                    )
                })}
            </div>

        </div>
    )
}
