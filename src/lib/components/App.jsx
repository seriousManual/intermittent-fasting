import React from 'react';
import {connect} from 'react-redux';
import {FaUtensils} from 'react-icons/fa';
 
import 'react-week-calendar/dist/style.css';

import {createSagaAddMealAction} from '../state/meals/saga';
import Summary from './Summary';

class App extends React.Component {
  render() {
    const {dispatch} = this.props;
  
    return (
      <div>
        <Summary />
        <button onClick={() => dispatch(createSagaAddMealAction())}>
          <FaUtensils />
        </button>
      </div>
    );
  }
}

export default connect()(App)