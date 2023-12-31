import React, { useState, useContext } from "react";
import UserData from "../UserContextApi";
import { useNavigate } from "react-router-dom";

export default function SignIn(props) {
    const { users, setNavbarFlag, setCurrentUser } = useContext(UserData);

    const nav = useNavigate();
    const allUsers = users;


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errorP, setErrorP] = useState('');

    const handleLogin = () => {
        if (email === '' || password === '') {
            setErrorP('Inavlid Email Or Password.');
            return;
        }

        const thisUser = allUsers.find((val) => (
            val.email === email && val.password === password));

        if (!thisUser) {
            setErrorP('Inavlid Email Or Password.');
            return;
        }

        setCurrentUser(thisUser);
        setNavbarFlag(true);
        localStorage.setItem('isLoggedIn', JSON.stringify(true));
        localStorage.setItem('currentUser', JSON.stringify(thisUser));
        props.setBtnBG(0);
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
                <button onClick={handleLogin} className="btns margin btnAnimation btnsNavbar signBtn" style={{ width: '150px' }}>Login</button>

                <br />
            </div>


        </div>
    )
}
