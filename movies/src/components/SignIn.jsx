import React, { useState } from "react";

export default function SignIn(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errorP, setErrorP] = useState('');

    const handleLogin = () => {
        

    }



    return (
        <div className="flex">

            <div className="signInOut flex">
                <h1>Sign In</h1>
                <br />
                <p className="errorP">{errorP}</p>
                <input className="inputs margin" type="email" placeholder="Enter Your Email Address..." />
                <br />
                <input className="inputs " type="password" placeholder="Enter Your Password..." />
                <br />
                <button className="btns margin">Login</button>

                <br />
            </div>


        </div>
    )
}
