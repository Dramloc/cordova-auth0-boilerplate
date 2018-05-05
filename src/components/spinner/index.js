import { h } from 'preact';
import cx from 'classnames';

import style from './style.css';

export default function Spinner({ className, ...props }) {
  return (
    <div className={cx(style.spinner, className)} {...props}>
      <div className={style.spinner__circle} />
    </div>
  );
}
