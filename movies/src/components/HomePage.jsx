import React, { useEffect, useState } from "react";
import { useGetUpComingMoviesQuery } from "../features/apiSlice";
import RenderMovies from "./RenderMovies";

export default function HomePage(props) {
    const { data } = useGetUpComingMoviesQuery();
    const upComingMovies = data?.results;

    const [heroMovie, setHeroMovie] = useState({});

    useEffect(() => {
        setHeroMovie(upComingMovies?.[0]);
    }, [upComingMovies]);


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
                            setHeroMovie={setHeroMovie}
                            upComingMovies={upComingMovies}
                            setSelectedMovie={props.setSelectedMovie}
                        />
                    </>

                ) : (
                    <>
                        <h2 style={{ color: "white" }}>Movies Found</h2>
                        <RenderMovies
                            setHeroMovie={setHeroMovie}
                            upComingMovies={props.searchedMovies}
                            setSelectedMovie={props.setSelectedMovie}
                        />
                    </>
                )}
            </div>
        </div>
    );
}
