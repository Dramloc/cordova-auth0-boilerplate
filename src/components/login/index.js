import { h } from 'preact';

import { isAuthenticated, login } from '../../lib/auth';
import Button from '../button';
import Layout from '../layout';
import Page from '../page';
import Redirect from '../redirect';

export default function Login() {
  return (
    <Page>
      {isAuthenticated() && <Redirect path="/home" />}
      <Layout direction="column" justify="center" grow={1}>
        <h1>Auth0</h1>
        <h2>Hybrid Quickstart</h2>
        <p>
          Please click the button to login using the hosted login page. You can edit the page at{' '}
          <a href="https://manage.auth0.com/#/login_page"> Dashboard &gt; Hosted Page</a>
        </p>
      </Layout>
      <Layout direction="column">
        <Button onClick={login} primary>
          Login using Auth0
        </Button>
      </Layout>
    </Page>
  );
}
