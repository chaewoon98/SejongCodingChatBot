import React, { useState, useEffect, useRef, useSelector } from 'react';
import VerticalHeader from './VerticalHeader';
import HorizontalHeader from './HorizontalHeader';
import { Link } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import axios from 'axios';
import { API_BASE_URL } from './utils/Constant';
import { useLocation } from 'react-router';
import {
  addMsgData,
  addRoomData,
  fetchChatData,
  changeNowRoomId,
  clearTaChatList,
  clearTaChatRoomList,
  changeCheckedState,
  updateTAChatroomList,
} from '../redux/chat/ta_chat/taChatActions';
import {
  changeUserId,
  changeUserName,
  changeType,
  onLoginSuccess,
} from '../redux/login/loginActions';
import '../css/Chatroom.css';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { LOGIN_ORIGIN, LOGIN_BEFORE } from '../redux/login/loginTypes';
import { changeLoadingState } from '../redux/view/viewActions';
import { root2 } from './Root2';
import ChatRoomDeniedModal from './modal/ChatRoomDeniedModal';
import ChatRoomAddingModal from './modal/ChatRoomAddingModal';
import CodeMsgModal from './modal/CodeMsgModal';
import Root from './Root';
import { clearChatList } from '../redux/chat/bot_chat/botChatActions';
import { getTime } from './utils/ChatUtils';

//const sockJS = new SockJS(API_BASE_URL + '/websocket');
//const stomp = Stomp.over(sockJS);
const stomp = Stomp.over(() => new SockJS(API_BASE_URL + '/websocket'));
const stomp2 = Stomp.over(() => new SockJS(API_BASE_URL + '/websocket2'));

