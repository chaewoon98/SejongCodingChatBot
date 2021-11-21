import React from 'react'
import ReactModal from 'react-modal'
import reactDom from 'react-dom'
import '../../css/modal/CodeMsgModal.css'
import { LOGIN_BEFORE } from '../../redux/login/loginTypes'

const CodeMsgModal = ({ setModalOn, msg}) => {
    return (
        <div className="codeMsgModal">
            <div className="codeMsgMbg" />
            <div className="codeMsgModalBox" style={{width:'650px'}}>
                <p>코드 메세지 확인하기</p>
                <p style={{whiteSpace:'pre'}} >{msg}</p>
                <div></div>
                <button onClick={() => {
                    setModalOn(false);
                }}>확 인</button>
            </div>
        </div>
    );
}

export default CodeMsgModal;
