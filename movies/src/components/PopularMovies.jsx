import React from "react";
import { useGetPopularMoviesQuery } from '../features/apiSlice'
import RenderMovies from "./RenderMovies";


export default function PopularMovies() {
    const { data } = useGetPopularMoviesQuery();
    const popularMovies = data?.results;

    return (
        <div className="popularMovies flex">
            <div >
                <RenderMovies moviesToRender={popularMovies} />
            </div>
        </div>
    )
}
