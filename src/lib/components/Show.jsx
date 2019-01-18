import React from 'react';
import {connect} from 'react-redux';

import {createSagaAddMealAction} from '../state/meals/saga';
import Summary from './Summary';
import Graph from './Graph';
import {FaUtensils} from 'react-icons/fa';

function Show({dispatch}) {
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

export default connect()(Show);