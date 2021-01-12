import React from 'react'
import "../css/Snap.css"
import { useHistory } from "react-router-dom"
import { useStateValue } from "../context_reducers/StateProvider"

function Snap({ data }) {
    const history = useHistory()
    const [state, dispatch] = useStateValue()

    const showSnapPreview = () => {
        dispatch({
            type: 'SET_PREVIEW_SNAP_URL',
            previewSnapURL: data.imageURL
        })
        history.push('/preview')
    }

    return (
        <div className="snap">
            <img src={data.photoURL}
                alt=""
                className="snap__avatar" />
            <div className="snap__info" onClick={showSnapPreview}>
                <h4 className="snap__infoDisplayName">{data.displayName}</h4>
                <span className="snap__infoViewText">Tap to View -</span>
                <span className="snap_infoTimestamp">{new Date(data.timestamp?.toDate()).toUTCString()}</span>
            </div>
        </div>
    )
}

export default Snap
