import React from 'react'
import ReactModal from 'react-modal'
import reactDom from 'react-dom'
import '../../css/modal/HotKeywordInfo.css'
import { LOGIN_BEFORE } from '../../redux/login/loginTypes'

const HotKeywordInfoModal = ({ setModalOn, title, content }) => {
    return (
        <div className="hotKeywordInfoModal">
            <div className="hotKeywordInfoMbg" />
            <div className="hotKeywordInfoModalBox"
                style={{ width: '550px' }}>
                <p>실시간 인기 키워드</p>

                <div className="hotKeywordInfoContent">
                    <p>{title}</p>
                    <p>{content}</p>
                </div>

                <div></div>
                <button onClick={() => {
                    setModalOn(false);
                }}>확 인</button>
            </div>
        </div>
    );
}

export default HotKeywordInfoModal;
