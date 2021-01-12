import React, { useEffect, useRef } from 'react'
import "../css/Login.css"
import { useStateValue } from "../context_reducers/StateProvider"
function Login() {
    const inputRef = useRef(null)
    // eslint-disable-next-line
    const [state, dispatch] = useStateValue()

    useEffect(() => {
        inputRef.current.focus()
    }, [])

    const handleLogin = (event) => {
        event.preventDefault()
        const name = inputRef.current.value
        if (name) {
            dispatch({
                'type': 'SET_USER',
                user: name
            })
        }
    }

    return (
        <div className='login'>
            <h1 className="login__title">
                SnapChat Clone
            </h1>
            <form className="login__form">
                <input type="text" placeholder="Enter your name"
                    ref={inputRef}
                    className="login__formInput" />
                <center>
                    <button className="login__formButton" type="submit"
                        onClick={handleLogin} >Sign In
                    </button>
                </center>
            </form>
        </div>
    )
}

export default Login
