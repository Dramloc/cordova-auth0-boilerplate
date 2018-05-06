import { h, render } from 'preact';

import App from './components/app';

let root;
function init() {
  root = render(<App />, document.body, root);
}

if (process.env.IS_CORDOVA) {
  document.addEventListener('deviceready', init);
} else {
  init();
}
