import React from "react";
import { useGetPopularMoviesQuery } from '../features/apiSlice';


export default function TrailerMovies() {

    const { data } = useGetPopularMoviesQuery();
    const popularMovies = data?.results;

    // For now , Need To Update Later to show Trailers for movies
    const movieSlice = popularMovies?.slice(0, 1);



    return (
        <div className="movieDisplay">
            {movieSlice?.map((movie, index) => {
                
                return (
                    <div className="movieDisplay" key={index}>
                        <img style={{width:'auto'}}
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title} />

                        <div className="flex" style={{ flexDirection: 'row' }}>
                        </div>
                    </div>
                )

            })}

        </div>
    )
}
