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
                {tenUpComingMovies?.map((movie) => (
                    <div key={movie.id} onClick={() => { props.setSelectedMovie(movie); scrollToTop(); }}>
                        <MovieCard movie={movie} selectedMovie={props.selectedMovie} setSelectedMovie={props.setSelectedMovie} />
                    </div>
                ))}
            </div>
        </div>
    );
}
