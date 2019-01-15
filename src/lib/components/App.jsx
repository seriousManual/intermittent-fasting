import React from 'react';
import {connect} from 'react-redux';
import {FaUtensils} from 'react-icons/fa';
 
import {createSagaAddMealAction} from '../state/meals/saga';
import Summary from './Summary';
import Graph from './Graph';

class App extends React.Component {
  render() {
    const {dispatch} = this.props;
  
    return (
      <div>
        <Summary />
        <button onClick={() => dispatch(createSagaAddMealAction())}>
          <FaUtensils />
        </button>
        <Graph />
      </div>
    );
  }
}

export default connect()(App)