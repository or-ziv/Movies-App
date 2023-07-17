import React from "react";

export default function NavBar() {
    return (
        <div className="navbar flex">

            <div>
                <button className="btnsNavbar">Home</button>
                <button className="btnsNavbar btnsNavbar2">Top Rated</button>
            </div>

            <input className="inputs" type="text" placeholder="Search a Movie" />

            <div>
                <button className="btnsNavbar btnsNavbar2">Sign Up</button>
                <button className="btnsNavbar btnsNavbar2">Sign In</button>
            </div>
        </div>
    )
}
