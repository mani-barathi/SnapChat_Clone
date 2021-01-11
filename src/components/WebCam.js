import React, { useRef, useState } from 'react'
import '../css/WebCam.css'
import Webcam from "react-webcam"
import { useHistory } from "react-router-dom"

import firebase from "firebase"
import { db, storage } from "../firebase"

function WebCam() {
    const history = useHistory()
    const [image, setImage] = useState(null)
    const webCamRef = useRef(null)
    const videoConstraints = {
        width: 300,
        height: 500,
        facingMode: "user"
    };

    const takeSnapshot = () => {
        const snap = webCamRef.current.getScreenshot()
        setImage(snap)
    }

    const closePreview = () => {
        setImage(null)
    }

    const closeWebCam = () => {
        setImage(null)
        history.push('/')
    }

    const uploadSnap = () => {
        const today = new Date()
        const id = `${today.toISOString()}_${today.getTime()}`
        const uploadTask = storage.ref(`snaps/${id}`).putString(image, 'data_url')

        uploadTask.on('state_changed',
            null,                               // uploading function
            (error) => console.log(error),      // Error function
            () => {                             // Success function     
                storage.ref('snaps').child(id).getDownloadURL()
                    .then(url => {
                        db.collection('snaps').add({
                            displayName: 'bhuvi',
                            imageURL: url,
                            photoURL: 'https://avatars0.githubusercontent.com/u/58076602?s=460&u=223d0e34ea276310861bd45c361020b101aea906&v=4',
                            timestamp: firebase.firestore.FieldValue.serverTimestamp()
                        })
                        console.log('Uploaded a data_url string!');
                    })
            }
        )
        history.push('/')
    }

    return (
        <div className="webcam">
            { image ? (
                <>
                    <img className='webcam__preview' src={image} alt="" />
                    <button className="webcam__closeBtn"
                        onClick={closePreview}
                    >&#10006;</button>
                    <button className="webcam__sendBtn"
                        onClick={uploadSnap}
                    >send &#10148;</button>
                </>
            ) : (
                    <>
                        <Webcam ref={webCamRef}
                            mirrored={true}
                            screenshotFormat={'image/jpeg'}
                            videoConstraints={videoConstraints} />
                        <button className="webcam__closeBtn"
                            onClick={closeWebCam}
                        >&#10006;</button>
                        <button onClick={takeSnapshot} className="webcam__snapBtn"></button>
                    </>
                )
            }
        </div>
    )
}

export default WebCam