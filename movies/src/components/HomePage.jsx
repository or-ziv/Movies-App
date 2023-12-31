import React, { useEffect, useContext } from "react";
import { useGetUpComingMoviesQuery } from "../features/apiSlice";
import AllData from "../MoviesContextApi";
import Youtube from 'react-youtube';
import RenderMovies from "./RenderMovies";

export default function HomePage(props) {

    const { data } = useGetUpComingMoviesQuery();
    const upComingMovies = data?.results;
    const { heroMovie, setHeroMovie, movieVideos, setMovieVideos } = useContext(AllData);

    useEffect(() => {
        setHeroMovie(upComingMovies?.[0]);
    }, [upComingMovies]);


    const fetchMovieVideos = () => {
        const API_URL = 'https://api.themoviedb.org/3/movie/';
        let id = heroMovie.id;
        const apiKey = process.env.REACT_APP_API_KEY;
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

                            <p className="txtHover txtOverView" >
                                {heroMovie?.overview ? heroMovie?.overview : null}
                            </p>

                            <br />
                            <button onClick={fetchMovieVideos} className="btns txtHover">Play Trailer</button>
                            <br />
                        </>}

                </div>
            </div>


            <div>
                {props.searchedMovies.length === 0 ? (
                    <>
                        <h2 style={{ color: "white" }}>Upcoming Movies</h2>
                        <RenderMovies
                            moviesToRender={upComingMovies?.slice(0, 16)}
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
