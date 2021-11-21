import React, { useState } from 'react';
import ReactModal from 'react-modal';
import reactDom from 'react-dom';
import '../../css/modal/RoomAddingModal.css';
import { LOGIN_BEFORE } from '../../redux/login/loginTypes';
import axios from 'axios';
import { API_BASE_URL } from '../utils/Constant';

const PwSearchModal = ({ setModalOn,changeLoadingState }) => {
  const [studentNumber, setStudentNumber] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const reg_name = /^[가-힣]{2,5}$/;
  const reg_stunum = /^[0-9]{8}$/;

  const sendEmail = () => {

    if (studentNumber === '' || name === '' || email === '') {
      alert('🙄❗❓ 입력칸을 전부 입력해주세요. ❓❗🙄');
      return;
    }

    if (!reg_name.test(name)) {
      alert('🙄❗❓ 이름을 다시 확인해주세요. ❓❗🙄');
      return;
    }

    if (!reg_stunum.test(studentNumber)) {
      alert('🙄❗❓ 아이디(학번)를 다시 확인해주세요. ❓❗🙄');
      return;
    }

    changeLoadingState(true);

    axios
      .post(
        API_BASE_URL + '/search/pw',
        { studentNumber: studentNumber, name: name, email:email },
        {
          headers: {
            'Content-type': 'application/json',
            Accept: 'application/json',
          },
          withCredentials: true,
        },
      )
      .then((res) => {

        changeLoadingState(false);
        setModalOn(false);
        alert('✔ 임시 비밀 번호 발급에 성공했습니다. 메일함을 확인해보세요. ✔');
      })
      .catch((res) => {
        console.log(res);
        alert('🙄❗❓ 일치하는 회원 정보가 없습니다. ❓❗🙄');
      });
  };

  return (
    <div className="roomAddingmodal">
      <div className="bg" />
      <div className="roomAddingmodalBox">
        <p className="modalTitle">비밀번호 찾기</p>

        <div className="oneRow">
          <p style={{ width: '130px', marginTop: '12px' }}>아이디(학번)</p>
          <input
            style={{ width: '230px' }}
            onChange={(e) => {
              setStudentNumber(e.target.value);
            }}
          ></input>
        </div>

        <div className="oneRow">
          <p style={{ width: '130px', marginTop: '12px' }}>이 름</p>
          <input
            style={{ width: '230px' }}
            onChange={(e) => {
              setName(e.target.value);
            }}
          ></input>
        </div>

        <div className="oneRow">
          <p style={{ width: '130px', marginTop: '12px' }}>세종대 이메일</p>
          <input
            style={{ width: '130px', marginRight:'0px' }}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></input>
          <p style={{ marginLeft:'5px' }}>@ sju.ac.kr</p>
        </div>
        <p id="textAreaTip" style={{ margin: '0px 0px 10px 0px' }}>
          ※ 가입하신 세종대 이메일로 임시 비밀번호를 발급해드립니다.<br/>로그인을 완료한 후 반드시 비밀번호를 변경해주세요.
        </p>

        <div className="cuttingLine"></div>
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
              sendEmail();
            }}
          >
            확 인
          </button>
        </div>
      </div>
    </div>
  );
};

export default PwSearchModal;
