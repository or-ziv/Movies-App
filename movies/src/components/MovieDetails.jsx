import React, { useEffect, useState } from "react";


export default function MovieDetails(props) {

    const [thisMovie, setThisMovie] = useState({});
    console.log(thisMovie);


    useEffect(() => {
        setThisMovie(props.selectedMovie)
    }, [thisMovie])


    return (
        <div className="movieDetails flex">
            <h1>{thisMovie?.title}</h1>
            <br />
            <br />
            <div className="flex" style={{ flexDirection: 'row', gap: ' 100px' }}>

                <div className="movieDetailsImages flex">
                    <img className="movieDisplay" style={{ cursor: 'default' }} src={`https://image.tmdb.org/t/p/w500${thisMovie?.poster_path}`} alt={`${thisMovie?.title}`} />
                    {/* <img src={`https://image.tmdb.org/t/p/w500${thisMovie?.backdrop_path}`} alt={`${thisMovie?.title}`} /> */}
                </div>


                <div className="flex">
                    <p style={{ width: '600px', color: 'white', textAlign: 'left', lineHeight: '35px' }}>{thisMovie?.overview}</p>
                    <h3>Release Date: {thisMovie?.release_date}</h3>
                </div>

            </div>

        </div>
    )
}
