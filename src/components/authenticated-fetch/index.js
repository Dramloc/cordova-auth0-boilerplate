import { h, Component } from 'preact';
import { getAuthorizationHeader } from '../../lib/auth';

export default class AuthenticatedFetch extends Component {
  state = {
    loading: true,
    data: undefined,
    error: undefined,
  };

  componentDidMount() {
    this.update();
  }

  componentDidUpdate(prevProps) {
    if (this.props.url !== prevProps.url) {
      this.update();
    }
  }

  async update() {
    const { url, options = {}, as = 'json' } = this.props;
    this.setState({ loading: true, data: undefined, error: undefined });
    try {
      const authorization = await getAuthorizationHeader();
      const response = await fetch(url, Object.assign({ headers: { authorization } }, options));
      const data = await response[as]();
      this.setState({ loading: false, data, error: null });
    } catch (error) {
      this.setState({ loading: false, data: null, error });
    }
  }

  render(props, state) {
    return props.children[0](state);
  }
}
