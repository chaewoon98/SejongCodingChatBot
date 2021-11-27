import React, { useRef, useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import '../css/App.css';
import { Link } from 'react-router-dom';
import { clickedNavItem } from '../redux/view/viewActions';
import { useMediaQuery } from 'react-responsive';

const VerticalHeader = ({ clickedNavNum, clickedNavItem,history }) => {
  const isShort = useMediaQuery({
    query: '(min-height:0px) and (max-height:599px)',
  });

  const isLong = useMediaQuery({
    query: '(min-height:600px)',
  });

  const paddingBottomInShort = '15px';
  const paddingTopInShort = '22px';

  let clicked1 = 'verNavItem';
  let clicked2 = 'verNavItem';
  let clicked3 = 'verNavItem';
  let clicked4 = 'verNavItem';

  useEffect(() => {
    clickedNavItem();
  });

  switch (clickedNavNum) {
    case 1:
      clicked1 = 'verNavItemClicked';
      break;
    case 2:
      clicked2 = 'verNavItemClicked';
      break;
    case 3:
      clicked3 = 'verNavItemClicked';
      break;
    case 4:
      clicked4 = 'verNavItemClicked';
      break;
    default:
      break;
  }

  return (
    <div id="headerBg">
      <Link to="/botchatroom">
        <div className={clicked1}>
          {isLong && <img className="logoImg" src="img/logo.png" />}

          {isLong && (
            <p className="header_title">
              챗봇과
              <br />
              채팅하기
            </p>
          )}

          {isShort && (
            <p className="header_title" style={{ paddingBottom: paddingBottomInShort ,
             paddingTop:paddingTopInShort}}>
              챗봇과
              <br />
              채팅하기
            </p>
          )}

          <hr className="header_line" />
        </div>
      </Link>

       {/* 리로드가 필요해서 a 태그씀. */}
      <Link to="/tachatroom">
      {/* <a onClick={() => window.location.replace("tachatroom")}> */}
        <div className={clicked2}>
          {isLong && <img className="logoImg" src="img/question1.png" />}

          {isLong && (
            <p className="header_title">
              TA조교와
              <br />
              채팅하기
            </p>
          )}

          {isShort && (
            <p className="header_title" style={{ paddingBottom: paddingBottomInShort , 
            paddingTop:paddingTopInShort}}>
              TA조교와
              <br />
              채팅하기
            </p>
          )}

          <hr className="header_line" />
        </div>
      {/* </a> */}
      </Link>

      <Link to="/codingEditor">
        <div className={clicked3}>
          {isLong && <img className="logoImg" src="img/coding.png" />}

          {isLong && <p className="header_title">코딩 하기</p>}

          {isShort && <p className="header_title"  style={{ paddingBottom: paddingBottomInShort, 
            paddingTop:paddingTopInShort }}>코딩 하기</p>}

          <hr className="header_line" />
        </div>
      </Link>

      <Link to="/qa">
        <div className={clicked4}>
          {isLong && <img className="logoImg" src="img/qa.png" />}

          {isLong && <p className="header_title">문의 사항</p>}

          {isShort && <p className="header_title"  style={{ paddingBottom: paddingBottomInShort ,
             paddingTop:paddingTopInShort}}>문의 사항</p>}

          <hr className="header_line" />
        </div>
      </Link>
    </div>
  );
};

const mapStateTpProps = ({ views }) => {
  return {
    clickedNavNum: views.clickedNavNum,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clickedNavItem: () => dispatch(clickedNavItem()),
  };
};

export default connect(mapStateTpProps, mapDispatchToProps)(VerticalHeader);
