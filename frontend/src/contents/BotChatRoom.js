import React, { useEffect, useRef, useSelector } from 'react';
import VerticalHeader from './VerticalHeader';
import HorizontalHeader from './HorizontalHeader';
import { Link } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import {
  addMsgData,
  getBotResponse,
  fetchChatData,
} from '../redux/chat/bot_chat/botChatActions';
import Root from './Root';
import '../css/Chatroom.css';

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
      <li key={item.id}>
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

const BotChatRoom = ({ num, chatsData, list, addMsgData, getBotResponse }) => {
  const msgInput = useRef();
  const scrollRef = useRef();

  useEffect(() => {
    scrollToBottom();
  });

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

    addMsgData(num, 'user', text);
    msgInput.current.value = '';

    getBotResponse(text);
    //scrollToBottom();
  }

  return (
    <div style={{ width: '100%' }}>
      <VerticalHeader />
      <HorizontalHeader />

      <div id="chatRoomBody">
        <div id="emptySpace1" />

        <div id="secondHorizontalNav">
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

const mapStateToProps = ({ botChats }) => {
  console.log(botChats.chats);

  return {
    chatsData: botChats.chats,
    list: botChats.list,
    num: botChats.num,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchChatData: () => dispatch(fetchChatData()),
    addMsgData: (id, sender, msg) => dispatch(addMsgData(id, sender, msg)),
    getBotResponse: (msg) => dispatch(getBotResponse(msg)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BotChatRoom);
