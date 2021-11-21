import {
  FETCH_CHATDATA,
  FETCH_CHATDATA_REQUEST,
  FETCH_CHATDATA_SUCCESS,
  FETCH_CHATDATA_FAILURE,
  ADD_TA_CHATMSG,
<<<<<<< HEAD
  GET_TA_RESPONSE,
} from './taChatTypes';

const initialState = {
  num: 4,
  chats: [
    {
      id: 1,
      sender: 'user',
      msg: '질문있습니다. 조교님.',
    },
    {
      id: 2,
      sender: 'ta',
      msg: '넵넵ㅎㅎ',
    },
    {
      id: 3,
      sender: 'user',
      msg: '과제1번 알랴주세용',
    },
    {
      id: 4,
      sender: 'ta',
      msg: 'ㅋㅋ안됩니당ㅋㅋ',
    },
  ],
  list: [
    {
      id: 1,
      title: '고급 C프로그래밍',
      des: '홍길동 교수 / TA 박태수',
    },
    {
      id: 2,
      title: '알고리즘 및 실습',
      des: '홍길동 교수 / TA 정성벽',
    },
=======
  ADD_TA_CHATROOM,
  GET_TA_RESPONSE,
  CHANGE_NOW_TA_CHATROOM,
  CHANGE_ROOM_CHECKED,
  CLEAR_TACHAT_LIST,
  CLEAR_TACHATROOM_LIST,
  UPDATE_TACHATROOM_LIST,
} from './taChatTypes';
import produce from 'immer';

const initialState = {
  num: 0,
  roomNum: 0,
  nowRoomId: -1,
  chats: [
    // ex
    // {
    //   id: 1,
    //   name : '정상뷰'
    //   userId: 123,
    //   msg: '질문있습니다. 조교님.',
    //   time: 11/01 12:11
    // },
    // {
    //   id: 2,
    //   name : '정상뷰'
    //   userId: 123,
    //   sender: 'ta',
    //   msg: '넵넵ㅎㅎ',
    // },
  ],
  list: [
    // ex
    // {
    //   id: 2,
    //   roomId: 3,
    //   title: '알고리즘 및 실습',
    //   des: '홍길동 교수 / TA 정성벽',
    //   isChecked : false,
    // },
>>>>>>> upstream/master
  ],
};

const taChatReducer = (state = initialState, action) => {
  const { type, data } = action;
<<<<<<< HEAD
  
=======

>>>>>>> upstream/master
  switch (type) {
    case FETCH_CHATDATA_SUCCESS:
      return state;

<<<<<<< HEAD
=======
    case CLEAR_TACHAT_LIST:
      return {
        ...state,
        chats: [],
        num: 0,
      };

    case CLEAR_TACHATROOM_LIST:
      return {
        ...state,
        list: [],
        nowRoomId: -1,
        roomNum: 0,
      };

>>>>>>> upstream/master
    case ADD_TA_CHATMSG:
      //state.num= state.num + 1;
      return {
        ...state,
        chats: state.chats.concat({
          id: state.num + 1,
<<<<<<< HEAD
          sender: data.sender,
          msg: data.msg,
=======
          name: data.name,
          userId: data.userId,
          msg: data.msg,
          time: data.time,
>>>>>>> upstream/master
        }),
        num: state.num + 1,
      };

<<<<<<< HEAD
    case GET_TA_RESPONSE:
      return {
        ...state,
        chats: state.chats.concat({
          id: state.num + 1,
          sender: 'ta',
          msg: data.msg,
        }),
        num: state.num + 1,
      };

=======
    case CHANGE_NOW_TA_CHATROOM:
      return {
        ...state,
        nowRoomId: data.nowRoomId,
      };

    case ADD_TA_CHATROOM:
      return {
        ...state,
        list: state.list.concat({
          id: state.roomNum + 1,
          roomId: data.roomId,
          title: data.title,
          des: data.des,
          isChecked: data.isChecked,
        }),
        roomNum: state.roomNum + 1,
      };

    case CHANGE_ROOM_CHECKED:
      return produce(state, (draft) => {
        const room = draft.list.find(
          (list) => String(list.roomId) === String(data.roomId),
        );
        room.isChecked = data.isChecked;
      });

    case UPDATE_TACHATROOM_LIST:

      // const tempList = state.list;
      // console.log(tempList);
      // tempList.splice(index,1);
      // tempList.unshift(updatedRoom);
      return produce(state, (draft) => {

        const index = draft.list.findIndex( (list) => list.roomId === data.index);
        const temp = draft.list[index];
        draft.list.splice(index,1);
        draft.list.unshift(temp);
      });

>>>>>>> upstream/master
    default:
      return state;
  }
};

export default taChatReducer;