const TaChatRoom = ({
  loginState,
  userId,
  userName,
  num,
  roomNum,
  nowRoomId,
  chatsData,
  list,
  addMsgData,
  addRoomData,
  history,
  changeUserId,
  changeUserName,
  changeNowRoomId,
  changeCheckedState,
  clearTaChatList,
  clearTaChatRoomList,
  updateTAChatroomList,

  onLoginSuccess,
  changeType,
  changeLoadingState,
}) => {
  const msgInput = useRef();
  const scrollRef = useRef();
  const [isTa, setTa] = useState(false);
  const [modalOn, setModalOn] = useState(false);
  const [codeModalOn, setCodeModalOn] = useState(false);
  const [roomPlusmodalOn, setRoomPlusModalOn] = useState(false);
  const { pathname } = useLocation();

  const [codeMsg, setCodeMsg] = useState('');

  // 룸 리스트를 api로 가지고 온후를 알려주는 변수 useEffect
  const [isRoomListUpdated, setRoomListUpdated] = useState(false);
  // 룸 소켓통신 연결한후를 알려쥼.
  const [isSelectedRoomUpdated, setSelectedRoomUpdated] = useState(false);
  const [isChangedPage, setChangedPage] = useState(false);

  useEffect(() => {
    // 동기로 리프래쉬토큰 검증.

    const auth = async () => {
      const result = await root2(
        onLoginSuccess,
        changeType,
        changeLoadingState,
      );

      if (result === 'success') {
        changeLoadingState(true);
        getIsTa();
      }
    };

    auth();

    return () => {
      setChangedPage(true);

      clearTaChatRoomList();
      clearTaChatList();
      stomp.disconnect();
    };
  }, [pathname]);

  useEffect(() => {
    scrollToBottom();
  }, [chatsData]);

  useEffect(() => {
    stomp2.disconnect();
  }, [isChangedPage]);

  useEffect(() => {
    if (list.length !== 0) {
      //console.log(list);
      connectStomp(list);
    }
  }, [isRoomListUpdated]);

  useEffect(() => {
    if (list.length !== 0 && isSelectedRoomUpdated) {
      connectStomp2(nowRoomId);
    }
  }, [isSelectedRoomUpdated]);

  function BotChatMsgItem({ msg, name, time }) {
    let isCodeMsg = msg.includes('----- 코드 -----');
    let st = 'botSenderContent';
    let code = '';
    if (isCodeMsg) {
      code = msg;
      st = 'botSenderCodeContent';
      msg = '코드를 전송했습니다.\n메세지를 클릭해서 코드를 확인하세요.';
    }

    return (
      <li className="botMsg">
        <img src="img/taman.png"/>

        <div className="botMsgBox">
          <p className="botSenderName">{name}</p>
          <div className="botSenderMainBox">
            <p className="botSenderTime">{time}</p>
            <p className="botSenderContent"
              onClick={() => {
                if (isCodeMsg) {
                  setCodeModalOn(true);
                  setCodeMsg(code);
                }
              }}
              className={st}
            >
              {msg}
            </p>
          </div>
        </div>
      </li>
    );
  }

  function UserChatMsgItem({ msg, name, time }) {
    let isCodeMsg = msg.includes('----- 코드 -----');
    let st = 'senderContent';
    let code = '';
    if (isCodeMsg) {
      code = msg;
      st = 'senderCodeContent';
      msg = '코드를 전송했습니다.\n메세지를 클릭해서 코드를 확인하세요.';
    }

    return (
      <li className="userMsg">
        <div className="userMsgBox">
          <p className="senderName">나</p>
          <div>
            <p className="senderTime">{time}</p>
            <p
              onClick={() => {
                if (isCodeMsg) {
                  setCodeModalOn(true);
                  setCodeMsg(code);
                }
              }}
              className={st}
            >
              {msg}
            </p>
          </div>
        </div>
      </li>
    );
  }

  const chatData = () => {
    const chatItems = chatsData.map((chat) => {
      let tempName = chat.name;
      if (!isTa) {
        tempName = 'TA ' + chat.name;
      }

      if (chat.userId === userId) {
        return (
          <UserChatMsgItem msg={chat.msg} key={chat.id} time={chat.time} />
        );
      } else {
        return (
          <BotChatMsgItem
            msg={chat.msg}
            name={tempName}
            time={chat.time}
            key={chat.id}
          />
        );
      }
    });

    return <>{chatItems}</>;
  };

  const listData = () => {
    const listItems = list.map((item) => {
      let st = 'nonSelectedRoomLi';

      if (String(nowRoomId) === String(item.roomId)) {
        st = 'selectedRoomLi';
      }
      return (
        <li
          className={st}
          key={item.id}
          // 채팅방 클릭 onClick
          onClick={() => {
            changeLoadingState(true);
            clearTaChatList();

            // enter하는 시점에서 상대방 모든 메세지 1로 만듬. list[item.id - 1]
            updateChatReadState(item.roomId);
            setRoomIdSession(item.roomId);

            // 클릭하기전 nowRoomId를 false로 만듬.
            changeCheckedState(nowRoomId, false);
            changeCheckedState(item.roomId, false);
            changeNowRoomId(item.roomId);
            getChatList(item.roomId);
            stomp2.deactivate({ type1: 'clicked' });
          }}
        >
          <div>
            <p>{item.title}</p>
            <>
              {item.isChecked && item.roomId !== nowRoomId ? (
                <p className="secondNavRoomNewP" style={{ color: 'red' }}>
                  New
                </p>
              ) : (
                ''
              )}
            </>
          </div>
          <p className="secondNavRoomDes">{item.des}</p>
        </li>
      );
    });

    return <>{listItems}</>;
  };

  const getIsTa = () => {
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

        if (res.data.isAssistant === '1') {
          setTa(true);
        }

        getChatRoomList(res.data.isAssistant, res.data.studentNumber);
      })
      .catch((res) => {
        console.log(res);
        changeLoadingState(false);
        alert('일시적 오류가 발생했습니다. 다시 시도해주세요.');
      });
  };

  const getChatRoomList = (isTa, studentNumber) => {
    axios
      .post(
        API_BASE_URL + '/room/studentId',
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
        console.log(res.data.roomIdList);

        // 채팅방이 없을 경우.
        if (res.data.room.length === 0) {
          changeLoadingState(false);
          return;
        }

        // room id 임시저장 변수
        let roomList = [];

        for (let i = 0; i < res.data.room.length; i++) {
          let otherName;
          if (String(res.data.room[i].user.studentNumber) === studentNumber) {
            otherName = res.data.room[i].user2.name;
          } else {
            otherName = res.data.room[i].user.name;
          }

          // 접속 계정이 TA일 경우와 아닌 경우 다른 UI를 위해.
          let name;
          if (isTa === '1') {
            name = otherName + ' 학생';
          } else {
            name = 'TA ' + otherName;
          }

          let isNewChatRoom = false;
          // checked true or false 계산
          for (let j = 0; j < res.data.roomIdList.length; j++) {
            if (
              String(res.data.room[i].id) === String(res.data.roomIdList[j])
            ) {
              isNewChatRoom = true;
            }
          }

          addRoomData(
            roomNum,
            res.data.room[i].id,
            res.data.room[i].title,
            name,
            isNewChatRoom,
          );
          roomList.push(res.data.room[i].id);
        }
        // 우선 첫번째 채팅방의 채팅 내역 불러오기.

        // updated 시켜서 connect문 -> useEffect에서 소켓통신 연결.
        setRoomListUpdated(true);

        getRoomIdSession().then((nowRoomId) => {
          getChatList(nowRoomId, studentNumber);
          changeCheckedState(nowRoomId, false);
          //connectStomp(roomList);
        });
      })
      .catch((res) => {
        console.log(res);
        changeLoadingState(false);
        alert('일시적 오류가 발생했습니다. 다시 시도해주세요.');
      });
  };

  const getChatList = (roomId) => {
    axios
      .post(
        API_BASE_URL + '/chat/roomId/' + roomId,
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
          //console.log(res.data[i].message);
          addMsgData(
            num,
            res.data[i].user.name,
            res.data[i].user.id,
            res.data[i].message,
            getTime(res.data[i].createTime),
          );
        }
        scrollToBottom();
        changeLoadingState(false);
      })
      .catch((res) => {
        console.log(res);
        changeLoadingState(false);
        alert('일시적 오류가 발생했습니다. 다시 시도해주세요.');
      });
  };

  const connectStomp = (roomList) => {
    changeLoadingState(true);
    stomp.connect(
      {},
      () => {
        for (let i = 0; i < roomList.length; i++) {
          // subscribe 여러개 하면 다중 연결
          stomp.subscribe('/sub/chat/room/' + roomList[i].roomId, (chat) => {
            var content = JSON.parse(chat.body);

            for (let i = 0; i < list.length; i++) {
              if (list[i].roomId == content.roomId) {
                changeCheckedState(content.roomId, true);
              }
            }

            updateTAChatroomList(content.roomId);

            // getRoomIdSession().then((nowRoomId) => {
            //   if (nowRoomId !== content.roomId) {
            //     for (let i = 0; i < list.length; i++) {
            //       if (list[i].roomId == content.roomId) {
            //         //console.log(list[i].roomId + ' // ' + roomId);
            //         changeCheckedState(content.roomId, true);
            //       }
            //     }
            //   }
            // });
          });
        }

        // 이 시점에서 선택된 하나의 채팅 룸에대한 소켓통신을 connect한다.
        setSelectedRoomUpdated(true);
        changeLoadingState(false);
      },
      // onErrorCallback
      () => {
        changeLoadingState(false);
        alert('일시적 오류가 발생했습니다. 다시 시도해주세요.');
      },
    );
  };

  const connectStomp2 = (nowRoomId) => {
    changeLoadingState(true);
    stomp2.connect(
      {},
      // connectCallback
      () => {
        stomp2.subscribe('/sub/chat/room2/' + nowRoomId, (chat) => {
          var content = JSON.parse(chat.body);

          let date = getTime(content.createTime);
          addMsgData(num, content.name, content.userId, content.message, date);
        });

        changeLoadingState(false);
        setSelectedRoomUpdated(false);
      },
      // onErrorCallback
      () => {
        changeLoadingState(false);
        alert('일시적 오류가 발생했습니다. 다시 시도해주세요.');
      },
      //closeEventCallback
      () => {
        console.log(nowRoomId);
        console.log(isChangedPage);

        // disconnect하는 시점에서 상대방 모든 메세지 1로 만듬.
        updateChatReadState(nowRoomId);

        // 이 시점에서 선택된 하나의 채팅 룸에대한 소켓통신을 connect한다.
        setSelectedRoomUpdated(true);
        changeLoadingState(false);
      },
    );
  };

  const getRoomIdSession = async function () {
    let roomId = await axios
      .post(
        API_BASE_URL + '/room/roomSessionId',
        {},
        {
          headers: {
            'Content-Type': `application/json`,
          },
          withCredentials: true,
        },
      )
      .then((res) => {
        changeNowRoomId(res.data);
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
        API_BASE_URL + '/room/roomSessionId/' + roomId,
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
    if (scrollRef) {
      scrollRef.current.scrollIntoView({ behavior: 'auto' });
    }
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
    console.log(nowRoomId);
    stomp.send(
      '/pub/chat/message',
      {},
      JSON.stringify({
        roomId: nowRoomId,
        name: userName,
        userId: userId,
        message: text,
        chatRead: 0,
      }),
    );

    stomp2.send(
      '/pub/chat/message2',
      {},
      JSON.stringify({
        roomId: nowRoomId,
        name: userName,
        userId: userId,
        message: text,
        chatRead: 0,
      }),
    );
    updateTAChatroomList(nowRoomId);

    msgInput.current.value = '';
  }

  const updateChatReadState = (roomId) => {
    axios
      .post(
        API_BASE_URL + '/room/readStatus',
        { roomId: roomId },
        {
          headers: {
            'Content-type': 'application/json',
            Accept: 'application/json',
          },
          withCredentials: true,
        },
      )
      .then((res) => {})
      .catch((res) => {
        console.log(res);
        alert('일시적 오류가 발생했습니다. 다시 시도해주세요.');
      });
  };

  return (
    <div style={{ width: '100%' }}>
      <VerticalHeader />
      <HorizontalHeader />

      <>{modalOn ? <ChatRoomDeniedModal setModalOn={setModalOn} /> : ''}</>

      <>
        {codeModalOn ? (
          <CodeMsgModal setModalOn={setCodeModalOn} msg={codeMsg} />
        ) : (
          ''
        )}
      </>

      <>
        {roomPlusmodalOn ? (
          <ChatRoomAddingModal
            setModalOn={setRoomPlusModalOn}
            userId={userId}
          />
        ) : (
          ''
        )}
      </>

      <div id="chatRoomBody">
        <div id="emptySpace1" />

        <div className="secondHorizontalNav">
          <div id="navInnerDiv">
            <h3 style={{ color: '#008cff' }}> 채팅방 목록</h3>
            <div
              onClick={() => {
                if (!isTa) {
                  setModalOn(true);
                } else {
                  setRoomPlusModalOn(true);
                }
              }}
            >
              +
            </div>
          </div>
          <div className="navInner2Div">
            <div>{listData()}</div>
          </div>
        </div>

        <div id="mainChatting">
          <h3 style={{ color: '#008cff' }}>대화하기</h3>

          <div id="taChattingSpace">
            {chatData()}
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

const mapStateToProps = ({ taChats, login }) => {
  //console.log(taChats.chats);

  return {
    chatsData: taChats.chats,
    list: taChats.list,
    num: taChats.num,
    roomNum: taChats.roomNum,
    nowRoomId: taChats.nowRoomId,
    loginState: login.type,
    userName: login.userName,
    userId: login.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchChatData: () => dispatch(fetchChatData()),
    addMsgData: (id, name, userId, msg, time) =>
      dispatch(addMsgData(id, name, userId, msg, time)),
    addRoomData: (id, roomId, title, des, isChecked) =>
      dispatch(addRoomData(id, roomId, title, des, isChecked)),
    getBotResponse: (msg) => dispatch(getBotResponse(msg)),
    changeUserId: (id) => dispatch(changeUserId(id)),
    changeUserName: (name) => dispatch(changeUserName(name)),
    changeNowRoomId: (nowRoomId) => dispatch(changeNowRoomId(nowRoomId)),
    changeCheckedState: (roomId, isChecked) =>
      dispatch(changeCheckedState(roomId, isChecked)),
    clearTaChatList: () => dispatch(clearTaChatList()),
    clearTaChatRoomList: () => dispatch(clearTaChatRoomList()),
    updateTAChatroomList: (index) => dispatch(updateTAChatroomList(index)),

    changeType: (type) => dispatch(changeType(type)),
    changeLoadingState: (props) => dispatch(changeLoadingState(props)),
    onLoginSuccess: (props) => dispatch(onLoginSuccess(props)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaChatRoom);
