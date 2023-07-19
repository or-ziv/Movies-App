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
                    <div className="movieDisplay" key={index} style={{ backgroundImage: ` ${movie?.backdrop_path}` }}>
                        {/* <h1 style={{ color: 'white' }}>{movie.title}</h1> */}
                        <div className="flex" style={{ flexDirection: 'row' }}>
                        </div>
                    </div>
                )

            })}

        </div >
    )
}
