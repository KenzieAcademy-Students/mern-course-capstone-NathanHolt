import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import HomePage from 'pages/HomePage'
import SignIn from 'pages/SignIn'
import StoryPage from 'pages/StoryPage'
import UserPage from 'pages/UserPage'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>  
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/log' component={SignIn} />
        <Route exact path='/story/:name' component={StoryPage} />
        <Route exact path='/user/:name' component={UserPage} />
        { /* Add more routes here */} 
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
