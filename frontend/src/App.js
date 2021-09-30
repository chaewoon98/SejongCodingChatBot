/* eslint-disable*/
import React, { useEffect, useState } from 'react';
import './css/App.css';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import BotChatRoom from './contents/BotChatRoom';
import Login from './contents/Login';
import Main from './contents/Main';
import { Provider } from 'react-redux';
import store from './redux/store';
import UserRoute from './router/userRoute';
import MyPage from './contents/MyPage';
import Qa from './contents/Qa';
import Curriculum from './contents/Curriculum';
import TaChatRoom from './contents/TaChatRoom';
import Loading from './contents/Loading';
import Root from './contents/Root';

function App() {
  
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <Route path="/" component={Root} />

          <Route path="/" component={Main} exact />
          
          <UserRoute path="/botchatroom" component={BotChatRoom} />
          <UserRoute path="/tachatroom" component={TaChatRoom} />
          <UserRoute path="/myPage" component={MyPage} />
          
          <Route path="/login" component={Login} />
          <Route path="/curri" component={Curriculum} />
          <Route path="/qa" component={Qa} />
          <Route path="/loading" component={Loading}/>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;