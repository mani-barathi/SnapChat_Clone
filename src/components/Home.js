import React from 'react'
import "../css/Home.css"
import { useHistory } from "react-router-dom"

function SnapList() {
    const history = useHistory()

    const goToWebCam = () => {
        history.push('/webcam')
    }

    return (
        <div className="home">
            <div className="home__header">
                <img src="https://avatars2.githubusercontent.com/u/49336839?s=460&u=fbbc21b3ee2066b82cf7ddf1205524757ac5f3f4&v=4" alt="" className="home__headerAvatar" />
                <input type="text" className="home__headerInput" placeholder="Search..." />
            </div>
            <div className="home__body">

                <button onClick={goToWebCam} className="home__bodyCameraBtn"></button>
            </div>
        </div>
    )
}

export default SnapList
