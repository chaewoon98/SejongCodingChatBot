import React from 'react'
import ReactModal from 'react-modal'
import reactDom from 'react-dom'
import '../../css/modal/LoginModal.css'
import { LOGIN_BEFORE } from '../../redux/login/loginTypes'

const ChatRoomDeniedModal = ({ setModalOn}) => {
    return (
        <div className="modal">
            <div className="bg" />
            <div className="modalBox" style={{width:'350px'}}>
                <p>채팅방 생성 오류</p>
                <p>채팅방은 TA 조교만 생성 가능합니다.
                    <br/>문의사항을 통해, TA 조교 자격을 신청해주세요.</p>
                <div></div>
                <button onClick={() => {
                    setModalOn(false);
                }}>확 인</button>
            </div>
        </div>
    );
}

export default ChatRoomDeniedModal;
