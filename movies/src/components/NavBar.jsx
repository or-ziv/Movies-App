import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
    return (
        <div className="navbar flex">

            <div>
                <Link to={'/'}>
                    <button className="btnsNavbar">Home</button>
                </Link>
                <button className="btnsNavbar btnsNavbar2">Top Rated</button>
            </div>

            <input className="inputs" type="text" placeholder="Search a Movie" />

            <div>
                <Link to={'/signin'}>
                    <button className="btnsNavbar btnsNavbar2">Sign In</button>
                </Link>
                
                <Link to={'/signup'}>
                    <button className="btnsNavbar btnsNavbar2">Sign Up</button>
                </Link>

            </div>
        </div>
    )
}
