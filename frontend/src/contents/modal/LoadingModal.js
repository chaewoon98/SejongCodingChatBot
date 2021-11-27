import React from 'react'
import '../../css/modal/LoadingModal.css'

import { connect, useDispatch } from 'react-redux';

const LoadingModal = ({ isLoading }) => {

    return (
        <>
            {isLoading ?
                <div className="loadingModal">
                    <div className="loadingModalbg" />
                    <div className="loadingModalBox">
                        <img src="img/loading.gif"></img>
                    </div>
                </div> : null}
        </>

    );
}

const mapStateTpProps = ({ views }) => {
    return {
        isLoading: views.isLoading,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(mapStateTpProps, mapDispatchToProps)(LoadingModal);
