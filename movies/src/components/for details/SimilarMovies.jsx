import React, { useEffect, useState, useContext } from "react";
import rightArrow from '../../icons/rightArrow.png'
import leftArrow from '../../icons/leftArrow.png'
import RenderMovies from "../RenderMovies";
import AllData from "../../MoviesContextApi";

export default function SimilarMovies(props) {

    const { selectedMovie } = useContext(AllData);
    const [similarMovies, setSimilarMovies] = useState([])
    const [startIndex, setStartIndex] = useState(0);
    const moviesPerPage = 4;


    const fetchSimilarMovies = () => {
        const API_URL = 'https://api.themoviedb.org/3/movie/';
        let id = props.movieId;
        const apiKey = process.env.REACT_APP_API_KEY;
        let url = `${API_URL}/${id}/similar?language=en-US&page=1&api_key=${apiKey}`;

        fetch(url)
            .then(res => res.json())
            .then((data) => {
                setSimilarMovies(data?.results);
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


    const handleArrowClick = (direction) => {
        if (direction === "left") {
            setStartIndex(Math.max(0, startIndex - 1));
        } else if (direction === "right") {
            setStartIndex(Math.min(similarMovies?.length - moviesPerPage, startIndex + 1));
        }
    };


    return (
        <div className="similarMovies flex">
            <h2>Similar Movies</h2>
            <div className="ArrowContainer">
                <div
                    className="arrowBtn"
                    onClick={() => handleArrowClick("left")}>
                    <img src={leftArrow} alt="leftArrow" />
                </div>

                <RenderMovies moviesToRender={similarMovies?.slice(startIndex, startIndex + moviesPerPage)} />

                <div
                    className="arrowBtn"
                    onClick={() => handleArrowClick("right")}>
                    <img src={rightArrow} alt="rightArrow" />
                </div>
            </div>
        </div>
    )
}
