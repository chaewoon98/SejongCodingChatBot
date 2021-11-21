import React from 'react'
import ReactModal from 'react-modal'
import reactDom from 'react-dom'
import '../../css/modal/LoginModal.css'
import { LOGIN_BEFORE } from '../../redux/login/loginTypes'

const IdSearchModal = ({ setModalOn}) => {
    return (
        <div className="modal">
            <div className="bg" />
            <div className="modalBox" style={{width:'350px', height:'180px'}}>
                <p>아이디 찾기</p>
                <p style={{lineHeight:'1.5'}}>아이디는 세종대학교 학번입니다.
                    <br/>가입한 학번에 오류가 있다고 판단될 경우,<br/>문의 사항을 통해 문의 바랍니다.</p>
                <div style={{height: '1.5px'}}></div>
                <button onClick={() => {
                    setModalOn(false);
                }}>확 인</button>
            </div>
        </div>
    );
}

export default IdSearchModal;
