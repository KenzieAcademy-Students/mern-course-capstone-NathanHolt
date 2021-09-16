import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import HomePage from 'pages/HomePage'
import SignIn from 'pages/SignIn'
import StoryPage from 'pages/StoryPage'
import UserPage from 'pages/UserPage'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUp from 'pages/SignUp'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <div className='app'>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/log' component={SignIn} />
          <Route path='/signup' component={SignUp} />
          <Route path='/story/:name' component={StoryPage} />
          <Route path='/user/:name' component={UserPage} />
        </Switch>
      </div>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
