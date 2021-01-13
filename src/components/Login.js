import React from 'react'
import "../css/Login.css"
import { provider, auth } from "../firebase"
function Login() {

    const handleLogin = (event) => {
        auth.signInWithPopup(provider)
            .then(result => console.log(`${result.user.displayName} Logged In!`))
            .catch(error => {
                console.log('Login Error: ', error)
                alert(error.message)
            })
    }

    return (
        <div className='login'>
            <h1 className="login__title">
                SnapChat Clone
            </h1>
            <center>
                <button className="login__formButton" type="submit"
                    onClick={handleLogin} >Sign In
                </button>
            </center>
        </div>
    )
}

export default Login
