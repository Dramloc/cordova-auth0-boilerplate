import { h } from 'preact';
import cx from 'classnames';

import Layout from '../layout';

import style from './style.css';

export default function Page({ className, children, ...props }) {
  return (
    <Layout className={cx(style.page, className)} direction="column" {...props}>
      {children}
    </Layout>
  );
}
