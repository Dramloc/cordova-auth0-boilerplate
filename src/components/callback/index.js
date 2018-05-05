import { Component, h } from 'preact';
import { route } from 'preact-router';

import { handleAuthentication } from '../../lib/auth';
import Layout from '../layout';
import Page from '../page';
import Spinner from '../spinner';

export default class Callback extends Component {
  componentDidMount() {
    handleAuthentication()
      .then(() => route('/home'))
      .catch(() => route('/login'));
  }

  render() {
    return (
      <Page>
        <Layout direction="column" justify="center" align="center" grow={1}>
          <Spinner />
          <p>Login in...</p>
        </Layout>
      </Page>
    );
  }
}
