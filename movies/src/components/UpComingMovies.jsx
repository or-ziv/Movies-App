import React from "react";
import { useGetUpComingMoviesQuery } from '../features/apiSlice';

export default function UpComingMovies() {

    const { data } = useGetUpComingMoviesQuery();
    const upComingMovies = data?.results

    const tenUpComingMovies = upComingMovies?.slice(5, 13)

    return (

        <div className="upComing">

            <div className="upComing">
                {tenUpComingMovies?.map((movie, index) => {
                    return (
                        <div className="movieDisplay" key={index}>
                            <img
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title} />

                            <div className="flex" style={{ flexDirection: 'row' }}>
                            </div>
                            <br />
                        </div>
                    )
                })}
            </div>


        </div>
    )
}
