import React from "react";
import starIcon from '../icons/starIcon.png'


export default function MovieCard({ movie, index }) {
    return (
        <div className="movieCard">
            <h3 className="movieTitle" >{movie.title}</h3>

            <div className="movieDisplay" key={index}
                style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.poster_path})` }}>
            </div>

            <div className="flex" style={{ flexDirection: 'row' }}>
                <h3>{movie.vote_average}</h3>
                <img src={starIcon} alt="starIcon" style={{ width: '20px', border: 'none', marginLeft: '10px' }} />
            </div>

        </div >
    )
}
