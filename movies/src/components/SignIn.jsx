import React from "react";

export default function SignIn() {
    return (
        <div className="flex">

            <div className="signInOut flex">
                <h1>Sign In</h1>
                <br />
                <p className="errorP"></p>
                <input className="inputs margin" type="email" placeholder="Enter Your Email Address..." />
                <br />
                <input className="inputs " type="password" placeholder="Enter Your Password..." />
                <br />
                <button className="btns margin">Login</button>

                <br />
                <p style={{cursor:'pointer'}}>Already Have an Account? Click Here</p>
            </div>


        </div>
    )
}
