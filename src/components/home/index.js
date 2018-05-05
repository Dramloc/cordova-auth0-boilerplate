import { Component, h } from 'preact';
import { route } from 'preact-router';

import { isAuthenticated, logout, refresh } from '../../lib/auth';
import Button from '../button';
import Layout from '../layout';
import Page from '../page';

export default class Loading extends Component {
  componentDidMount() {
    if (!isAuthenticated()) {
      route('/login');
    }
  }

  render() {
    return (
      <Page>
        <Layout direction="column" justify="center" grow={1}>
          <h1>Auth0</h1>
          <h2>Hybrid Quickstart</h2>
        </Layout>
        <Layout direction="column">
          <Button onClick={refresh}>Refresh authentication</Button>
          <Button onClick={logout} primary>Logout</Button>
        </Layout>
      </Page>
    );
  }
}
