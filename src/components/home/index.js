import { Component, h } from 'preact';
import { route } from 'preact-router';

import { isAuthenticated, logout, refresh } from '../../lib/auth';

export default class Loading extends Component {
  componentDidMount() {
    if (!isAuthenticated()) {
      route('/login');
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
            </div>
          </div>
          <hr />
          <div className="flex hor-centered">
            <button className="btn btn-success btn-refresh" onClick={refresh}>
              <span className="btn-icon icon-budicon-320" />
              <span>Refresh</span>
            </button>
            <button className="btn btn-success btn-logout" onClick={logout}>
              <span className="btn-icon icon-budicon-120" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}
