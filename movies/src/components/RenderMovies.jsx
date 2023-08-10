import React, { useContext } from "react";
import AllData from "../ContextApi";
import MovieCard from "./MovieCard";

export default function RenderMovies(props) {

    const { setHeroMovie, setMovieVideos } = useContext(AllData);

    const renderMovies = props.moviesToRender?.slice(0, 16);


    const scrollToTop = () => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    };

    return (
        <div>
            <div className="upComing">
                {renderMovies?.map((movie) => (
                    <div key={movie.id} onClick={() => { setHeroMovie(movie); scrollToTop(); setMovieVideos('') }}>
                        <MovieCard
                            movie={movie}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
