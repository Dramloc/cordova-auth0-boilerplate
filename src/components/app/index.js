import { Component, h } from 'preact';
import { Router } from 'preact-router';

import Callback from '../callback';
import createHistory from '../../lib/util/create-history';
import Home from '../home';
import Loading from '../loading';
import Login from '../login';

import style from './style.css';

export default class App extends Component {
  constructor() {
    super();
    this.history = createHistory();
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
