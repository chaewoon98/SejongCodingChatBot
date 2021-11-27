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
import { changeLoadingState } from '../redux/view/viewActions';
import IdSearchModal from './modal/IdSearchModal';
import PwSearchModal from './modal/PwSearchModal';

const Login = ({ loginState, login,changeType,changeLoadingState,history }) => {

  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");
  const [modalOn, setModalOn] = useState(false);
  const [idSearchingModalOn,setIdSearchnigModalOn] = useState(false);
  const [pwdSearchingModalOn,setPwdSearchingModalOn] = useState(false);
  
  //console.log(loginState);

  useEffect(() => {
    if (loginState === LOGIN_FAIL) {
      changeLoadingState(false);
      setModalOn(true);
    } else if (loginState === LOGIN_SUCCESS) {
      changeLoadingState(false);
      goToMain();
    } else if (loginState === LOGIN_PENDING) {
      changeLoadingState(true);
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
        {modalOn ? <LoginModal setModalOn={setModalOn}
         changeType={(type)=>{changeType(type);}} /> : ''}
      </>

      <>
        {idSearchingModalOn ? <IdSearchModal setModalOn={setIdSearchnigModalOn} /> : ''}
      </>

      <>
        {pwdSearchingModalOn ? <PwSearchModal setModalOn={setPwdSearchingModalOn} changeLoadingState={changeLoadingState} /> : ''}
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
          <h4 className="contentsText1" onClick={()=>{history.push("/signup")}}>회원 가입</h4>
          <h4 className="contentsText1" onClick={()=>{setIdSearchnigModalOn(true)}}>아아디 찾기</h4>
          <h4 className="contentsText1" onClick={()=>{setPwdSearchingModalOn(true)}}>비밀번호 찾기</h4>
          
        </div>

        <button onClick={() => { { logining(); } }}>로그인</button>
      </div>
    </div>
  );
};

const mapStateToProps = ({ login,views }) => {
  return {
    loginState: login.type,
    isLoading : views.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (id, pwd) => dispatch(login(id, pwd)),
    changeType: (type) => dispatch(changeType(type)),
    changeLoadingState : (props) => dispatch(changeLoadingState(props))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
