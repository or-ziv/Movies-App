import React from "react";
import MovieCard from "./MovieCard";

export default function RenderMovies(props) {
    const tenUpComingMovies = props.upComingMovies?.slice(0, 16);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    };

    return (
        <div>
            <div className="upComing">
                {tenUpComingMovies?.map((movie, index) => (
                    <div key={movie.id} onClick={() => { props.setSelectedMovie(movie); scrollToTop(); }}>
                        <MovieCard movie={movie} index={index} />
                    </div>
                ))}
            </div>
        </div>
    );
}
