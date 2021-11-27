
import {
  FETCH_CHATDATA,
  FETCH_CHATDATA_REQUEST,
  FETCH_CHATDATA_SUCCESS,
  FETCH_CHATDATA_FAILURE,
  ADD_BOT_CHATMSG,
  ADD_KEYWORD_LIST,
  GET_BOT_RESPONSE,
  CHAGNE_CROOM_ID,
  CHAGNE_PROOM_ID,
  CLEAR_CHAT_LIST,
  CHAGNE_NOW_BOTROOM_ID,
} from './botChatTypes';

// const fetChatData = () => {
//     return (dispatch) => {
//         // fetch("url")
//         // .then(response => response.json())
//         // .then(chatData =>console.log(chatData))
//         // .catch(error=>console.log(error))
//     }
// }

export const clearChatList = () => {
  return{
    type:CLEAR_CHAT_LIST,
  }
}

export const changeNowBotRoomId = (nowRoomId) => {
  return{
    type:  CHAGNE_NOW_BOTROOM_ID,
    data:{nowRoomId : nowRoomId}
  }
}

export const changeCRoomId = (id) => {
  return{
    type:CHAGNE_CROOM_ID,
    data:{cRoomId : id}
  }
}

export const changePRoomId = (id) => {
  return{
    type:CHAGNE_PROOM_ID,
    data:{pRoomId : id}
  }
}

export const fetchChatData = () => {
    return {
        type: FETCH_CHATDATA_SUCCESS,
    };
}

export const addMsgData = (id, sender,msg,time) => {
  
    return{
      type: ADD_BOT_CHATMSG,
      data:{id:id,sender: sender, msg: msg,time:time,}
    };
}

export const addKeywordData = (title,des) => {
  
  return{
    type:ADD_KEYWORD_LIST,
    data:{title:title,des:des}
  };
}

export const getBotResponse = (msg,reco, time) => {

  return{
    type: GET_BOT_RESPONSE,
    data:{
      msg:msg,
      reco:reco,
      time:time
    }
  }
}
