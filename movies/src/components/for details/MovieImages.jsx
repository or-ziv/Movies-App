import React, { useEffect, useState } from "react";

export default function MovieImages(props) {

    const [images, setImages] = useState([]);

    const fetchMovieImages = () => {
        const API_URL = 'https://api.themoviedb.org/3/movie/';
        let id = props.movieId;
        const apiKey = process.env.REACT_APP_API_KEY;
        let url = `${API_URL}/${id}/images?language=en-US&page=1&api_key=${apiKey}`;

        fetch(url)
            .then(res => res.json())
            .then((data) => {
                setImages(data)
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        fetchMovieImages()
    }, [props.movieId])


    console.log(images);


    return (
        <div className="movieImages flex">

            {images?.backdrops?.map((movie) => {
                return (
                    <div key={movie.id}>

                        <img src="" alt='movieImg' />

                    </div>
                )
            })}



        </div>
    )
}
