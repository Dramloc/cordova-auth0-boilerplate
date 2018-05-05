import { h } from 'preact';

import { isAuthenticated } from '../../lib/auth';
import Layout from '../layout';
import Page from '../page';
import Redirect from '../redirect';
import Spinner from '../spinner';

export default function Loading() {
  return (
    <Page>
      {isAuthenticated() ? <Redirect path="/home" /> : <Redirect path="/login" />}
      <Layout direction="column" justify="center" align="center" grow={1}>
        <Spinner />
        <p>Loading...</p>
      </Layout>
    </Page>
  );
}
