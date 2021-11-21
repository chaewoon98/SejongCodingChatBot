import React, { useRef, useState } from 'react';
import ReactModal from 'react-modal';
import reactDom from 'react-dom';
import '../../css/modal/EmailModal.css';
import { LOGIN_BEFORE } from '../../redux/login/loginTypes';
import axios from 'axios';
import { API_BASE_URL } from '../utils/Constant';
import { useHistory } from 'react-router';
import { connect, useDispatch } from 'react-redux';
import { changeSignupAuth } from '../../redux/login/loginActions';

const EmailAuthModal = ({ setAuthModalOn, changeSignupAuth,email }) => {
  const input2Ref = useRef(null);
  const input3Ref = useRef(null);
  const input4Ref = useRef(null);
  const input5Ref = useRef(null);
  const input6Ref = useRef(null);
  const history = useHistory();

  const [inputNums, setInputNum] = useState({
    one: '',
    two: '',
    thr: '',
    four: '',
    fiv: '',
    six: '',
  });

  const { one, two, thr, four, fiv, six } = inputNums;

  const onInputChange = (e) => {
    const { value, name } = e.target;
    setInputNum({
      ...inputNums,
      [name]: value,
    });
  };

  const onClickConfirmBnt = () => {
    if (
      inputNums.one === '' ||
      inputNums.two === '' ||
      inputNums.thr === '' ||
      inputNums.four === '' ||
      inputNums.fiv === '' ||
      inputNums.six === ''
    ) {
      return;
    }

    let userCode =
      inputNums.one +
      inputNums.two +
      inputNums.thr +
      inputNums.four +
      inputNums.fiv +
      inputNums.six;

    axios
      .post(
        API_BASE_URL + '/checkEmailAuthCode',
        { authCode: userCode },
        {
          headers: {
            'Content-type': 'application/json',
            Accept: 'application/json',
          },
          withCredentials: true,
        },
      )
      .then((res) => {
        console.log(res.data);
        if (res.data === 'accepted') {
          changeSignupAuth(true);
          history.push({
            pathname: '/signupDetails', state: {
              email: email
            }
          });

        } else {
          alert("인증 코드가 일치하지 않습니다.");
        }

      })
      .catch((res) => {
        console.log(res);
      });
  };

  return (
    <div className="modal">
      <div className="bg" />
      <div className="emailModalBox" style={{ paddingBottom: '0px' }}>
        <p>세종대 학교 이메일 인증</p>
        <p style={{ marginTop: '30px' }}>
          이메일로 전송된 숫자 인종 코드 6자리를 입력해주세요.
        </p>
        
        <p>인증 메일이 오지 않을 경우, 정크 메일함을 확인해보세요!</p>
        <p>인증코드는 10분간만 유효합니다.</p>
        <div style={{ margin: '40px 0 40px 0' }}>
          <input
            type="text"
            maxLength="1"
            className="emailNumberInput"
            onChange={onInputChange}
            name="one"
            value={one}
            onKeyPress={(e) => {
              if (!/[0-9]/.test(e.key)) {
                e.preventDefault();
              }
            }}
            onKeyUp={(e) => {
              if (e.key >= 0 && e.key <= 9) {
                input2Ref.current.focus();
              }
            }}
          />
          <input
            className="emailNumberInput"
            ref={input2Ref}
            type="text"
            maxLength="1"
            className="emailNumberInput"
            onChange={onInputChange}
            name="two"
            value={two}
            onKeyPress={(e) => {
              if (!/[0-9]/.test(e.key)) {
                e.preventDefault();
              }
            }}
            onKeyUp={(e) => {
              if (e.key >= 0 && e.key <= 9) {
                input3Ref.current.focus();
              }
            }}
          />
          <input
            className="emailNumberInput"
            ref={input3Ref}
            type="text"
            maxLength="1"
            className="emailNumberInput"
            onChange={onInputChange}
            name="thr"
            value={thr}
            onKeyPress={(e) => {
              if (!/[0-9]/.test(e.key)) {
                e.preventDefault();
              }
            }}
            onKeyUp={(e) => {
              if (e.key >= 0 && e.key <= 9) {
                input4Ref.current.focus();
              }
            }}
          />
          <input
            className="emailNumberInput"
            ref={input4Ref}
            type="text"
            maxLength="1"
            className="emailNumberInput"
            onChange={onInputChange}
            name="four"
            value={four}
            onKeyPress={(e) => {
              if (!/[0-9]/.test(e.key)) {
                e.preventDefault();
              }
            }}
            onKeyUp={(e) => {
              if (e.key >= 0 && e.key <= 9) {
                input5Ref.current.focus();
              }
            }}
          />
          <input
            className="emailNumberInput"
            ref={input5Ref}
            type="text"
            maxLength="1"
            className="emailNumberInput"
            onChange={onInputChange}
            name="fiv"
            value={fiv}
            onKeyPress={(e) => {
              if (!/[0-9]/.test(e.key)) {
                e.preventDefault();
              }
            }}
            onKeyUp={(e) => {
              if (e.key >= 0 && e.key <= 9) {
                input6Ref.current.focus();
              }
            }}
          />
          <input
            className="emailNumberInput"
            ref={input6Ref}
            type="text"
            maxLength="1"
            className="emailNumberInput"
            onChange={onInputChange}
            name="six"
            value={six}
            onKeyPress={(e) => {
              if (!/[0-9]/.test(e.key)) {
                e.preventDefault();
              }
            }}
          />
        </div>
        <div id="emailModalBntLine"></div>
        <div id="emailModalBntBox">
          <button onClick={() => { setAuthModalOn(false); }}>취 소</button>
          <div />
          <button
            onClick={() => {
              onClickConfirmBnt();
            }}
          >
            확 인
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ login }) => {
  return {
    signupAuth: login.signupAuth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeSignupAuth: (props) => dispatch(changeSignupAuth(props)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmailAuthModal);
