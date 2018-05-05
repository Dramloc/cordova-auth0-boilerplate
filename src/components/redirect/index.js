import { route } from 'preact-router';

export default function Redirect({ path }) {
  return route(path);
}
