import axios from 'axios';
import {
  LOGIN_PENDING,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGIN_BEFORE,
  LOGIN_ORIGIN,
  CHANGE_SIGNUP_AUTH,
  CHANGE_SIGNUP_AUTH2,
  CHANGE_USER_NAME,
  CHANGE_USER_ID
} from './loginTypes';
import Cookies from 'js-cookie';
import { refreshLoginToken } from '../../contents/utils/LoginUtils';
import { API_BASE_URL } from '../../contents/utils/Constant';

export const changeUserId = (userId) => {
  return {
    type: CHANGE_USER_ID,
    data: { userId: userId },
  };
};

export const changeUserName = (userName) => {
  return {
    type: CHANGE_USER_NAME,
    data: { userName: userName },
  };
};


export const changeType = (type) => {
  return {
    type: type,
  };
};

export const changeSignupAuth = (props) => {
  return {
    type: CHANGE_SIGNUP_AUTH,
    data: { signupAuth: props },
  };
};

export const changeSignupAuth2 = (props) => {
  return {
    type: CHANGE_SIGNUP_AUTH2,
    data: { signupAuth: props },
  };
};

export const onLoginSuccess = () => {
  return {
    type: LOGIN_SUCCESS,
  };
};

export const login = (id, pwd) => (dispatch) => {
  dispatch({ type: LOGIN_PENDING });

  axios
    .post(
      API_BASE_URL + '/logincheck',
      { id: id, pwd: pwd },
      {
        headers: {
          'Content-type': 'application/json',
          Accept: 'application/json',
        },
        withCredentials: true,
      },
    )
    .then((res) => {

      // API 요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data}`;

      // 로그인 연장 처리 X
      // setTimeout(function () {
      //   console.log('reload');
      //   refreshLoginToken(null);
      // }, 3 * 1000);

      dispatch({
        type: LOGIN_SUCCESS,
        data: { id: id },
      });
    })
    .catch((res) => {
      // id or pwd 오류
      console.log(res);
      dispatch({
        type: LOGIN_FAIL,
        id: id,
      });
    });
};
