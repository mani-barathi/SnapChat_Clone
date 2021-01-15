import React, { useRef, useState, useCallback } from 'react'
import '../css/WebCam.css'
import Webcam from "react-webcam"
import { useHistory } from "react-router-dom"

import firebase from "firebase"
import { db, storage } from "../firebase"
import { useStateValue } from '../context_reducers/StateProvider'

function WebCam() {
    const history = useHistory()
    // grab the user from the context
    const [{ user }] = useStateValue()
    const [image, setImage] = useState(null)
    const webCamRef = useRef(null)

    const videoConstraints = {
        width: 300,
        height: 500,
        facingMode: "user"
    };

    const takeSnapshot = useCallback(() => {
        const snap = webCamRef.current.getScreenshot()
        setImage(snap)
    }, [webCamRef])

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
            null,                               // uploading function ( Not tracking the progress of Image upload)
            (error) => console.log(error),      // Error function
            () => {                             // Success function     
                storage.ref('snaps').child(id).getDownloadURL()
                    .then(url => {
                        db.collection('snaps').add({
                            displayName: user.displayName,
                            imageURL: url,
                            photoURL: user.photoURL,
                            timestamp: firebase.firestore.FieldValue.serverTimestamp()
                        })
                        console.log('Uploaded a Snap!!');
                    })
            }
        )
        history.push('/')
    }

    return (
        <div className="webcam">
            { image ? (  // If there is a image then, show the preview of that image
                <>
                    <img className='webcam__preview' src={image} alt="" />
                    <button className="webcam__closeBtn"
                        onClick={closePreview}
                    >&#10006;</button>
                    <button className="webcam__sendBtn"
                        onClick={uploadSnap}
                    >send &#10148;</button>
                </>
            ) : (       // If there is no image then, show the camera
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