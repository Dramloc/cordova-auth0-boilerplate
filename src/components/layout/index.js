import { h } from 'preact';
import cx from 'classnames';

import style from './style.css';

export default function Layout({
  className,
  children,
  direction,
  wrap,
  justify,
  align,
  grow,
  shrink,
  basis,
  ...props
}) {
  return (
    <div
      className={cx(
        style.layout,
        className,
        { [style[`layout-${direction}`]]: direction },
        { [style[`layout-${wrap}`]]: wrap },
        { [style[`layout-justify-${justify}`]]: justify },
        { [style[`layout-align-${align}`]]: align },
      )}
      style={{
        flexGrow: grow || 0,
        flexShrink: shrink || 1,
        flexBasis: basis || 'auto',
      }}
      {...props}
    >
      {children}
    </div>
  );
}
