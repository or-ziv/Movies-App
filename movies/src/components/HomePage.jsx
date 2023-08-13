import React, { useEffect, useContext, useState } from "react";
import { useGetUpComingMoviesQuery } from "../features/apiSlice";
import AllData from "../ContextApi";
import Youtube from 'react-youtube';
import RenderMovies from "./RenderMovies";

export default function HomePage(props) {
    const { data } = useGetUpComingMoviesQuery();
    const upComingMovies = data?.results;

    const { heroMovie, setHeroMovie, setMovieVideos, movieVideos } = useContext(AllData);

    useEffect(() => {
        setHeroMovie(upComingMovies?.[0]);
    }, [upComingMovies]);


    const fetchMovieVideos = () => {
        const API_URL = 'https://api.themoviedb.org/3/movie/';
        let id = heroMovie.id;
        const apiKey = '4a8e3679e70d606a9981baa4c0311d38';
        const getVideos = 'append_to_response=videos'
        let url = `${API_URL}/${id}?language=en-US&page=1&api_key=${apiKey}&${getVideos}`;

        fetch(url)
            .then(res => res.json())
            .then((data) => {
                setMovieVideos(data?.videos?.results)
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const renderTrailer = () => {
        const trailer = movieVideos?.find(vid => vid.name === 'Official Trailer' || vid.name === 'Main Trailer');

        return (
            <Youtube
                videoId={trailer?.key}
                containerClassName={'movieContent'}
                opts={{
                    width: '100%',
                    height: '100%',
                    playerVars: {
                        autoplay: 1,
                        controls: 0
                    }
                }}
            />
        )
    };


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

                    {movieVideos ?
                        <>
                            <button
                                className="btns txtHover"
                                onClick={() => { setMovieVideos('') }}
                                style={{ marginBottom: '15px' }}>
                                Close
                            </button>
                            {renderTrailer()}
                        </>
                        :
                        <>
                            <h1 className="txtHover" style={{ color: "white", fontSize: "72px" }}>
                                {heroMovie?.title}
                            </h1>

                            <p className="txtHover" style={{ color: "white", width: '1000px' }}>
                                {heroMovie?.overview ? heroMovie?.overview : null}
                            </p>

                            <br />
                            <button onClick={fetchMovieVideos} className="btns txtHover">Play Trailer</button>
                            <br />
                        </>}

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
        </div >
    );
}
