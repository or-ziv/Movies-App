import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AllData from "../MoviesContextApi";
import UserData from "../UserContextApi";

export default function NavBar(props) {
    const { navbarFlag, logOut } = useContext(UserData);
    const { setMovieVideos } = useContext(AllData);
    const nav = useNavigate();

    const [btnBG, setBtnBG] = useState(0);

    const handleClick = (index) => {
        setBtnBG(index);
    }

    const isButtonActive = (index) => {
        return btnBG === index ? 'activeBtn' : '';
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        nav('/');
        props.searchMovies(e);
    }

    return (
        <div className="navbar flex">
            <div className="btnsDivNavbar">
                <Link to={'/'}>
                    <button
                        onClick={() => { handleClick(0); setMovieVideos(undefined) }}
                        className={`btnsNavbar btnAnimation ${isButtonActive(0)}`}>
                        Home
                    </button>
                </Link>

                <Link to={'/toprated'}>
                    <button
                        onClick={() => { handleClick(1) }}
                        className={`btnsNavbar btnAnimation ${isButtonActive(1)}`}>
                        Top Rated
                    </button>
                </Link>
            </div>

            <form>
                <input
                    className="inputs" type="text"
                    placeholder="Search a Movie"
                    onChange={(e) => { props.setSearchKey(e.target.value) }}
                    value={props.searchKey}
                />
                <input type="submit" onClick={handleSubmit} style={{ display: 'none' }} />
            </form>

            <div>
                {!navbarFlag ? (
                    <div className="btnsDivNavbar">
                        <Link to={'/signin'}>
                            <button
                                onClick={() => { handleClick(2) }}
                                className={`btnsNavbar btnAnimation ${isButtonActive(2)}`}>
                                Sign In
                            </button>
                        </Link>

                        <Link to={'/signup'}>
                            <button
                                onClick={() => { handleClick(3) }}
                                className={`btnsNavbar btnAnimation ${isButtonActive(3)}`}>
                                Sign Up
                            </button>
                        </Link>
                    </div>
                ) : (
                    <div className="btnsDivNavbar">                        <Link to={`/favorites`}>
                        <button
                            onClick={() => { handleClick(4) }}
                            className={`btnsNavbar btnAnimation ${isButtonActive(4)}`}>
                            Favorites
                        </button>
                    </Link>

                        <Link to={'/'}>
                            <button
                                onClick={() => { logOut(); }}
                                className="btnsNavbar  btnAnimation">
                                Log Out
                            </button>
                        </Link>
                    </div>
                )}
            </div>

        </div>
    )
}
