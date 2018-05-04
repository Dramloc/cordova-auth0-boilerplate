import { Component, h } from 'preact';
import { route } from 'preact-router';

import { handleAuthentication } from '../../lib/auth';

export default class Callback extends Component {
  componentDidMount() {
    handleAuthentication()
      .then(() => route('/home'))
      .catch(() => route('/login'));
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
