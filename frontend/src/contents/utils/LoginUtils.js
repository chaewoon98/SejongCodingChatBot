import axios from 'axios';
import { LOGIN_SUCCESS, LOGIN_BEFORE } from '../../redux/login/loginTypes';
import { API_BASE_URL } from './Constant';

export const refreshLoginToken = async function (callback) {
  let result = await axios
    .post(
      API_BASE_URL + '/refreshLoginToken',
      {},
      {
        headers: {
          'Content-Type': `application/json`,
        },
        withCredentials: true,
      },
    )
    .then((res) => {
      console.log('login success');
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data;

      if (callback) {
        callback(LOGIN_SUCCESS);
      }
      return 'success';
      //changeType(LOGIN_SUCCESS);

      // 자동 로그인 연장 처리 X
      // console.log("here");
      // setTimeout(function () {
      //     console.log("reload");
      //   refreshLoginToken(null);
      // }, 3 * 1000);
    })
    .catch((ex) => {
      console.log('app silent requset fail : ' + ex);

      if (callback) {
        callback(LOGIN_BEFORE);
      }
      return 'fail';
    });
  return result;
};
