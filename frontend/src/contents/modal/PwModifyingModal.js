import React, { useState } from 'react';
import ReactModal from 'react-modal';
import reactDom from 'react-dom';
import '../../css/modal/RoomAddingModal.css';
import { LOGIN_BEFORE } from '../../redux/login/loginTypes';
import axios from 'axios';
import { API_BASE_URL } from '../utils/Constant';

const PwModifyingModal = ({ setModalOn }) => {
  const [nowPw, setNowPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [newPwCheck, setNewPwCheck] = useState('');
  const reg_pw = /^[a-z0-9_.*?[#?!@$%^&*-]{4,20}$/;

  const modifyPw = () => {
    if (nowPw === '' || newPw === '' || newPwCheck === '') {
      alert('🙄❗❓ 입력칸을 전부 입력해주세요. ❓❗🙄');
      return;
    }

    if (!reg_pw.test(newPw)) {
      alert('🙄❗❓ 패스워드는 4글자 이상으로 입력해주세요. ❓❗🙄');
      return;
    }

    if (newPw !== newPwCheck) {
      alert('🙄❗❓ 새 비밀번호가 일치하지 않습니다. ❓❗🙄');
      return;
    }

    axios
      .post(
        API_BASE_URL + '/update/pw',
        { nowPwd: nowPw, newPwd: newPw },
        {
          headers: {
            'Content-type': 'application/json',
            Accept: 'application/json',
          },
          withCredentials: true,
        },
      )
      .then((res) => {
        if (res.data === 'pwdError') {
          alert('🙄❗❓ 현재 비밀번호가 일치하지 않습니다. ❓❗🙄');
          return;
        }
        setModalOn(false);
        alert('✔✔✔ 비밀번호 변경 성공 ✔✔✔');
      })
      .catch((res) => {
        console.log(res);
      });
  };

  return (
    <div className="roomAddingmodal">
      <div className="bg" />
      <div className="roomAddingmodalBox">
        <p className="modalTitle">비밀번호 변경</p>

        <div className="oneRow">
          <p style={{ width: '130px', marginTop: '12px' }}>현재 비밀번호</p>
          <input
            style={{ width: '230px', fontFamily: 'none' }}
            type="password"
            onChange={(e) => {
              setNowPw(e.target.value);
            }}
          ></input>
        </div>

        <div className="oneRow">
          <p style={{ width: '130px', marginTop: '12px' }}>새 비밀번호</p>
          <input
            style={{ width: '230px', fontFamily: 'none' }}
            type="password"
            onChange={(e) => {
              setNewPw(e.target.value);
            }}
          ></input>
        </div>

        <div className="oneRow">
          <p style={{ width: '130px', marginTop: '12px' }}>새 비밀번호 확인</p>
          <input
            style={{ width: '230px', fontFamily: 'none' }}
            type="password"
            onChange={(e) => {
              setNewPwCheck(e.target.value);
            }}
          ></input>
        </div>

        <div className="cuttingLine" ></div>
        <div className="bntGroup">
          <button
            style={{ color: '#ff7777' }}
            onClick={() => {
              setModalOn(false);
            }}
          >
            취 소
          </button>
          <button
            onClick={() => {
              modifyPw();
            }}
          >
            확 인
          </button>
        </div>
      </div>
    </div>
  );
};

export default PwModifyingModal;
