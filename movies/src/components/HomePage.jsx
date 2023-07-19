import React, { useEffect } from "react";
import { useGetUpComingMoviesQuery } from '../features/apiSlice';
import UpComingMovies from "./UpComingMovies";

export default function HomePage(props) {
    const { data } = useGetUpComingMoviesQuery();
    const upComingMovies = data?.results;

    useEffect(() => {
        props.setSelectedMovie(upComingMovies?.[0]);
    }, [])

    return (
        <div className="homePage flex">
            <div className="movieContent" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${props.selectedMovie?.backdrop_path})` }}>
                <div className="hero flex">
                    <h1 style={{ color: "white", fontSize: '72px' }}>{props.selectedMovie?.title}</h1>
                    <p style={{ color: 'white' }}>{props.selectedMovie?.overview ? props.selectedMovie?.overview : null}</p>
                    <br />
                    <button className="btns">Play Trailer</button>
                </div>
            </div>


            <div className="upComingMoviesDiv">
                <h2 style={{ color: 'white' }}>Up Coming Movies</h2>
                <UpComingMovies setSelectedMovie={props.setSelectedMovie} />
            </div>
        
        </div>
    );
}
