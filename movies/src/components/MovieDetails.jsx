import React, { useEffect, useState } from "react";
import Actors from "./Actors";
import CrewMembers from "./CrewMembers";


export default function MovieDetails(props) {

    const [thisMovie, setThisMovie] = useState({});
    const [movieId, setMovieId] = useState('movie_id');
    const [movieDetails, setMovieDetails] = useState({});

    const fetchMovies = () => {
        const API_URL = 'https://api.themoviedb.org/3/movie/';
        let id = movieId;
        const apiKey = '4a8e3679e70d606a9981baa4c0311d38';
        let url = `${API_URL}/${id}?language=en-US&page=1&api_key=${apiKey}`;

        fetch(url)
            .then(res => res.json())
            .then((data) => {
                setMovieDetails(data)
            })
            .catch((err) => {
                console.log(err);
            });
    };


    useEffect(() => {
        setThisMovie(props.selectedMovie);
        setMovieId(thisMovie.id);
    }, [thisMovie])

    useEffect(() => {
        fetchMovies();
    }, [movieId])




    return (
        <div className="movieDetails flex">
            <br />
            <h1 style={{ color: 'white' }}>{thisMovie?.title}</h1>

            <div className="flex details" style={{ flexDirection: 'row', gap: ' 100px' }}>


                <div className="flex" style={{ flexDirection: 'row', gap: '100px' }}>

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

                    <img className="imgForTrailer" style={{ cursor: 'default' }}
                        src={`https://image.tmdb.org/t/p/w500${thisMovie?.backdrop_path}`} alt={`${thisMovie?.title}`} />



                </div>

                {/* Display the movie overview and release date  */}
                <div className="flex">
                    <h1>{movieDetails?.tagline}</h1>
                    <p style={{ width: '600px', color: 'white', textAlign: 'left', lineHeight: '35px' }}>{thisMovie?.overview}</p>
                    <h3>Release Date: {thisMovie?.release_date}</h3>
                </div>
            </div>

            <div className="secondConatinerDetails">

                <Actors movieId={movieId} />

                <CrewMembers movieId={movieId} />


            </div>





        </div >
    )
}
