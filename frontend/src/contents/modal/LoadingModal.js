import React from 'react'
import '../../css/modal/LoadingModal.css'

const LoadingModal = () => {
    return (
        <div className="loadingModal">
            <div className="loadingModalbg" />
            <div className="loadingModalBox">
                <img src="img/loading.gif"></img>
            </div>
        </div>
    );
}

export default LoadingModal
