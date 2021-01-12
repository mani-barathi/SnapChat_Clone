import React, { useEffect } from 'react'
import "../css/SnapPreviewProgress.css"

function SnapPreviewProgress({ closePreview }) {

    useEffect(() => {
        console.log("SnapPreviewProgress is loaded")
        const timer = setTimeout(() => {
            closePreview()
        }, 10000)
        return () => {
            clearTimeout(timer)
            console.log('SnapPreviewProgress is closed')
        }
    }, [closePreview])

    return (
        <div className="snappreviewProgress">
            <div className="snappreviewProgress__inner">

            </div>
        </div>
    )
}

export default SnapPreviewProgress
