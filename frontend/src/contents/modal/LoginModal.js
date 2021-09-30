import React from 'react'
import ReactModal from 'react-modal'
import reactDom from 'react-dom'
import '../../css/modal/LoginModal.css'
import { LOGIN_BEFORE } from '../../redux/login/loginTypes'

const LoginModal = ({ setModalOn, changeType }) => {
    return (
        <div className="modal">
            <div className="bg" />
            <div className="modalBox">
                <p>로그인 오류</p>
                <p>아이디 또는 비밀번호를<br />다시 확인해 주세요.</p>
                <div></div>
                <button onClick={() => {
                    setModalOn(false);
                    changeType(LOGIN_BEFORE);
                }}>확 인</button>
            </div>
        </div>
    );
}

export default LoginModal;
