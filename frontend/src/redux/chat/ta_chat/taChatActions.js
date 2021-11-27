import {
  FETCH_CHATDATA,
  FETCH_CHATDATA_REQUEST,
  FETCH_CHATDATA_SUCCESS,
  FETCH_CHATDATA_FAILURE,
  ADD_TA_CHATMSG,
  ADD_TA_CHATROOM,
  GET_TA_RESPONSE,
  CHANGE_NOW_TA_CHATROOM,
  CHANGE_ROOM_CHECKED,
  CLEAR_TACHAT_LIST,
  CLEAR_TACHATROOM_LIST,
  UPDATE_TACHATROOM_LIST,
} from './taChatTypes';

// const fetChatData = () => {
//     return (dispatch) => {
//         // fetch("url")
//         // .then(response => response.json())
//         // .then(chatData =>console.log(chatData))
//         // .catch(error=>console.log(error))
//     }
// }

export const fetchChatData = () => {
  return {
    type: FETCH_CHATDATA_SUCCESS,
  };
};

export const clearTaChatList = () => {
  return {
    type: CLEAR_TACHAT_LIST,
  };
};
export const clearTaChatRoomList = () => {
  return {
    type: CLEAR_TACHATROOM_LIST,
  };
};

export const updateTAChatroomList = (index) => {
  return {
    type: UPDATE_TACHATROOM_LIST,
    data: { index: index },
  };
};

export const changeNowRoomId = (nowRoomId) => {
  return {
    type: CHANGE_NOW_TA_CHATROOM,
    data: { nowRoomId: nowRoomId },
  };
};

export const changeCheckedState = (roomId, isChecked) => {
  return {
    type: CHANGE_ROOM_CHECKED,
    data: { roomId: roomId, isChecked: isChecked },
  };
};

export const addMsgData = (id, name, userId, msg, time) => {
  return {
    type: ADD_TA_CHATMSG,
    data: { id: id, name: name, userId: userId, msg: msg, time: time },
  };
};

export const addRoomData = (id, roomId, title, des, isChecked) => {
  return {
    type: ADD_TA_CHATROOM,
    data: {
      id: id,
      roomId: roomId,
      title: title,
      des: des,
      isChecked: isChecked,
    },
  };
};
