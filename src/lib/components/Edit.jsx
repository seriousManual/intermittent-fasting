import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import {FaTrashAlt} from 'react-icons/fa';


import {meals} from '../selector';
import {createMealAddAction, createMealRemoveAction} from '../state/meals/data'

class Edit extends React.Component {
  render() {
    const {dispatch, meals} = this.props;

    return (
      <div>
        
        
        <ul>
          {meals.map(meal => {
            return <li>{moment(meal.date).format('DD.MM. - HH:mm')} <FaTrashAlt onClick={() => dispatch(createMealRemoveAction(meal.ident))} /></li>
          })}
        </ul>
      </div>
    );
  }
}

export default connect(state => {
  return {meals: meals(state)}
})(Edit);