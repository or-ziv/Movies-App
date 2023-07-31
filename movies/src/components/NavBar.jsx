import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AllData from "../ContextApi";

export default function NavBar(props) {

    const { navbarFlag, logOut } = useContext(AllData);
    const nav = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        nav('/');
        props.searchMovies(e);
    }


    return (
        <div className="navbar flex">
            <div>
                <Link to={'/'}>
                    <button onClick={() => { props.setSearchedMovies('') }} className="btnsNavbar btnAnimation">Home</button>
                </Link>

                <Link to={'/toprated'}>
                    <button className="btnsNavbar btnsNavbar2 btnAnimation">Top Rated</button>
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

            <div >
                {!navbarFlag ? (
                    <>
                        <Link to={'/signin'}>
                            <button className="btnsNavbar btnsNavbar2 btnAnimation">Sign In</button>
                        </Link>

                        <Link to={'/signup'}>
                            <button className="btnsNavbar btnsNavbar2 btnAnimation">Sign Up</button>
                        </Link>
                    </>
                ) : (
                    <>
                        <Link to={`/favorites`}>
                            <button className="btnsNavbar btnsNavbar2 btnAnimation">Favorites</button>
                        </Link>

                        <Link to={'/'}>
                            <button onClick={() => { logOut() }} className="btnsNavbar btnsNavbar2 btnAnimation">Log Out</button>
                        </Link>
                    </>
                )}
            </div>

        </div>
    )
}


