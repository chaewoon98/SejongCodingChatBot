import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import '../css/Login.css';
import VerticalHeader from './VerticalHeader';
import HorizontalHeader from './HorizontalHeader';
import LoginModal from './modal/LoginModal';
import LoadingModal from './modal/LoadingModal';
import { login,changeType } from '../redux/login/loginActions';
import {LOGIN_PENDING, LOGIN_FAIL, LOGIN_SUCCESS,LOGIN_BEFORE } from '../redux/login/loginTypes';

const Login = ({ loginState, login,changeType,history }) => {

  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");
  const [modalOn, setModalOn] = useState(false);
  const [loadingModalOn, setLoadingModalOn] = useState(false);

  console.log(loginState);

  useEffect(() => {
    if (loginState === LOGIN_FAIL) {
      setLoadingModalOn(false);
      setModalOn(true);
    } else if (loginState === LOGIN_SUCCESS) {
      setLoadingModalOn(false);
      goToMain();
    } else if (loginState === LOGIN_PENDING) {
      setLoadingModalOn(true);
      setModalOn(false);
    }
  });


  const goToMain = () => {
    history.push('/');
  }

  // 로그인 시도 함수
  const logining = () => {
    if (id === "" || pwd === "") {
      return;
    }

    login(id, pwd);
  }
  

  return (
    <div id="loginMainContainer">
      <VerticalHeader />
      <HorizontalHeader />

      <>
        {loadingModalOn ? <LoadingModal/> : ''}
      </>

      <>
        {modalOn ? <LoginModal setModalOn={setModalOn}
         changeType={(type)=>{changeType(type);}} /> : ''}
      </>


      <div id="loginBox">
        <img src="img/logo.png" />
        <h3>Sejong Coding Helper 로그인</h3>

        <h5>아이디</h5>
        <input id="idInput" placeholder="아이디" onChange={(e) => { setId(e.target.value); }}></input>

        <h5>비밀 번호</h5>
        <input id="pwdInput" placeholder="비밀번호" type="password"
          onChange={(e) => { setPwd(e.target.value); }}></input>

        <div id="textBox">
          <h4 className="contentsText1">회원 가입</h4>
          <h4 className="contentsText1">아아디 찾기</h4>
          <h4 className="contentsText1">비밀번호 찾기</h4>

        </div>

        <button onClick={() => { { logining(); } }}>로그인</button>
      </div>
    </div>
  );
};

const mapStateToProps = ({ login }) => {
  return {
    loginState: login.type,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (id, pwd) => dispatch(login(id, pwd)),
    changeType: (type) => dispatch(changeType(type)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
