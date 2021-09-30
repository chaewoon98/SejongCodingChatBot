import { combineReducers } from "redux";
import viewReducer from "./view/viewReducer";
import botChatReducer from "./chat/bot_chat/botChatReducers";
import taChatReducer from "./chat/ta_chat/taChatReducers";
import loginReducer from "./login/loginReducers";

const rootReducer = combineReducers({
    views:viewReducer,
    botChats:botChatReducer,
    taChats:taChatReducer,
    login:loginReducer
})

export default rootReducer
