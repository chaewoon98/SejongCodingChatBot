import React, { useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import reactDom from 'react-dom';
import '../../css/modal/CodeCompilerQaModal.css';
import { LOGIN_BEFORE } from '../../redux/login/loginTypes';
import axios from 'axios';
import { API_BASE_URL } from '../utils/Constant';
import { changeLoadingState } from '../../redux/view/viewActions';
import { clearTaChatRoomList } from '../../redux/chat/ta_chat/taChatActions';
import { connect, useDispatch } from 'react-redux';
import { addRoomData } from '../../redux/chat/ta_chat/taChatActions';
import { changeUserId, changeUserName } from '../../redux/login/loginActions';

const CodeCompilerModal = ({ code, input, output, userId, userName, list, roomNum, changeUserId,changeUserName,addRoomData, setModalOn, changeLoadingState, clearTaChatRoomList }) => {

  const [nowSelectedNum, setNowSelectedNum] = useState(-1);
  const [title,setTitle] = useState('TA조교한테 질문하기');

  useEffect(() => {
    console.log(code + "  " + input + "   " + output);
    clearTaChatRoomList();
    changeLoadingState(true);
    getIsTa();

    return () => {
      clearTaChatRoomList();
    };
  }, []);

  const listData = () => {
    const listItems = list.map((item) => {

      let st = 'nonSelectedRoomLi';

      if (String(nowSelectedNum) === String(item.roomId)) {
        st = 'selectedRoomLi';
      }

      return (
        <li
          className={st}
          key={item.id}
          // 채팅방 클릭 onClick
          onClick={() => {
            setNowSelectedNum(item.roomId);
          }}
        >
          <p>{item.title}</p>
          <p >{item.des}</p>
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

        if(res.data.isAssistant === '1'){
          setTitle('학생에게 코드 보내기')
        }

        changeUserId(res.data.id);
        changeUserName(res.data.name);
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

        // 채팅방이 없을 경우.
        if (res.data.room.length === 0) {
          changeLoadingState(false);
          return;
        }

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

          addRoomData(
            roomNum,
            res.data.room[i].id,
            res.data.room[i].title,
            name,
            false,
          );
        }

        changeLoadingState(false);
      })
      .catch((res) => {
        console.log(res);
        changeLoadingState(false);
        alert('일시적 오류가 발생했습니다. 다시 시도해주세요.');
      });
  };

  const sendMsg = () => {

    if (nowSelectedNum === -1) {
      return;
    }

    changeLoadingState(true);

    let msg = "----- 코드 -----\n" + code + "\n\n" + "----- 입력 -----\n" + input + "\n\n" +
      "----- 결과 -----\n" + output;

    axios
      .post(
        API_BASE_URL + '/chat/compileMessage',
        JSON.stringify({
          roomId: nowSelectedNum,
          name: userName,
          userId: userId,
          message: msg,
          chatRead: 0,
        }),
        {
          headers: {
            'Content-type': 'application/json',
            Accept: 'application/json',
          },
          withCredentials: true,
        },
      )
      .then((res) => {

        changeLoadingState(false);          
        alert('✔✔✔ 코드 전송 성공 ✔✔✔');
          setModalOn(false);
      })
      .catch((res) => {
        console.log(res);
        changeLoadingState(false);
        alert('일시적 오류가 발생했습니다. 다시 시도해주세요.');
      });
  };


  return (
    <div className="codeCompilerQaModal">
      <div className="bg" />
      <div className="codeCompilerQaModalBox">
        <p className="modalTitle">{title}</p>

        <div className="chatRoomList">
          {listData()}
        </div>

        <p className="modalDes" >질문할 채팅방을 선택해주세요. 코드, 입력값, 결과값을 채팅방으로 보내줍니다.</p>

        <div className="cuttingLine" ></div>
        <div className="bntGroup">
          <button
            style={{ color: '#ff7777' }}
            onClick={() => {
              setModalOn(false);
            }}
          >
            취 소
          </button>
          <button
            onClick={() => {
              sendMsg();
            }}
          >
            보내기
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ login, taChats }) => {
  return {
    list: taChats.list,
    roomNum: taChats.roomNum,
    userName: login.userName,
    userId: login.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLoadingState: (props) => dispatch(changeLoadingState(props)),
    clearTaChatRoomList: () => dispatch(clearTaChatRoomList()),
    addRoomData: (id, roomId, title, des, isChecked) =>
      dispatch(addRoomData(id, roomId, title, des, isChecked)),
    changeUserId: (id) => dispatch(changeUserId(id)),
    changeUserName: (name) => dispatch(changeUserName(name)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CodeCompilerModal);
