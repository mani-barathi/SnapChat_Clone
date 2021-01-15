import React, { useEffect, useState } from 'react'
import "../css/Home.css"
import { useHistory } from "react-router-dom"
import { useStateValue } from "../context_reducers/StateProvider"
import Snap from "./Snap"
import { db, auth } from "../firebase"

function Home() {
    const history = useHistory()
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
        auth.signOut()
            .then(() => {
                console.log('User Logged Out')
                dispatch({ type: "SET_USER", user: null })
            })
            .catch(error => alert(error.message))
    }

    return (
        <div className="home">
            <div className="home__header">
                <img alt="" className="home__headerAvatar" title="Click to Logout"
                    src={user.photoURL}
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

                <div className="home__bodyBottomSpace"></div>

                <button onClick={goToWebCam} className="home__bodyCameraBtn"
                    title="Click to take a Snap" ></button>
            </div>
        </div>
    )
}

export default Home
