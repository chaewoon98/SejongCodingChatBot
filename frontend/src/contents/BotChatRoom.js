import React, { useEffect, useRef, useSelector, useState } from 'react';
import VerticalHeader from './VerticalHeader';
import HorizontalHeader from './HorizontalHeader';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  addMsgData,
  addKeywordData,
  getBotResponse,
  fetchChatData,
  changeCRoomId,
  changePRoomId,
  changeNowBotRoomId,
  clearChatList,
} from '../redux/chat/bot_chat/botChatActions';
import '../css/Chatroom.css';
import axios from 'axios';
import { API_BASE_URL, API_CHATBOT_URL } from './utils/Constant';
import { CHATBOT_ID } from './utils/Constant';
import {
  changeUserId,
  changeUserName,
  changeType,
  onLoginSuccess,
} from '../redux/login/loginActions';
import { root2 } from './Root2';
import { changeLoadingState } from '../redux/view/viewActions';
import { getTime } from './utils/ChatUtils';
import HotKeywordInfoModal from './modal/HotKeywordInfoModal';

const BotChatRoom = ({
  num,
  chatsData,
  list,
  addMsgData,
  addKeywordData,
  getBotResponse,
  userId,
  userName,
  nowRoomId,
  pRoomId,
  cRoomId,
  changeUserName,
  changeUserId,
  changeCRoomId,
  changePRoomId,
  changeNowBotRoomId,
  clearChatList,

  onLoginSuccess,
  changeType,
  changeLoadingState,
}) => {
  const msgInput = useRef();
  const scrollRef = useRef();
  const [hotKeywordModalOn, setHotKeywordModalOn] = useState(false);
  const [hotKeywordTitle, setHotKeywordTitle] = useState('');
  const [hotKeywordContent, setHotKeywordContent] = useState('');
  const [pBntStyleClass, setPBntStyleClass] = useState('navQuestionBnt');
  const [cBntStyleClass, setCBntStyleClass] = useState('navQuestionBnt');

  useEffect(() => {
    // 동기로 리프래쉬토큰 검증.
    const auth = async () => {
      const result = await root2(
        onLoginSuccess,
        changeType,
        changeLoadingState,
      );

      if (result === 'success') {
        // 로딩창 true
        changeLoadingState(true);
        clearChatList();
        getUserInfo();
        getBotChatRoomList();
        getHotKeyword();
      }
    };

    auth();
  }, []);

  const chatData = ({ chatsData }) => {
    const chatItems = chatsData.map((chat) => {
      if (chat.sender === 'bot') {
        return (
          <BotChatMsgItem
            msg={chat.msg}
            reco={chat.reco}
            key={chat.id}
            time={chat.time}
          />
        );
      } else if (chat.sender === 'user') {
        return (
          <UserChatMsgItem msg={chat.msg} key={chat.id} time={chat.time} />
        );
      }
    });

    return <>{chatItems}</>;
  };

  const listData = ({ list }) => {
    const listItems = list.map((item) => {
      return (
        <li
          className="nonSelectedRoomLi"
          key={item.id}
          onClick={() => {
            setHotKeywordTitle(item.title);
            setHotKeywordContent(item.des);
            setHotKeywordModalOn(true);
          }}
        >
          <p>{item.title}</p>
          <p className="secondNavRoomDes">{item.des}</p>
        </li>
      );
    });

    return <>{listItems}</>;
  };

  function BotChatMsgItem({ msg, reco, time }) {
    let reconContents = null;

    if (reco !== undefined && reco !== null) {
      // reco = reco.toString().replace(/\'/g, '').replace(/]/g, '').replace(/\[/g, '');
      // let recoContent = reco.toString().split(",");
      let i = 0;
      reconContents = reco.map((msg) => {
        i++;
        return (
          <p
            className="botSenderRecoItem"
            key={i}
            onClick={() => {
              msgInput.current.value = msg;
              sendMsg();
            }}
          >
            {'# ' + msg}
          </p>
        );
      });
    }

    const msgResult = msg
      .split('\n')
      .map((it, i) => <div key={'x' + i}>{it}</div>);

    return (
      <li className="botMsg">
        <img src="img/logo.png" />

        <div className="botMsgBox">
          <p className="botSenderName">세종 코딩 헬퍼</p>
          <div className="botSenderMainBox">
            <p className="botSenderTime">{time}</p>
            <div className="botSenderCotentBox">
              <div className="botSenderContent"> {msgResult}</div>

              <>
                {reconContents !== null ? (
                  <div className="botSenderRecoContentBox">{reconContents}</div>
                ) : (
                  ''
                )}
              </>
            </div>
          </div>
        </div>
      </li>
    );
  }

  function UserChatMsgItem({ msg, time }) {
    return (
      <li className="userMsg">
        <div className="userMsgBox">
          <p className="senderName">나</p>
          <div>
            <p className="senderTime">{time}</p>
            <p className="senderContent">{msg}</p>
          </div>
        </div>
      </li>
    );
  }

  const getHotKeyword = () => {
    axios
      .post(
        API_BASE_URL + '/chatbotRoom/hotKeyword',
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
        console.log(res.data);

        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].intent === '정의' || res.data[i].intent === '오류' ) {
            addKeywordData(res.data[i].keyword, res.data[i].answer);
          }
        }
      })
      .catch((res) => {
        console.log(res);
        changeLoadingState(false);
        alert('일시적 오류가 발생했습니다. 다시 시도해주세요.');
      });
  };

  const getUserInfo = () => {
    axios
      .post(
        API_BASE_URL + '/user/assistant',
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
        changeLoadingState(false);
        alert('일시적 오류가 발생했습니다. 다시 시도해주세요.');
      });
  };

  const getBotChatRoomList = () => {
    axios
      .post(
        API_BASE_URL + '/chatbotRoom/studentId',
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

        getRoomIdSession().then((roomId) => {
          let isCRoom = false;

          // C언어 채팅룸이라면,
          if (String(cRoomId) === String(roomId)) {
            isCRoom = true;
          }

          // UI 바꾸기 처리.
          if (isCRoom) {
            setCBntStyleClass('navQuestionSelectedBnt');
          } else {
            setPBntStyleClass('navQuestionSelectedBnt');
          }

          getBotChatList(roomId);
        });
      })
      .catch((res) => {
        console.log(res);
        changeLoadingState(false);
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

          if (name === 'user') {
            addMsgData(
              num,
              name,
              res.data[i].message,
              getTime(res.data[i].createTime),
            );
          } else {
            let len,
              reco = null;

            if (res.data[i].recommends !== null) {
              len = res.data[i].recommends.length - 1;
              reco = res.data[i].recommends.substring(1, len).split(',');
            }

            getBotResponse(
              res.data[i].message,
              reco,
              getTime(res.data[i].createTime),
            );
          }
        }

        changeLoadingState(false);
        scrollToBottom();
      })
      .catch((res) => {
        console.log(res);
        changeLoadingState(false);
        alert('일시적 오류가 발생했습니다. 다시 시도해주세요.');
      });
  };

  const getRoomIdSession = async function () {
    let roomId = await axios
      .post(
        API_BASE_URL + '/chatbotRoom/roomSessionId',
        {},
        {
          headers: {
            'Content-Type': `application/json`,
          },
          withCredentials: true,
        },
      )
      .then((res) => {
        changeNowBotRoomId(res.data);
        return res.data;
      })
      .catch((res) => {
        console.log(res);
        alert('일시적 오류가 발생했습니다. 다시 시도해주세요.');
      });
    return roomId;
  };

  const setRoomIdSession = async function (roomId) {
    await axios
      .post(
        API_BASE_URL + '/chatbotRoom/roomSessionId/' + roomId,
        {},
        {
          headers: {
            'Content-Type': `application/json`,
          },
          withCredentials: true,
        },
      )
      .catch((res) => {
        console.log(res);
        alert('일시적 오류가 발생했습니다. 다시 시도해주세요.');
      });
  };

  const scrollToBottom = () => {
    scrollRef.current.scrollIntoView({ behavior: 'auto' });
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

    let nowTime = new Date().getTime();

    changeLoadingState(true);
    addMsgData(num, 'user', text, getTime(nowTime));
    msgInput.current.value = '';

    axios
      .post(
        API_CHATBOT_URL + '/chatbotMessage/message/' + nowRoomId + '/' + userId,
        { message: text, time: nowTime },
        {
          headers: {
            'Content-type': 'application/json',
            Accept: 'application/json',
          },
          withCredentials: true,
        },
      )
      .then((res) => {
        getBotResponse(
          res.data.result.message,
          res.data.recommend,
          getTime(res.data.result.createTime),
        );
        scrollToBottom();
        changeLoadingState(false);
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

      <>
        {hotKeywordModalOn ? (
          <HotKeywordInfoModal
            setModalOn={setHotKeywordModalOn}
            title={hotKeywordTitle}
            content={hotKeywordContent}
          />
        ) : (
          ''
        )}
      </>

      <div id="chatRoomBody">
        <div id="emptySpace1" />
        <div className="secondHorizontalNav">
          <h3>질문 설정</h3>

          <button
            className={cBntStyleClass}
            onClick={() => {
              changeLoadingState(true);
              setRoomIdSession(cRoomId);
              changeNowBotRoomId(cRoomId);
              clearChatList();
              getBotChatList(cRoomId);
              setCBntStyleClass('navQuestionSelectedBnt');
              setPBntStyleClass('navQuestionBnt');
            }}
          >
            <img src="img/c.png" />
            C언어 질문하기
          </button>

          <button
            className={pBntStyleClass}
            onClick={() => {
              changeLoadingState(true);
              setRoomIdSession(pRoomId);
              changeNowBotRoomId(pRoomId);
              clearChatList();
              getBotChatList(pRoomId);
              setPBntStyleClass('navQuestionSelectedBnt');
              setCBntStyleClass('navQuestionBnt');
            }}
          >
            <img src="img/python.png" />
            파이썬 질문하기
          </button>

          <h3>실시간 인기 키워드</h3>
          <div className="navInner2Div">{listData({ list })}</div>
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
    nowRoomId: botChats.nowRoomId,
    pRoomId: botChats.pRoomId,
    cRoomId: botChats.cRoomId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchChatData: () => dispatch(fetchChatData()),
    addMsgData: (id, sender, msg, time) =>
      dispatch(addMsgData(id, sender, msg, time)),
    addKeywordData: (title, des) => dispatch(addKeywordData(title, des)),
    getBotResponse: (msg, reco, time) =>
      dispatch(getBotResponse(msg, reco, time)),
    changeUserId: (id) => dispatch(changeUserId(id)),
    changeUserName: (name) => dispatch(changeUserName(name)),
    changeCRoomId: (id) => dispatch(changeCRoomId(id)),
    changePRoomId: (id) => dispatch(changePRoomId(id)),
    changeNowBotRoomId: (id) => dispatch(changeNowBotRoomId(id)),
    clearChatList: () => dispatch(clearChatList()),

    changeType: (type) => dispatch(changeType(type)),
    changeLoadingState: (props) => dispatch(changeLoadingState(props)),
    onLoginSuccess: (props) => dispatch(onLoginSuccess(props)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BotChatRoom);
