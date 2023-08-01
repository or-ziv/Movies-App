import React, { useEffect, useState, useContext } from "react";
import RenderMovies from "./RenderMovies";
import AllData from "../ContextApi";

export default function SimilarMovies(props) {

    const [similarMovies, setSimilarMovies] = useState([])
    const { selectedMovie } = useContext(AllData);



    const fetchSimilarMovies = () => {
        const API_URL = 'https://api.themoviedb.org/3/movie/';
        let id = props.movieId;
        const apiKey = '4a8e3679e70d606a9981baa4c0311d38';
        let url = `${API_URL}/${id}/similar?language=en-US&page=1&api_key=${apiKey}`;

        fetch(url)
            .then(res => res.json())
            .then((data) => {
                setSimilarMovies(data?.results.slice(0, 4));
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        fetchSimilarMovies()
    }, [props.movieId])

    useEffect(() => {
        props.setThisMovie(selectedMovie);
        props.setMovieId(props.movieId);
    }, [selectedMovie])

    return (
        <div className="similarMovies flex">
            <h2>Similar Movies</h2>
            <RenderMovies moviesToRender={similarMovies} />
        </div>
    )
}
