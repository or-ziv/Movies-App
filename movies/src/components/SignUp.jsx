import React from "react";

export default function SignUp() {
    return (



        <div className="flex">


            <div className="signInOut flex">
                <h1>Sign Up</h1>
                <br />
                <p className="errorP"></p>
                <input className="inputs" type="text" placeholder="Enter Your UserName..." />
                <br />
                <p className="errorP"></p>
                <input className="inputs" type="email" placeholder="Enter Your Email Address..." />
                <br />
                <p className="errorP"></p>
                <input className="inputs" type="password" placeholder="Enter Your Password..." />
                <br />
                <p className="errorP"></p>
                <input className="inputs" type="password" placeholder="Enter Your Password Again..." />
                <br />
                <button className="btns margin">Login</button>

            </div>


        </div>
    )
}
