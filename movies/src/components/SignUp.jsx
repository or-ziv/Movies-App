import React, { useState, useContext } from "react";
import AllData from "../ContextApi";
import { useNavigate } from "react-router-dom";

export default function SignUp() {

    const { register } = useContext(AllData);

    const nav = useNavigate();

    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordAgain, setPasswordAgain] = useState('');

    const [userNameError, setUserNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [passAgainError, setPassAgainError] = useState('');


    const handleSignUp = () => {
        // Validation for UserName
        if (userName.length < 2 || userName.length > 10) {
            setUserNameError('UserName Length Must Be Between 2 And 10 Characters.');
            return;
        }
        setUserNameError('');

        // Validation for Email
        if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
            setEmailError('Invalid Email Address.');
            return;
        }
        setEmailError('');

        // Validation for Password
        if (!/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,}$/.test(password)) {
            setPasswordError('Password must be minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character');
            return;
        }
        setPasswordError('');

        // Validation for matching passwords
        if (passwordAgain !== password) {
            setPassAgainError(`Passwords Don't Match.`);
            return;
        }
        setPassAgainError('');


        register(userName, email, password);
        nav('/signin');

    }




    return (



        <div className="flex">


            <div className="signInOut flex">
                <h1>Sign Up</h1>
                <br />

                <p className="errorP">{userNameError}</p>
                <input onChange={(e) => { setUserName(e.target.value) }} className="inputs" type="text" placeholder="Enter Your UserName..." />
                <br />

                <p className="errorP">{emailError}</p>
                <input onChange={(e) => { setEmail(e.target.value) }} className="inputs" type="email" placeholder="Enter Your Email Address..." />
                <br />

                <p className="errorP">{passwordError}</p>
                <input onChange={(e) => { setPassword(e.target.value) }} className="inputs" type="password" placeholder="Enter Your Password..." />
                <br />

                <p className="errorP">{passAgainError}</p>
                <input onChange={(e) => { setPasswordAgain(e.target.value) }} className="inputs" type="password" placeholder="Enter Your Password Again..." />
                <br />

                <button onClick={handleSignUp} className="btns margin btnAnimation btnsNavbar" style={{ width: '150px' }}>Sign Up</button>

                <br />
                <p onClick={() => { nav('/signin') }} style={{ cursor: 'pointer' }}>Already Have an Account? Click Here</p>


            </div>


        </div>
    )
}
