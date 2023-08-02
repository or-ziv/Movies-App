import React, { useEffect, useState } from "react";

export default function MoviesReviews(props) {

    const [reviews, setReviews] = useState(['No Reviews']);
    const [classFlag, setClassFlag] = useState('moviesReview');

    const fetchReviews = () => {
        const API_URL = 'https://api.themoviedb.org/3/movie/';
        let id = props.movieId;
        const apiKey = '4a8e3679e70d606a9981baa4c0311d38';
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
            setClassFlag('flex')
        } else {
            setClassFlag('moviesReview')
        }

    }, [reviews])




    return (
        <div className={classFlag}>
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

