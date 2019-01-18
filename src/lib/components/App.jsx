import React from 'react';
import {connect} from 'react-redux';

import Mode from './Mode';

class App extends React.Component {
  render() {
    return (
      <div>
        <Mode />
      </div>
    );
  }
}

export default connect()(App)