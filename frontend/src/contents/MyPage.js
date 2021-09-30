import React,{useState,useEffect} from 'react';
import VerticalHeader from './VerticalHeader';
import HorizontalHeader from './HorizontalHeader';
import axios from 'axios';
import { connect, useDispatch } from 'react-redux';
import { changeType } from '../redux/login/loginActions';
import Root from './Root';
import { LOGIN_BEFORE, LOGIN_SUCCESS } from '../redux/login/loginTypes';

const MyPage = ({ history, loginState,changeType }) => {

  const logout = () => {

    axios
      .post(
        'http://localhost:8080/userlogout',
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
    <div>
      <VerticalHeader />
      {/* <HorizontalHeader /> */}
      myPage입니다 ㅅㄱmyPage입니다 ㅅㄱmyPage입니다 ㅅㄱ
      <button style={{ zIndex: '999' }} onClick={() => logout()}>
        로그 아웃
      </button>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyPage);
