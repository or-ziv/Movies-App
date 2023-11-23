import React, { useEffect, useState } from "react";
import defaultProfilePic from '../../icons/defaultProfilePic.jpg'

export default function CrewMembers(props) {

    const [crew, setCrew] = useState([]);

    const fetchActors = () => {
        const API_URL = 'https://api.themoviedb.org/3/movie/';
        let id = props.movieId;
        const apiKey = process.env.REACT_APP_API_KEY;
        let url = `${API_URL}/${id}/credits?language=en-US&page=1&api_key=${apiKey}`;

        fetch(url)
            .then(res => res.json())
            .then((data) => {
                setCrew(data?.crew?.slice(0, 7));
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        fetchActors();
    }, [props.movieId])


    return (
        <div className="actorsDiv" >
            {crew?.map((val) => {
                return (
                    <div key={val.id} className="flex actorDisplay" style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                        <img
                            className={val.profile_path ? 'ActorImg' : 'defaultPic'}
                            src={val.profile_path ? `https://image.tmdb.org/t/p/w500${val.profile_path}` : defaultProfilePic}
                            alt="Profile Pic"
                        />

                        <div className="flex" >
                            <h3>{val.name}</h3>
                            <p>{val.job}</p>
                        </div>
                    </div>
                )
            })}

        </div >
    )
}
