import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./rootReducer";
import ReduxThunk from 'redux-thunk';



const store = createStore(rootReducer,
    composeWithDevTools(applyMiddleware(ReduxThunk)));

export default store;