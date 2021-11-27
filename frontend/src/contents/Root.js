import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import axios from 'axios';
import { changeType, onLoginSuccess } from '../redux/login/loginActions';
import {
  LOGIN_BEFORE,
  LOGIN_SUCCESS,
  LOGIN_ORIGIN,
} from '../redux/login/loginTypes';
import { refreshLoginToken } from './utils/LoginUtils';
import {
  changeLoadingState,
  changeFirstRendering,
} from '../redux/view/viewActions';

export const root = ({
  onLoginSuccess,
  changeType,
  changeLoadingState,
}) => {
  function loginCallback(type, id) {
    if (type === LOGIN_SUCCESS) {
      onLoginSuccess(LOGIN_SUCCESS, id);
      changeLoadingState(false);
    } else if (type === LOGIN_BEFORE) {
      changeType(LOGIN_BEFORE);
      changeLoadingState(false);
    }
  }

  // 새로고침 이후에서만 slient 로그인
  // if (loginState==LOGIN_ORIGIN) {
  try {
    changeLoadingState(true);
    refreshLoginToken(loginCallback);
    // changeFirstRendering(false);
  } catch (e) {
    console.log(e);
  }
  // }

  return null;
};

const mapStateToProps = ({}) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeType: (type) => dispatch(changeType(type)),
    changeLoadingState: (props) => dispatch(changeLoadingState(props)),
    onLoginSuccess: (props) => dispatch(onLoginSuccess(props)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(root);
