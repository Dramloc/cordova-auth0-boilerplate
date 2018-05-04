import { Component, h } from 'preact';
import { route } from 'preact-router';

import { isAuthenticated } from '../../lib/auth';

export default class Loading extends Component {
  componentDidMount() {
    if (isAuthenticated()) {
      route('/home');
      return;
    }
    route('/login');
  }

  render() {
    return (
      <div className="page">
        <div className="flex col abs-centered full-page">
          <div className="spinner spinner-lg is-auth0">
            <div className="circle" />
          </div>
          <h3>Auth0</h3>
        </div>
      </div>
    );
  }
}
