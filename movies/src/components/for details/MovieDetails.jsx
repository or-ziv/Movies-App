import React, { useEffect, useState, useContext } from "react";
import AllData from "../../MoviesContextApi";
import Actors from "./Actors";
import CrewMembers from "./CrewMembers";
import MoviesReviews from "./MoviesReviews";
import SimilarMovies from "./SimilarMovies";
import Youtube from 'react-youtube';


export default function MovieDetails() {

    const { selectedMovie, setMovieVideos, movieVideos } = useContext(AllData);

    const [thisMovie, setThisMovie] = useState({});
    const [movieId, setMovieId] = useState('movie_id');
    const [movieDetails, setMovieDetails] = useState({});

    const fetchMovieDetails = () => {
        const API_URL = 'https://api.themoviedb.org/3/movie/';
        let id = movieId;
        const apiKey = '4a8e3679e70d606a9981baa4c0311d38';
        const getVideos = 'append_to_response=videos'
        let url = `${API_URL}/${id}?language=en-US&page=1&api_key=${apiKey}&${getVideos}`;

        fetch(url)
            .then(res => res.json())
            .then((data) => {
                setMovieDetails(data)
                setMovieVideos(data?.videos?.results)
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        setThisMovie(selectedMovie);
        setMovieId(thisMovie.id);
    }, [thisMovie])

    useEffect(() => {
        fetchMovieDetails();
    }, [movieId])

    const renderTrailer = () => {
        const trailer = movieVideos?.find(vid => vid.name === 'Official Trailer' || vid.name === 'Main Trailer');

        return (
            <Youtube videoId={trailer?.key} />
        )
    };


    return (
        <div className="flex">
            <br />
            <h1 style={{ color: 'white' }}>{thisMovie?.title}</h1>

            <div className="flex details detailsCont" >

                <div className="flex detailsCont" >
                    <div className="flex">
                        {/* Display The movie image */}
                        <img className="imgDisplayDetails" style={{ cursor: 'default' }}
                            src={`https://image.tmdb.org/t/p/w500${thisMovie?.poster_path}`} alt={`${thisMovie?.title}`} />

                        <br />

                        {/* Display The Movie Genres */}
                        <div className="flex moreDetails">
                            {movieDetails?.genres?.map((val) => {
                                return (
                                    <div key={val.id}>
                                        <p className="genres"> {val.name}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* Movie Trailer */}
                    <div className="youtubeCont">
                        {movieVideos ? renderTrailer() : 'No Trailers Avaliable'}
                    </div>
                    
                </div>

                {/* Display the movie overview and release date  */}
                <div className="flex">
                    <h1>{movieDetails?.tagline}</h1>
                    <p style={{ width: '600px', color: 'white', textAlign: 'left', lineHeight: '35px' }}>{thisMovie?.overview}</p>
                    <h3>Release Date: {thisMovie?.release_date}</h3>
                </div>
            </div>


            {/* Similar Movies */}
            <div className="flex" >
                {/* <MovieImages movieId={movieId} /> */}
                <br />
                <SimilarMovies movieId={movieId} setThisMovie={setThisMovie} setMovieId={setMovieId} />
            </div>

            <MoviesReviews movieId={movieId} thisMovie={thisMovie} />

            <div className="secondConatinerDetails">


                <Actors movieId={movieId} />

                <CrewMembers movieId={movieId} />


            </div>

        </div >
    )
}
