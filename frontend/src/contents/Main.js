import React from 'react';
import { Link } from 'react-router-dom';
import '../css/App.css';
import VerticalHeader from './VerticalHeader';
import HorizontalHeader from './HorizontalHeader';
import Root from './Root';

const Main = () => {
  return (
    <div id="mainBg">
      <VerticalHeader />
      <HorizontalHeader />

      <div id="mainBody">
        <h1 id="mainBanner2">SJ CODING HELPER</h1>
        <h1 id="mainBanner">세종 대학생을 위한 코딩 Q{"&"}A 챗봇 플랫폼</h1>
        <Link to ="/botchatroom"><button id="playBnt">시작하기</button></Link>
      </div>
    </div>
  );
};

export default Main;
