import React from 'react'
import { connect, useDispatch } from 'react-redux';
import { Route, Router } from 'react-router'
import { Redirect } from 'react-router'

const SignupRoute = ({signupAuth,signupAuth2, component: Component, ...rest }) => {
    return (
        <Route {...rest} render={props => {

            if (signupAuth || signupAuth2) {
                return <Component {...props} />
            }
            else {
                return <Redirect to="/" />
            }
        }} />
    );
}

const mapStateToProps = ({ login }) => {
    return {
        signupAuth: login.signupAuth,
        signupAuth2: login.signupAuth2,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupRoute);