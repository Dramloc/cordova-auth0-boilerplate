import { h, render } from 'preact';

import App from './components/app';
import isCordova from './lib/util/is-cordova';

let root;
function init() {
  root = render(<App />, document.body, root);
}

if (isCordova()) {
  document.addEventListener('deviceready', init);
} else {
  init();
}
