import React, { useEffect, useRef, useSelector, useState } from 'react';
import VerticalHeader from './VerticalHeader';
import HorizontalHeader from './HorizontalHeader';
import { Link } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import {
  addMsgData,
  getBotResponse,
  fetchChatData,
  changeCRoomId,
  changePRoomId,
  clearChatList,
} from '../redux/chat/bot_chat/botChatActions';
import Root from './Root';
import '../css/Chatroom.css';
import axios from 'axios';
import { API_BASE_URL } from './utils/Constant';
import { CHATBOT_ID } from './utils/Constant';
import { changeUserId, changeUserName } from '../redux/login/loginActions';

const chatData = ({ chatsData }) => {
  // useEffect(()=>{
  //   fetChatData()
  // }, [])

  const chatItems = chatsData.map((chat) => {
    if (chat.sender === 'bot') {
      return <BotChatMsgItem msg={chat.msg} key={chat.id} />;
    } else if (chat.sender === 'user') {
      return <UserChatMsgItem msg={chat.msg} key={chat.id} />;
    }
  });

  return <>{chatItems}</>;
};

const listData = ({ list }) => {
  const listItems = list.map((item) => {
    return (
      <li className="nonSelectedRoomLi" key={item.id}>
        <p>{item.title}</p>
        <p>{item.des}</p>
      </li>
    );
  });

  return <>{listItems}</>;
};

function BotChatMsgItem({ msg }) {
  return (
    <li className="botMsg">
      <img src="img/logo.png" />
      <div>
        <p>세종 코딩 헬퍼</p>
        <p>{msg}</p>
      </div>
    </li>
  );
}

function UserChatMsgItem({ msg }) {
  return (
    <li className="userMsg">
      <div>
        <p>나</p>
        <p>{msg}</p>
      </div>
    </li>
  );
}

var getCookie = function (name) {
  var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
  return value ? value[2] : null;
};

