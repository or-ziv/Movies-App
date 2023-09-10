import React from "react";
import { useContext } from "react";
import AllData from "../ContextApi";
import { Link } from "react-router-dom";
import starIcon from '../icons/starIcon.png'

export default function Favorites() {

    const { currentUser, setSelectedMovie, removeMovieFromFavorites } = useContext(AllData);

    return (
        <div>

            <h1>Your Favorites Movies:</h1>
            <div className="topRatedMap">
                {currentUser?.favorites?.map((movie) => {
                    return (
                        <div className="movieCard flex" key={movie?.id}>
                            <h3 className="movieTitle" >{movie?.title}</h3>

                            <div className="movieDisplay"
                                style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.poster_path})` }}>

                                <div className="flex" style={{ flexDirection: 'row', gap: '25%', filter: 'brightness(100%)' }}>
                                    <Link to={'/details'}>
                                        <button onClick={() => { setSelectedMovie(movie) }} className="btns cardBtn btnAnimation">More Details</button>
                                    </Link>
                                    <button onClick={() => { removeMovieFromFavorites(movie) }} className="btns cardBtn btnAnimation">Remove From Favorite</button>
                                </div>
                            </div>

                            <div className="movieDisplay flex" style={{ flexDirection: 'row', height: '15px', borderTop: 'none' }}>
                                <h3 style={{ marginLeft: '15px' }}>{movie?.vote_average}</h3>
                                <img src={starIcon} alt="starIcon" style={{ width: '20px', border: 'none', marginLeft: '10px' }} />
                            </div>
                        </div >
                    )
                })}
            </div>
        </div>
    )
}
