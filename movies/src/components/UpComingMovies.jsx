import React from "react";
import { useGetUpComingMoviesQuery } from '../features/apiSlice';
import MovieCard from "./MovieCard";

export default function UpComingMovies(props) {

    const { data } = useGetUpComingMoviesQuery();
    const upComingMovies = data?.results;

    const tenUpComingMovies = upComingMovies?.slice(0, 16);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    };

    return (

        <div>

            <div className="upComing">
                {tenUpComingMovies?.map((movie, index) => {
                    return (
                        <div key={index} onClick={() => { props.setSelectedMovie(movie); scrollToTop() }}>
                            <MovieCard movie={movie} index={index} />
                        </div>
                    )
                })}
            </div>


        </div>
    )
}
