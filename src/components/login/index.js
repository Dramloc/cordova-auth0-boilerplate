import { Component, h } from 'preact';
import { route } from 'preact-router';

import { isAuthenticated, login } from '../../lib/auth';

export default class Loading extends Component {
  componentDidMount() {
    if (isAuthenticated()) {
      route('/home');
    }
  }

  render() {
    return (
      <div className="page">
        <div className="flex col full-page">
          <div className="expand-to-fill flex abs-centered">
            <div>
              <h1>Auth0</h1>
              <h2>Hybrid Quickstart</h2>
              <p>
                Please click the button to login using the hosted login page. You can edit the page
                at
                <a href="https://manage.auth0.com/#/login_page"> Dashboard &gt; Hosted Page</a>
              </p>
            </div>
          </div>
          <hr />
          <div className="flex hor-centered">
            <button className="btn btn-success btn-login" onClick={login}>
              <span className="btn-icon icon-budicon-120" />
              <span>Login using Auth0</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}
