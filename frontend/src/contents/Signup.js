import React, { useState } from 'react';
import HorizontalHeader from './HorizontalHeader';
import VerticalHeader from './VerticalHeader';
import { connect } from 'react-redux';
import '../css/Signup.css';
import axios from 'axios';
import { API_BASE_URL } from './utils/Constant';
import LoadingModal from './modal/LoadingModal';
import EmailAuthModal from './modal/EmailAuthModal';
import { changeLoadingState } from '../redux/view/viewActions';

const Signup = ({ changeLoadingState }) => {
  const [email, setEmail] = useState('');
  const [isChecked, setChecked] = useState(false);
  const [isAuthModalOn, setAuthModalOn] = useState(false);

  const checkEmailOverlap = () => {
    if (email === '') {
      return;
    }

    if (!isChecked) {
      return;
    }

    changeLoadingState(true);

    axios
      .post(
        API_BASE_URL + '/checkEmailOverlap',
        { email: email },
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
          sendEmail();
        }
        else{
          alert('이미 가입된 이메일입니다.');
          changeLoadingState(false);
        }
      })
      .catch((res) => {
        alert('일시적인 오류가 발생했습니다. 다시 시도해주세요.');
        console.log(res);
        changeLoadingState(false);
      });
  };

  const sendEmail = () => {
    axios
      .post(
        API_BASE_URL + '/sendSejongEmail',
        { email: email },
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
        setAuthModalOn(true);
      })
      .catch((res) => {
        alert('일시적인 오류가 발생했습니다. 다시 시도해주세요.');
        console.log(res);
        changeLoadingState(false);
      });
  };

  return (
    <div id="signupMainContainer">
      <VerticalHeader />
      <HorizontalHeader />

      <>
        {isAuthModalOn ? (
          <EmailAuthModal setAuthModalOn={setAuthModalOn} email={email} />
        ) : (
          ''
        )}
      </>

      {/* <EmailAuthModal/> */}

      <div id="signupBox">
        <img src="img/logo.png" />
        <h3>Sejong Coding Helper 회원가입</h3>
        <h3>세종대학교 학생 인증하기</h3>

        <div id="signupNoticeBox">
          <div>안내 사항</div>
          <ul>
            <li>
              1. 세종대학교 학생만 회원가입 가능하며, 학교 이메일(sju.ac.kr)
              인증을 통해서 학생 인증이 이루어집니다. 학교 인증은 회원가입 시 단
              1회만 필요합니다.
            </li>
            <li>
              2. 데이터 베이스에 저장되는 모든 회원 정보는 채팅 매칭 이 외의
              용도로 사용되지 않습니다.
            </li>
            <li>
              3. 채팅 내역은 챗봇 성능 발전과 실시간 Q{'&'}A 키워드 수집을 위해
              활용될 수 있습니다.
            </li>
            <li>
              4. 해당 사이트에서 사용하는 데이터 중에는 세종대학교 저작권에
              보호를 받는 자료들이 있습니다. 때문에 외부로 무분별한 반출을
              금지합니다.
            </li>
            <li>
              5. 해당 웹 사이트는 PC 웹 크롬 브라우저에서 사용하시는 것을
              권장합니다.
            </li>
            <li>
              6. 조교 계정으로 회원가입하기 위해서, 우선 회원 가입을 완료하신 후, <a href="https://forms.gle/UYzZCyCeCf3SP3xo6" target='_blank' style={{color:'blue'}}><u>이 링크</u></a>를 통해 조교 자격 신청을 해주시길 바랍니다.
            </li>
            <li>
              7. 세종대학교 재학생들이 개발한 웹 사이트로 다양한 버그가 있을 수
              있습니다. 문제가 있을 시, 문의 사항을 통해 피드백 부탁드립니다.
            </li>
          </ul>
          <div>
            <p>위 안내사항을 확인하였으며, 개인정보수집에 동의합니다.</p>

            <input
              type="checkbox"
              onChange={(e) => {
                setChecked(e.currentTarget.checked);
              }}
            />
          </div>
        </div>
        <h4>
          세종대학교 학교 이메일(sju.ac.kr)을 이용하여 학생 인증을 해주세요!
        </h4>
        <div id="signupEmailForm">
          <input
            id="emailInput"
            placeholder="세종대학교 이메일"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></input>
          <p>@sju.ac.kr</p>
        </div>
        <>
          {isChecked ? '' : <p id="noticeConfirm">!! 약관에 동의해주세요 !!</p>}
        </>
        <button
          onClick={() => {
            checkEmailOverlap();
          }}
        >
          이메일 전송하기
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = ({ views }) => {
  return {
    isLoading: views.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLoadingState: (props) => dispatch(changeLoadingState(props)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
