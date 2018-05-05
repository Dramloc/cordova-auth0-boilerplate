import { h, Component } from 'preact';

export default class Fetch extends Component {
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

  update() {
    const { url, options = {}, as = 'json' } = this.props;
    this.setState({ loading: true, data: undefined, error: undefined });
    fetch(url, options)
      .then(r => r[as]())
      .then(data => this.setState({ loading: false, data, error: null }))
      .catch(error => this.setState({ loading: false, data: null, error }));
  }

  render(props, state) {
    return props.children[0](state);
  }
}
