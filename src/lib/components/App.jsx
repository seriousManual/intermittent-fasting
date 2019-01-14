import React from 'react';
import {connect} from 'react-redux';
import {FaUtensils} from 'react-icons/fa';
 
import 'react-week-calendar/dist/style.css';

import {createMealAddAction} from '../state/meals/data';
import Summary from './Summary';

class App extends React.Component {
  render() {
    const {dispatch} = this.props;
  
    return (
      <div>
        <Summary />
        <button onClick={() => dispatch(createMealAddAction())}>
          <FaUtensils />
        </button>
      </div>
    );
  }
}

export default connect()(App)