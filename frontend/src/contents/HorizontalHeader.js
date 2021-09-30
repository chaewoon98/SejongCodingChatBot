import React, { useEffect, useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import { headerViewer } from '../redux/view/viewActions';

function RenderingImg({ isMain }) {
  if (isMain) {
    return (
      <>
        <Link to="/mypage">
          <img className="horizonLogoImg2" src="img/user.png" />
        </Link>
        <Link to="/">
          <img className="horizonLogoImg2" src="img/home.png" />
        </Link>
      </>
    );
  }
  return (
    <>
      <Link to="/myPage">
        <img className="horizonLogoImg" src="img/userBlack.png" />
      </Link>
      <Link to="/">
        <img className="horizonLogoImg" src="img/homeBlack.png" />
      </Link>
    </>
  );
}

const HorizontalHeader = (props) => {
  useEffect(() => {
    props.changeHeaderView();
  });

  return (
    <div id="horizontalHeaderBg">
      <RenderingImg isMain={props.isMain} />
    </div>
  );
};

const mapStateTpProps = ({ views }) => {
  return {
    isMain: views.isMain,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeHeaderView: () => dispatch(headerViewer()),
  };
};

export default connect(mapStateTpProps, mapDispatchToProps)(HorizontalHeader);