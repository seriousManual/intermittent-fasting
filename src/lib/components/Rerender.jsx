import React from 'react';
import ms from 'ms';

export default class Rerender extends React.Component {
  constructor(props) {
    super(props);
    this._handle = null;

    this._rerender = this._rerender.bind(this);
  }

  componentDidMount() {
    this._scheduleRerender();
    window.addEventListener('focus', this._rerender, false);
  }

  componentWillUnmount() {
    if (this._handle) {
      clearTimeout(this._handle);
    }

    window.removeEventListener('focus', this._rerender);
  }

  _scheduleRerender() {
    const interval = ms(this.props.interval || '1m');

    this._handle = setTimeout(() => {
      this._handle = null;

      this._rerender();
      this._scheduleRerender();
    }, interval);
  }

  _rerender() {
    this.forceUpdate();
  }

  render() {
    return this.props.children();
  }
}