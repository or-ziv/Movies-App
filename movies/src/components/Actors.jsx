import React, { useEffect, useState } from "react";

export default function Actors(props) {

    const [actors, setActors] = useState([]);
    const [crew, setCrew] = useState([]);



    const fetchActors = () => {
        const API_URL = 'https://api.themoviedb.org/3/movie/';
        let id = props.movieId;
        const apiKey = '4a8e3679e70d606a9981baa4c0311d38';
        let url = `${API_URL}/${id}/credits?language=en-US&page=1&api_key=${apiKey}`;

        fetch(url)
            .then(res => res.json())
            .then((data) => {
                // console.log(data);
                setActors(data.cast.slice(0, 20));
                setCrew(data.crew);
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
                    <div key={val.id} className="flex actorDisplay" style={{ flexDirection: 'row' }}>
                        <img className="ActorImg" src={`https://image.tmdb.org/t/p/w500${val.profile_path}`} alt={`${val.name}`} />

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
