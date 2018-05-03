import { h, Component } from 'preact';
import { Router } from 'preact-router';
import createHashHistory from 'history/createHashHistory';

import Header from './header';
import Home from '../routes/home';
import Profile from '../routes/profile';

if (module.hot) {
	require('preact/debug');
}

const history = createHashHistory();

export default function App() {
	return (
		<div id="app">
			<Header />
			<Router history={history}>
				<Home path="/" />
				<Profile path="/profile/" user="me" />
				<Profile path="/profile/:user" />
			</Router>
		</div>
	);
}
