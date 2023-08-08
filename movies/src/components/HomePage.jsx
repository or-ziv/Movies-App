import React, { useEffect, useContext, useState } from "react";
import { useGetUpComingMoviesQuery } from "../features/apiSlice";
import AllData from "../ContextApi";
import RenderMovies from "./RenderMovies";

export default function HomePage(props) {
    const { data } = useGetUpComingMoviesQuery();
    const upComingMovies = data?.results;

    const { heroMovie, setHeroMovie } = useContext(AllData);

    useEffect(() => {
        setHeroMovie(upComingMovies?.[0]);
    }, [upComingMovies]);






















    // useEffect(() => {
    // for (let i = 0; i < upComingMovies?.length; i++) {

    //     const HeroMovieTimer = (index) => {
    //         if (index >= upComingMovies?.length) {
    //             index = 0;
    //         }

    //         (setTimeout(() => {
    //             setHeroMovie(upComingMovies?.[index]);
    //             HeroMovieTimer(index + 1);
    //             csonsole.log(index);
    //         }, 3000))
    //     }
    //     HeroMovieTimer(0);
    // }
    // }, [])



    return (
        <div className="homePage flex">
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

            <div className="upComingMoviesDiv">
                {props.searchedMovies.length === 0 ? (
                    <>
                        <h2 style={{ color: "white" }}>Upcoming Movies</h2>
                        <RenderMovies
                            moviesToRender={upComingMovies?.slice(0, 8)}
                        />
                    </>

                ) : (
                    <>
                        <h2 style={{ color: "white" }}>Movies Found</h2>
                        <RenderMovies
                            moviesToRender={props.searchedMovies}
                        />
                    </>
                )}
            </div>
        </div>
    );
}
