import React, { useEffect, useState } from "react";

export default function MoviesReviews(props) {

    const [reviews, setReviews] = useState(['No Reviews']);
    const [classNameFlag, setClassNameFlag] = useState('moviesReview');

    const fetchReviews = () => {
        const API_URL = 'https://api.themoviedb.org/3/movie/';
        let id = props.movieId;
        const apiKey = process.env.REACT_APP_API_KEY;
        let url = `${API_URL}/${id}/reviews?language=en-US&page=1&api_key=${apiKey}`;

        fetch(url)
            .then(res => res.json())
            .then((data) => {
                setReviews(data.results);
            })
            .catch((err) => {
                console.log(err);
            });
    };


    useEffect(() => {
        fetchReviews();
    }, [props.movieId])

    useEffect(() => {

        if (reviews?.length <= 1) {
            setClassNameFlag('flex')
        } else {
            setClassNameFlag('moviesReview')
        }

    }, [reviews])




    return (
        <div className={classNameFlag}>
            {reviews?.length === 0 ? (
                <h3>No reviews available.</h3>
            ) : (
                reviews?.slice(0, 4).map((val) => (
                    <div className="reviewDisplay" key={val.id}>
                        <h2 style={{ textDecoration: 'underline' }}>{val.author}</h2>
                        <p style={{ color: 'white', textAlign: 'left' }}>{val.content}</p>
                    </div>
                ))
            )}
        </div>
    );
};

