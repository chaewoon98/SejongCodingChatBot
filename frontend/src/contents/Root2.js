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

export const root2 = (onLoginSuccess, changeType, changeLoadingState) => {
  function loginCallback(type) {
    if (type === LOGIN_SUCCESS) {
      onLoginSuccess(LOGIN_SUCCESS);
      changeLoadingState(false);
    } else if (type === LOGIN_BEFORE) {
      changeType(LOGIN_BEFORE);
      changeLoadingState(false);
    }
  }

  // function yayOrNay() {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(()=>{      resolve("Qwe");},2000);
  //   });
  // }

  // 새로고침 이후에서만 slient 로그인
  async function fetchData() {
    try {
      changeLoadingState(true);
      const result = await refreshLoginToken(loginCallback);
      //console.log(result + ' two');
      return result;
    } catch (e) {
      console.log(e);
    }
  }
  return fetchData();
};
