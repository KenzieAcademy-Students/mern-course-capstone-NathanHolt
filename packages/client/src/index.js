import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "pages/HomePage";
import SignIn from "pages/SignIn";
import StoryPage from "pages/StoryPage";
import UserPage from "pages/UserPage";
import TesterN from "pages/TesterN";
import { ManagedUserContext } from 'hooks/useUser'
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SignUp from "pages/SignUp";
import { AppRouter } from "AppRouter"

ReactDOM.render(
  <React.StrictMode>
    <ManagedUserContext>
      <BrowserRouter>
        <AppRouter>
          <div className='app'>
            <Switch>
              <Route exact path='/' component={HomePage} />
              <Route exact path='/testn' component={TesterN} />
              <Route path='/log' component={SignIn} />
              <Route path='/signup' component={SignUp} />
              <Route path='/story/:name' component={StoryPage} />
              <Route path='/user/:name' component={UserPage} />
            </Switch>
          </div>
        </AppRouter>
      </BrowserRouter>
    </ManagedUserContext>
  </React.StrictMode>,
  document.getElementById("root")
);
