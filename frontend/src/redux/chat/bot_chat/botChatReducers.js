import {
  FETCH_CHATDATA,
  FETCH_CHATDATA_REQUEST,
  FETCH_CHATDATA_SUCCESS,
  FETCH_CHATDATA_FAILURE,
  ADD_BOT_CHATMSG,
  GET_BOT_RESPONSE,
} from './botChatTypes';

const initialState = {
  num: 4,
  chats: [
    {
      id: 1,
      sender: 'bot',
      msg: 'hihi',
    },
    {
      id: 2,
      sender: 'user',
      msg: 'hihihihihi',
    },
    {
      id: 3,
      sender: 'bot',
      msg: '안녕ㅋㅋ',
    },
    {
      id: 4,
      sender: 'user',
      msg: '어쩔ㅋㅋ',
    },
  ],
  list:[
    {
      id:1,
      title:'C언어 변수',
      des:'기본적인 변수 선언, 변수 할당',
    },
    {
      id:2,
      title:'관계 연산자',
      des:'관계 연산자의 결과 확인, 변수에 값을 저장하는 대입 연산자.',
    },
    {
      id:3,
      title:'조건문의 종류',
      des:'조건식에 따라 실행하는 명령문의 흐름 제어문',
    },
    {
      id:4,
      title:'오류 코드 printf',
      des:'주로 C코드 출력문에서의 문법 오류',
    },
  ]
};

const botChatReducer = (state = initialState, action) => {
  const { type, data } = action;

  switch (type) {
    case FETCH_CHATDATA_SUCCESS:
      return state;

    case ADD_BOT_CHATMSG:
      //state.num= state.num + 1;
      return {
        ...state,
        chats: state.chats.concat(
          {
            id: state.num + 1,
            sender: data.sender,
            msg: data.msg,
          },
        ),
        num: state.num + 1,
      };

    case GET_BOT_RESPONSE:
      return {
        ...state,
        chats: state.chats.concat(
          {
            id: state.num + 1,
            sender: 'bot',
            msg: data.msg,
          },
        ),
        num: state.num + 1,
      };

    default:
      return state;
  }
};

export default botChatReducer;