const BotChatRoom = ({
  num,
  chatsData,
  list,
  addMsgData,
  getBotResponse,
  userId,
  userName,
  pRoomId,
  cRoomId,
  changeUserName,
  changeUserId,
  changeCRoomId,
  changePRoomId,
  clearChatList,
}) => {
  const msgInput = useRef();
  const scrollRef = useRef();
  const [pBntStyleClass, setPBntStyleClass] = useState('navQuestionBnt');
  const [cBntStyleClass, setCBntStyleClass] = useState('navQuestionBnt');

  let studentNumber = getCookie('id');

  useEffect(() => {
    clearChatList();
    getUserInfo();
    getBotChatRoomList(); console.log("qwe");
  }, []);

  const getUserInfo = () => {
    axios
      .post(
        API_BASE_URL + '/user/assistant/' + studentNumber,
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
        changeUserId(res.data.id);
        changeUserName(res.data.name);
      })
      .catch((res) => {
        console.log(res);
        alert('일시적 오류가 발생했습니다. 다시 시도해주세요.');
      });
  };

  const getBotChatRoomList = () => {
    axios
      .post(
        API_BASE_URL + '/chatbotRoom/studentId/' + studentNumber,
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

        let cRoomId;

        // C와 P 각각에 맞게 룸아이디 대입.
        if (res.data[0].title === 'C') {
          cRoomId = res.data[0].id;
          changeCRoomId(res.data[0].id);
          changePRoomId(res.data[1].id);
        } else {
          cRoomId = res.data[1].id;
          changeCRoomId(res.data[1].id);
          changePRoomId(res.data[0].id);
        }

        // 맨처음 접속일 경우 c언어가 디폴트
        if (window.sessionStorage.getItem('bRoomId') === null) {
          window.sessionStorage.setItem('bRoomId', cRoomId);
        }

        let roomId = window.sessionStorage.getItem('bRoomId');
        let isCRoom = false;

        // C언어 채팅룸이라면,
        if(String(cRoomId) === roomId){
          isCRoom = true;
        }

        // UI 바꾸기 처리.
        if(isCRoom){
          setCBntStyleClass('navQuestionSelectedBnt');
        } else{
          setPBntStyleClass('navQuestionSelectedBnt');
        }

        getBotChatList(roomId);

      })
      .catch((res) => {
        console.log(res);
        alert('일시적 오류가 발생했습니다. 다시 시도해주세요.');
      });
  };

  const getBotChatList = (roomId) => {
    axios
      .post(
        API_BASE_URL + '/chatbotMessage/roomId/' + roomId,
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

        for (let i = 0; i < res.data.length; i++) {
          let name = 'user';

          if (res.data[i].user.id === CHATBOT_ID) {
            name = 'bot';
          }

          addMsgData(num, name, res.data[i].message);
        }

        scrollToBottom();
      })
      .catch((res) => {
        console.log(res);
        alert('일시적 오류가 발생했습니다. 다시 시도해주세요.');
      });
  };

  const scrollToBottom = () => {
    scrollRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMsg();
    }
  };

  function sendMsg() {
    const text = msgInput.current.value;

    if (text === '') {
      return;
    }

    let bRoomId = window.sessionStorage.getItem('bRoomId');

    addMsgData(num, 'user', text);
    msgInput.current.value = '';

    axios
      .post(
        API_BASE_URL + '/chatbotMessage/send/' + bRoomId + '/' + userId,
        { message: text },
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
        getBotResponse(res.data);
        scrollToBottom();
      })
      .catch((res) => {
        console.log(res);
        alert('일시적 오류가 발생했습니다. 다시 시도해주세요.');
      });
  }

  return (
    <div style={{ width: '100%' }}>
      <VerticalHeader />
      <HorizontalHeader />

      <div id="chatRoomBody">
        <div id="emptySpace1" />
        <div className="secondHorizontalNav">
          <h3>질문 설정</h3>

          <button className={cBntStyleClass}
            onClick={() => {
              window.sessionStorage.setItem('bRoomId', cRoomId);
              clearChatList();
              getBotChatList(cRoomId);
              setCBntStyleClass('navQuestionSelectedBnt');
              setPBntStyleClass('navQuestionBnt');
            }}>
            <img src="img/c.png" />
            C언어 질문하기
          </button>

          <button className={pBntStyleClass}
            onClick={() => {
              window.sessionStorage.setItem('bRoomId', pRoomId);
              clearChatList();
              getBotChatList(pRoomId);
              setPBntStyleClass('navQuestionSelectedBnt');
              setCBntStyleClass('navQuestionBnt');
            }}>
            <img src="img/python.png" />
            파이썬 질문하기
          </button>

          <h3>실시간 키워드 정보</h3>
          <div>{listData({ list })}</div>
        </div>
        <div id="mainChatting">
          <h3>대화하기</h3>

          <div id="chattingSpace">
            {chatData({ chatsData })}
            <div ref={scrollRef}></div>
          </div>

          <div id="inputForm">
            <input
              id="msgInput"
              ref={msgInput}
              onKeyPress={handleKeyPress}
            ></input>
            <button id="msgBnt" onClick={() => sendMsg()}>
              전 송
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ botChats, login }) => {
  //console.log(botChats.chats);

  return {
    chatsData: botChats.chats,
    list: botChats.list,
    num: botChats.num,
    userName: login.userName,
    userId: login.userId,
    pRoomId: botChats.pRoomId,
    cRoomId: botChats.cRoomId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchChatData: () => dispatch(fetchChatData()),
    addMsgData: (id, sender, msg) => dispatch(addMsgData(id, sender, msg)),
    getBotResponse: (msg) => dispatch(getBotResponse(msg)),
    changeUserId: (id) => dispatch(changeUserId(id)),
    changeUserName: (name) => dispatch(changeUserName(name)),
    changeCRoomId: (id) => dispatch(changeCRoomId(id)),
    changePRoomId: (id) => dispatch(changePRoomId(id)),
    clearChatList: () => dispatch(clearChatList()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BotChatRoom);
