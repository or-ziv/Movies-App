import React from "react";
import { useGetPopularMoviesQuery } from '../features/apiSlice';


export default function TopTenMovies() {

    const { data } = useGetPopularMoviesQuery();
    const popularMovies = data?.results;

    const topTenMovies = popularMovies?.slice(0, 10);


    return (
        <div>

            {/* <h2 style={{ color: 'white' }}>Top 10</h2> */}
            <div className="topMoviesDiv flex">
                {topTenMovies?.map((movie, index) => {
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

