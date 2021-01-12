import React, { useEffect } from 'react'
import "../css/SnapPreview.css"
import SnapPreviewProgress from "./SnapPreviewProgress"
import { useHistory } from "react-router-dom"
import { useStateValue } from "../context_reducers/StateProvider"

function SnapPreview() {
    const history = useHistory()
    const [{ previewSnapURL }, dispatch] = useStateValue()

    useEffect(() => {
        if (!previewSnapURL)
            history.replace('/')
        // eslint-disable-next-line
    }, [])

    const closePreview = () => {
        dispatch({
            type: 'SET_PREVIEW_SNAP_URL',
            previewSnapURL: null
        })
        history.push('/')
    }

    return (
        <div className="snappreview">
            {previewSnapURL &&
                <>
                    <SnapPreviewProgress closePreview={closePreview} />
                    <img src={previewSnapURL} alt="" className="snappreview__image" />
                    <button onClick={closePreview} className="snappreview__closeBtn">&#10006;</button>
                </>
            }
        </div>
    )
}

export default SnapPreview
