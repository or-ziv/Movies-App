import { Link } from 'react-router-dom';
import starIcon from '../icons/starIcon.png'
import React, { useState } from "react";


export default function MovieCard({ movie, setSelectedMovie }) {

    const [isHovering, setIsHovering] = useState(false);

    const handleMouseOver = () => {
        setIsHovering(true);
    };

    const handleMouseOut = () => {
        setIsHovering(false);
    };

    return (
        <div className="movieCard">
            <h3 className="movieTitle" >{movie?.title}</h3>

            <div className="movieDisplay" key={movie.id}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
                style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.poster_path})` }}>

                {isHovering ? (
                    <div className="flex" style={{ flexDirection: 'row', gap: '25%', filter: 'brightness(100%)' }}>
                        <Link to={'/details'}>
                            <button onClick={() => { setSelectedMovie(movie) }} className="btns cardBtn btnAnimation">More Details</button>
                        </Link>
                        <button className="btn cardBtn btnAnimation">Add To Favorite</button>
                    </div>
                ) : (
                    <>
                    </>
                )}

            </div>

            <div className="flex" style={{ flexDirection: 'row' }}>
                <h3>{movie.vote_average}</h3>
                <img src={starIcon} alt="starIcon" style={{ width: '20px', border: 'none', marginLeft: '10px' }} />
            </div>

        </div >
    )
}
