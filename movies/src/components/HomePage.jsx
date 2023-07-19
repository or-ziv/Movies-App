import React from "react";
import TopTenMovies from "./TopTenMovies";
import TrailerMovies from "./TrailerMovies";
import UpComingMovies from "./UpComingMovies";


export default function HomePage() {



    return (
        // <div className="flex">

        <div className="homePage">

            <div className="topMoviesDiv" style={{ overflowX: 'hidden' }}>
                <h2 style={{ color: 'white' }}>Top 10</h2>
                <TopTenMovies />
            </div>

            <div className="trailerDiv">
                <h2 style={{ color: 'white' }}>New Trailers</h2>
                <TrailerMovies />
            </div>

            <div className="upComingMoviesDiv">
                <h2 style={{ color: 'white' }}>Up Coming</h2>
                <UpComingMovies />
            </div>

        </div>


        // </div>
    )
}
