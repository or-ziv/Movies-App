import React, { useEffect, useState } from "react";
import defaultProfilePic from '../../icons/defaultProfilePic.jpg'


export default function Actors(props) {

    const [actors, setActors] = useState([]);
    const [crew, setCrew] = useState([]);

    const fetchActors = () => {
        const API_URL = 'https://api.themoviedb.org/3/movie/';
        let id = props.movieId;
        const apiKey = process.env.REACT_APP_API_KEY;
        let url = `${API_URL}/${id}/credits?language=en-US&page=1&api_key=${apiKey}`;

        fetch(url)
            .then(res => res.json())
            .then((data) => {
                setActors(data?.cast?.slice(0, 10));
                setCrew(data?.crew);
            })
            .catch((err) => {
                console.log(err);
            });
    };


    useEffect(() => {
        fetchActors();
    }, [props.movieId])

    return (
        <div className="actorsDiv ">
            <h1 style={{ color: 'white' }}>Top Cast</h1>
            <br />
            {actors?.map((val) => {
                return (
                    <div key={val.id} className="flex actorDisplay" style={{ flexDirection: 'row',justifyContent:'space-between' }}>

                        <img
                            className={val.profile_path ? 'ActorImg' : 'defaultPic'}
                            src={val.profile_path ? `https://image.tmdb.org/t/p/w500${val.profile_path}` : defaultProfilePic}
                        />

                        <div className="flex" >
                            <h3>{val.name}</h3>
                            <p>{val.character}</p>
                        </div>

                    </div>
                )
            })}

        </div >
    )
}
