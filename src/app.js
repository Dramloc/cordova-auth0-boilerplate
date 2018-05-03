import { handleAuthentication, isAuthenticated, login, logout } from './auth';

import './app.css';

export default class App {
  constructor() {
    this.state = {
      currentRoute: '/',
      routes: {
        '/': {
          id: 'loading',
          onMount() {
            if (!isAuthenticated()) {
              this.redirectTo('/home');
              return;
            }
            this.redirectTo('/login');
          },
        },
        '/login': {
          id: 'login',
          onMount(page) {
            if (isAuthenticated()) {
              this.redirectTo('/home');
              return;
            }
            const loginButton = page.querySelector('.btn-login');
            loginButton.addEventListener('click', () => login(() => this.render()));
          },
        },
        '/home': {
          id: 'profile',
          onMount(page) {
            if (!isAuthenticated()) {
              this.redirectTo('/login');
              return;
            }
            const logoutButton = page.querySelector('.btn-logout');
            logoutButton.addEventListener('click', () => logout(() => this.render()));
          },
        },
      },
    };
  }

  run(id) {
    this.container = document.getElementById(id);
    handleAuthentication(() => this.render());
    this.render();
  }

  redirectTo(route) {
    if (!this.state.routes[route]) {
      throw new Error(`Unknown route ${route}.`);
    }
    this.state.currentRoute = route;
    this.render();
  }

  render() {
    const currentRoute = this.state.routes[this.state.currentRoute];
    const currentRouteTemplate = document.getElementById(currentRoute.id);
    const element = document.importNode(currentRouteTemplate.content, true);
    this.container.innerHTML = '';
    this.container.appendChild(element);
    currentRoute.onMount.call(this, this.container);
  }
}
