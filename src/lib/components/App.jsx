import React from 'react';
import {connect} from 'react-redux';

import Mode from './Mode';
import Show from './Show';
import Edit from './Edit';

import {MODE_DEFAULT, MODE_EDIT} from '../state/app/data';

class App extends React.Component {
  render() {
    return (
      <div>
        <Mode />
          
        <div>
          {this.props.mode === MODE_DEFAULT ? <Show /> : null}
          {this.props.mode === MODE_EDIT ? <Edit /> : null}
        </div>
      </div>
    );
  }
}

export default connect(state => {
  return {
    mode: state.app.mode
  };
})(App);