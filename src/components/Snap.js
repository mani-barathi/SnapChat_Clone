import React from 'react'
import "../css/Snap.css"
function Snap({ data }) {
    return (
        <div className="snap">
            <img src={data.photoURL}
                alt=""
                className="snap__avatar" />
            <div className="snap__info">
                <h4 className="snap__infoDisplayName">{data.displayName}</h4>
                <span className="snap__infoViewText">Tap to View -</span>
                <span className="snap_infoTimestamp">{new Date(data.timestamp?.toDate()).toUTCString()}</span>
            </div>
        </div>
    )
}

export default Snap
