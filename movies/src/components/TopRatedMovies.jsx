import React, { useContext, useEffect } from "react";
import AllData from "../MoviesContextApi";
import { useGetTopRatedMoviesQuery, useGetTopRatedMoviesPage2Query } from '../features/apiSlice'
import RenderMovies from "./RenderMovies";


export default function TopRatedMovies() {

    const { data } = useGetTopRatedMoviesQuery();
    // const { dataPage2 } = useGetTopRatedMoviesPage2Query();
    const topMovies = data?.results;

    const { heroMovie, setHeroMovie } = useContext(AllData);

    useEffect(() => {
        if (data?.results && data.results.length > 0) {
            setHeroMovie(data?.results[0]);
        }
    }, [data, setHeroMovie]);


    return (
        <div className="topRatedMovies flex">
            <div
                className="movieContent"
                style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original${heroMovie?.backdrop_path})`,
                }}
            >
                <div className="hero flex">
                    <h1 className="txtHover" style={{ color: "white", fontSize: "72px" }}>
                        {heroMovie?.title}
                    </h1>
                    <p className="txtHover" style={{ color: "white", width: '1000px' }}>
                        {heroMovie?.overview ? heroMovie?.overview : null}
                    </p>
                    <br />
                    <button className="btns txtHover">Play Trailer</button>
                </div>
            </div>


            <h2 style={{ color: "white" }}>Top Rated Movies</h2>
            <div >
                <div>
                    <RenderMovies moviesToRender={topMovies} />
                </div>
            </div>

        </div>
    )
}
