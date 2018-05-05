import { h } from 'preact';
import cx from 'classnames';

import style from './style.css';

export default function Button({
  className, children, primary, ...props
}) {
  const classes = cx(style.button, className, {
    [style['button--primary']]: primary,
  });
  const inner = [
    <div className={style.button__overlay} />,
    <div className={style.button__bevel} />,
    { children },
  ];
  if (props.href) {
    return (
      <a className={classes} {...props}>
        {inner}
      </a>
    );
  }
  return (
    <button className={classes} {...props}>
      {inner}
    </button>
  );
}
