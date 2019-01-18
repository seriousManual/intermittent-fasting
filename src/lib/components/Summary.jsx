import React from 'react';
import {connect} from 'react-redux';
import * as moment from 'moment';

import Rerender from './Rerender';

import {lastMeal} from '../selector';

class Summary extends React.Component {
  render() {
    return <Rerender>{() => this._render()}</Rerender>
  }

  _render() {
    if (!this.props.lastMeal) {
      return null;
    }

    const myLastMealDate = this.props.lastMeal.date;
    const lastMealFormatted = moment(myLastMealDate).calendar();
    const nextMeal = moment(myLastMealDate).add(16, 'hours');
    
    let timeToNextMeal = nextMeal.fromNow();
    let nextMealTime = todayOrWithDate(nextMeal);
    if (nextMeal.diff(moment()) < 0) {
      timeToNextMeal = 'whenever you want!';
      nextMealTime = '';
    }

    return (
      <dl>
        <dt>last meal:</dt>
        <dd>{lastMealFormatted}</dd>

        <dt>time to next meal:</dt>
        <dd>
          {timeToNextMeal}
          {nextMealTime ? <div className="sub-script">({nextMealTime})</div> : null}
        </dd>
      </dl>
    );
  }
}

function todayOrWithDate(myDate) {
  if (myDate.isSame(moment(), 'day')) {
    return myDate.format('HH:mm');
  }

  return myDate.format('DD.MM. - HH:mm');
}

export default connect(state => {
  return {lastMeal: lastMeal(state)}
})(Summary);
