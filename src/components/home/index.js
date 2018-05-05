import { h } from 'preact';

import { isAuthenticated, logout, refresh, getAuthorizationHeader } from '../../lib/auth';
import Button from '../button';
import Fetch from '../fetch';
import Layout from '../layout';
import Page from '../page';
import Redirect from '../redirect';
import Spinner from '../spinner';

import style from './style.css';

export default function Home() {
  return (
    <Page>
      {!isAuthenticated() && <Redirect path="/login" />}
      <Layout direction="column" justify="center" grow={1}>
        <h1>Auth0</h1>
        <h2>Hybrid Quickstart</h2>
        <Fetch
          url={`https://${process.env.AUTH0_DOMAIN}/userinfo`}
          options={{
            headers: {
              authorization: getAuthorizationHeader(),
            },
          }}
        >
          {({ loading, data: profile }) =>
            (loading ? (
              <Spinner />
            ) : (
              <pre className={style.profile}>
                <code>{JSON.stringify(profile, null, 2)}</code>
              </pre>
            ))
          }
        </Fetch>
      </Layout>
      <Layout direction="column">
        <Button onClick={refresh}>Refresh authentication</Button>
        <Button onClick={logout} primary>
          Logout
        </Button>
      </Layout>
    </Page>
  );
}
