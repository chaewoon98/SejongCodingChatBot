import {
  FETCH_CHATDATA,
  FETCH_CHATDATA_REQUEST,
  FETCH_CHATDATA_SUCCESS,
  FETCH_CHATDATA_FAILURE,
  ADD_TA_CHATMSG,
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
  ],
};

const taChatReducer = (state = initialState, action) => {
  const { type, data } = action;
  
  switch (type) {
    case FETCH_CHATDATA_SUCCESS:
      return state;

    case ADD_TA_CHATMSG:
      //state.num= state.num + 1;
      return {
        ...state,
        chats: state.chats.concat({
          id: state.num + 1,
          sender: data.sender,
          msg: data.msg,
        }),
        num: state.num + 1,
      };

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

    default:
      return state;
  }
};

export default taChatReducer;
