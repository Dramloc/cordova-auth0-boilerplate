import { h } from 'preact';
import cx from 'classnames';

import style from './style.css';

export default function Button({ className, children, ...props }) {
  if (props.href) {
    return (
      <a className={cx(style.button, className)} {...props}>
        <div className={style.button__overlay}>{children}</div>
      </a>
    );
  }
  return (
    <button className={cx(style.button, className)} {...props}>
      <div className={style.button__overlay}>{children}</div>
    </button>
  );
}
