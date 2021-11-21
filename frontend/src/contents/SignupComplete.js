import React, { useState, useEffect } from 'react';
import HorizontalHeader from './HorizontalHeader';
import VerticalHeader from './VerticalHeader';
import '../css/Signup.css';
import { useLocation, useHistory } from 'react-router';
import { connect, useDispatch } from 'react-redux';
import { changeSignupAuth, changeSignupAuth2 } from '../redux/login/loginActions';
const SignupComplete = ({ changeSignupAuth, changeSignupAuth2,}) => {

    const location = useLocation();
    const name = location.state.name;
    const history = useHistory();

    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
      return () => {
        changeSignupAuth(false);
        changeSignupAuth2(false);
      };
    }, [pathname]);

    return (
        <div id="signupMainContainer">
            <VerticalHeader />
            <HorizontalHeader />
            <div id="signupBox">
                <img src="img/logo.png" />
                <h3>Sejong Coding Helper 회원가입 완료</h3>
                <h3 style={{ fontSize: '20px', marginTop: '20px' }}>{name}님 반갑습니다.</h3>
                <h3 style={{ fontSize: '20px' }}>이제 모든 서비스를 이용하실 수 있습니다!!</h3>
                <button style={{ width: '300px', marginTop: '80px', marginBottom: '30px' }}
                    onClick={() => { history.push('/') }}>메인으로</button>

            </div>
        </div>
    )
}

const mapStateToProps = ({ login }) => {
    return {
        signupAuth: login.signupAuth,
        signupAuth2: login.signupAuth2,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeSignupAuth: (props) => dispatch(changeSignupAuth(props)),
        changeSignupAuth2: (props) => dispatch(changeSignupAuth2(props)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupComplete);
