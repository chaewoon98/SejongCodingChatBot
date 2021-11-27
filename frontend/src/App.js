/* eslint-disable*/
import React, { useEffect, useState } from 'react';
import './css/App.css';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import BotChatRoom from './contents/BotChatRoom';
import Login from './contents/Login';
import Main from './contents/Main';
import { Provider } from 'react-redux';
import store from './redux/store';
import UserRoute from './router/UserRoute';
import SignupRoute from './router/SignupRoute';
import MyPage from './contents/MyPage';
import Qa from './contents/Qa';
import CodingEditor from './contents/CodingEditor';
import TaChatRoom from './contents/TaChatRoom';
import Root from './contents/Root';
import Signup from './contents/Signup';
import SignupDetails from './contents/SignupDetails';
import LoadingModal from './contents/modal/LoadingModal';
import SignupComplete from './contents/SignupComplete';

function App() {
  
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          {/* <Route path="/" component={Root} /> */}
          <LoadingModal/>

          <Route path="/" component={Main} exact />
          
          <UserRoute path="/botchatroom" component={BotChatRoom} exact />
          <UserRoute path="/tachatroom" component={TaChatRoom} exact/>
          <UserRoute path="/myPage"  component={MyPage} exact/>
          <UserRoute path="/codingEditor" component={CodingEditor} />

          <Route path="/signup" component={Signup} />
          <SignupRoute path="/signupDetails" component={SignupDetails}/>
          {/* <Route path="/signupDetails" component={SignupDetails}/> */}
          <SignupRoute path="/signupComplete" component={SignupComplete}/> 

          <Route path="/login" component={Login} />
          <Route path="/qa" component={Qa} />
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;