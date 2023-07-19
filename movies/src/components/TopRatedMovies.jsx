import React from "react";
import { useGetTopRatedMoviesQuery } from '../features/apiSlice'
import starIcon from '../icons/starIcon.png'
import MovieCard from "./MovieCard";

export default function TopRatedMovies() {

    const { data } = useGetTopRatedMoviesQuery();
    const topMovies = data?.results;


    return (
        <div className="topRatedMovies">

            <div className="topRatedMap">
                {topMovies?.map((movie, index) => {
                    return (
                        // <div className="movieDisplay" key={index}>
                        //     <h3 className="movieTitle" >{movie.title}</h3>
                        //     <img
                        //         src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        //         alt={movie.title} />

                        //     <div className="flex" style={{ flexDirection: 'row' }}>
                        //         <h3>{movie.vote_average}</h3>
                        //         <img src={starIcon} alt="starIcon" style={{ width: '20px', border: 'none', marginLeft: '10px' }} />
                        //     </div>
                        //     <br />
                        // </div>
                        <MovieCard movie={movie} index={index} />
                    )
                })}
            </div>

        </div>
    )
}
