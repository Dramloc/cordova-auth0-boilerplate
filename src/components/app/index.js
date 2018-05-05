import { Component, h } from 'preact';
import { createHashHistory, createBrowserHistory } from 'history';
import { Router } from 'preact-router';

import Callback from '../callback';
import Home from '../home';
import isCordova from '../../lib/util/is-cordova';
import Loading from '../loading';
import Login from '../login';

import style from './style.css';

export default class App extends Component {
  constructor() {
    super();
    if (isCordova()) {
      this.history = createHashHistory();
    } else {
      this.history = createBrowserHistory();
    }
  }

  render() {
    return (
      <div className={style.app}>
        <Router history={this.history}>
          <Loading path="/" />
          <Callback path="/callback" />
          <Login path="/login" />
          <Home path="/home" />
        </Router>
      </div>
    );
  }
}
