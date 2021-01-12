import React, { useEffect, useState } from 'react'
import "../css/Home.css"
import { useHistory } from "react-router-dom"
import { useStateValue } from "../context_reducers/StateProvider"
import Snap from "./Snap"
import { db } from "../firebase"

function SnapList() {
    const history = useHistory()
    // eslint-disable-next-line
    const [{ user }, dispatch] = useStateValue()
    const [snaps, setSnaps] = useState([])

    useEffect(() => {
        console.log("Home is loaded")
        const unsubscribe = db.collection('snaps')
            .orderBy('timestamp', 'desc')
            .onSnapshot(snapshot => {
                setSnaps(
                    snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data()
                    }))      // end of map()
                )           // end of setSnaps
            })              // end of onSnapshot

        return () => {
            unsubscribe()
        }
        // eslint-disable-next-line
    }, [])

    const goToWebCam = () => {
        history.push('/webcam')
    }

    const logoutUser = () => {
        dispatch({
            type: 'SET_USER',
            user: null
        })
    }

    return (
        <div className="home">
            <div className="home__header">
                <img alt="" className="home__headerAvatar" title="Click to Logout"
                    src="https://avatars2.githubusercontent.com/u/49336839?s=460&u=fbbc21b3ee2066b82cf7ddf1205524757ac5f3f4&v=4"
                    onClick={logoutUser} />
                <input type="text" className="home__headerInput" placeholder="Friends..." />
                <span className="home__headerPlusBtn">+</span>
            </div>
            <div className="home__body">
                {
                    snaps.map(snap =>
                        <Snap key={snap.id} data={snap.data} />
                    )
                }

                <div className="home__bodyBottomSpace">

                </div>

                <button onClick={goToWebCam} className="home__bodyCameraBtn"
                    title="Click to take a Snap" ></button>
            </div>
        </div>
    )
}

export default SnapList
