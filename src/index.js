import App from './app';
import isCordova from './is-cordova';

function main() {
  new App().run('app');
}

if (isCordova()) {
  document.addEventListener('deviceready', main);
} else {
  main();
}
