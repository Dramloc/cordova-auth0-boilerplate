export default function createHistory() {
  if (process.env.IS_CORDOVA) {
    return require('history/createHashHistory').default(); // eslint-disable-line global-require
  }
  return undefined;
}
