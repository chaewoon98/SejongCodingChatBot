import React, { useEffect, useRef, useSelector } from 'react';
import VerticalHeader from './VerticalHeader';
import HorizontalHeader from './HorizontalHeader';
import { Link } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import {
  addMsgData,
  getBotResponse,
  fetchChatData,
} from '../redux/chat/ta_chat/taChatActions';
import '../css/Chatroom.css';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

let sockJS = new SockJS('http://localhost:8080/websocket');
let stomp = Stomp.over(sockJS);

const chatData = ({ chatsData }) => {
  const chatItems = chatsData.map((chat) => {
    if (chat.sender === 'ta') {
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
      <img src="img/taman.png" />
      <div>
        <p>TA 홍길동</p>
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

const TaChatRoom = ({ num, chatsData, list, addMsgData, getBotResponse }) => {
  const msgInput = useRef();
  const scrollRef = useRef();

  useEffect(() => {
    scrollToBottom();

    stomp.connect({}, () => {
      stomp.subscribe('/sub/chat/room/' + '12321', function (chat) {

        var content = JSON.parse(chat.body);
        
        console.log(content);
        
        addMsgData(num, 'ta', content.message);
        // chatBox.append(
        //   '<li>' + content.message + '(' + content.userId + ')</li>',
        // );

      });
    });

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

    stomp.send('/pub/chat/message', {}, JSON.stringify({roomNo: 12321, userId: "user", message: text}));

    addMsgData(num, 'user', text);
    msgInput.current.value = '';

    //getBotResponse(text);
    //scrollToBottom();
  }

  return (
    <div style={{ width: '100%' }}>
      <VerticalHeader />
      <HorizontalHeader />

      <div id="chatRoomBody">
        <div id="emptySpace1" />

        <div id="secondHorizontalNav">
          <h3 style={{ color: '#008cff' }}> 채팅방 목록</h3>
          <div>
            <div>{listData({ list })}</div>
          </div>
        </div>

        <div id="mainChatting">
          <h3 style={{ color: '#008cff' }}>대화하기</h3>

          <div id="taChattingSpace">
            {chatData({ chatsData })}
            <div ref={scrollRef}></div>
          </div>

          <div id="inputForm">
            <input
              id="taMsgInput"
              ref={msgInput} //border: solid 2px #990000;
              onKeyPress={handleKeyPress}
            ></input>
            <button id="taMsgBnt" onClick={() => sendMsg()}>
              전 송
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ taChats }) => {
  console.log(taChats.chats);

  return {
    chatsData: taChats.chats,
    list: taChats.list,
    num: taChats.num,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchChatData: () => dispatch(fetchChatData()),
    addMsgData: (id, sender, msg) => dispatch(addMsgData(id, sender, msg)),
    getBotResponse: (msg) => dispatch(getBotResponse(msg)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaChatRoom);
