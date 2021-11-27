import React, { useState, useEffect } from 'react';
import VerticalHeader from './VerticalHeader';
import HorizontalHeader from './HorizontalHeader';
import axios from 'axios';
import { connect, useDispatch } from 'react-redux';
import { changeType, onLoginSuccess } from '../redux/login/loginActions';
import Root from './Root';
import { LOGIN_BEFORE, LOGIN_SUCCESS } from '../redux/login/loginTypes';
import { API_BASE_URL } from './utils/Constant';
import { changeLoadingState } from '../redux/view/viewActions';
import { root2 } from './Root2';
import PwModifyingModal from './modal/PwModifyingModal';
import WithdrawalModal from './modal/WithdrawalModal';
import '../css/MyPage.css';
const MyPage = ({
  history,
  loginState,
  onLoginSuccess,
  changeType,
  changeLoadingState,
}) => {

  const [userName, setUserName] = useState('');
  const [isTa, setTa] = useState('학생');
  const [userId, setId] = useState('');
  const [userEmail, setEmail] = useState('');
  const [pwModalOn, setPwModalOn] = useState(false);
  const [withdrawalModalOn, setWithdrawalModalOn] = useState(false);

  useEffect(() => {

    // 동기로 리프래쉬토큰 검증.
    const auth = async () => {
      const result = await root2(onLoginSuccess, changeType, changeLoadingState);
      //console.log(result + ' three');
      if (result === 'success') {
        changeLoadingState(true);
        getUserInfo();
      }
    };

    auth();

  }, []);

  const getUserInfo = () => {
    axios
      .post(
        API_BASE_URL + '/user/assistant',
        {},
        {
          headers: {
            'Content-type': 'application/json',
            Accept: 'application/json',
          },
          withCredentials: true,
        },
      )
      .then((res) => {
        setId(res.data.studentNumber);
        setUserName(res.data.name);
        setEmail(res.data.email);

        if (res.data.isAssistant === '1') {
          setTa('TA 조교');
        }
        changeLoadingState(false);

      })
      .catch((res) => {
        console.log(res);
        changeLoadingState(false);
        alert('일시적 오류가 발생했습니다. 다시 시도해주세요.');
      });
  };


  const logout = () => {
    axios
      .post(
        API_BASE_URL + '/userlogout',
        {},
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
        changeType(LOGIN_BEFORE);
        history.push('/');
      })
      .catch((res) => {
        // id or pwd 오류
        console.log(res);
      });
  };

  return (
    <div style={{ height: '100%' }}>
      <VerticalHeader />
      <HorizontalHeader />
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <>{pwModalOn ? <PwModifyingModal setModalOn={setPwModalOn} /> : ''}</>
        <>{withdrawalModalOn ? <WithdrawalModal setModalOn={setWithdrawalModalOn} /> : ''}</>

        <div id="myPageBox">
          <h3>My Page</h3>
          <div style={{ width: '100%', height: '50px' }} />
          <div id="myInfoSector">

            <img src="img/sjulogo.png" />

            <div id="myInfoColumn">
              <p>이 름</p>
              <p>구 분</p>
              <p>학 번</p>
              <p>이메일</p>
            </div>

            <div id="myInfoValue">
              <p>{userName}</p>
              <p>{isTa}</p>
              <p>{userId}</p>
              <p>{userEmail}</p>
            </div>

          </div>

          <div style={{ height: '80px' }}>

          </div>

          <div id="myInfoBntSector">
            <button onClick={() => logout()}>
              로그 아웃
            </button>

            <button onClick={() => { setPwModalOn(true) }}>
              비밀번호 변경
            </button>

            <button onClick={() => { setWithdrawalModalOn(true) }}>
              회원 탈퇴
            </button>
          </div>
        </div>
      </div>
      {/* <div style={{ width: '100%', height: '50px' }} /> */}
    </div>
  );
};

const mapStateToProps = ({ login }) => {
  return {
    loginState: login.state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeType: (type) => dispatch(changeType(type)),
    changeLoadingState: (props) => dispatch(changeLoadingState(props)),
    onLoginSuccess: (props) => dispatch(onLoginSuccess(props)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyPage);
