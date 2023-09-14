import { createContext, useState, useEffect } from "react";

const AllData = createContext();

export const DataProvider = ({ children }) => {

    //For Showing The Main Movie In The Website 
    const [heroMovie, setHeroMovie] = useState({});

    // To Select A Movie
    const [selectedMovie, setSelectedMovie] = useState({});

    // Getting the videos for each movie
    const [movieVideos, setMovieVideos] = useState('');

    return (
        <AllData.Provider
            value={{
                heroMovie, setHeroMovie,
                selectedMovie, setSelectedMovie,
                movieVideos, setMovieVideos,
            }}>
            {children}
        </AllData.Provider>
    )
}


export default AllData;