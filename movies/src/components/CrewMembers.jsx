import React, { useEffect, useState } from "react";

export default function CrewMembers(props) {

    const [crew, setCrew] = useState([]);

    const fetchActors = () => {
        const API_URL = 'https://api.themoviedb.org/3/movie/';
        let id = props.movieId;
        const apiKey = '4a8e3679e70d606a9981baa4c0311d38';
        let url = `${API_URL}/${id}/credits?language=en-US&page=1&api_key=${apiKey}`;

        fetch(url)
            .then(res => res.json())
            .then((data) => {
                setCrew(data?.crew?.slice(0, 6));
            })
            .catch((err) => {
                console.log(err);
            });
    };



    useEffect(() => {
        fetchActors();
    }, [props.movieId])



    return (
        <div className="actorsDiv" style={{ height: '600px ' }}>
            {/* <h1 style={{ color: 'white' }}>Top Cast</h1> */}
            {crew?.map((val) => {
                return (
                    <div key={val.id} className="flex actorDisplay" style={{ flexDirection: 'row' }}>
                        <img className="ActorImg" src={`https://image.tmdb.org/t/p/w500${val.profile_path}`} alt={`${val.name} - img`} />

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
