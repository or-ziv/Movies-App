import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignIn(props) {

    const nav = useNavigate();
    const allUsers = JSON.parse(localStorage.getItem('users'));

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errorP, setErrorP] = useState('');

    const handleLogin = () => {
        if (email === '' || password === '') {
            setErrorP('Inavlid Email Or Password.');
            return;
        }

        const thisUser = allUsers.filter((val) => (
            val.email === email && val.password === password));

        if (thisUser === null || thisUser === []) {
            setErrorP('Inavlid Email Or Password.');
            return;
        }

        props.setCurrentUser(thisUser[0]);
        props.setNavbarFlag(true);
        nav('/');

    }



    return (
        <div className="flex">

            <div className="signInOut flex">
                <h1>Sign In</h1>
                <br />
                <p className="errorP">{errorP}</p>
                <input onChange={(e) => { setEmail(e.target.value) }} className="inputs margin" type="email" placeholder="Enter Your Email Address..." />
                <br />
                <input onChange={(e) => { setPassword(e.target.value) }} className="inputs " type="password" placeholder="Enter Your Password..." />
                <br />
                <button onClick={handleLogin} className="btns margin">Login</button>

                <br />
            </div>


        </div>
    )
}
