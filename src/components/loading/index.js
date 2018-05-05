import { Component, h } from 'preact';
import { route } from 'preact-router';

import { isAuthenticated } from '../../lib/auth';
import Layout from '../layout';
import Page from '../page';
import Spinner from '../spinner';

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
      <Page>
        <Layout direction="column" justify="center" align="center" grow={1}>
          <Spinner />
          <p>Loading...</p>
        </Layout>
      </Page>
    );
  }
}
