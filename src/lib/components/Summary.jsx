import React from 'react';
import {connect} from 'react-redux';
import * as moment from 'moment';
import ms from 'ms';

import {lastMeal} from '../selector';

class Summary extends React.Component {
  componentDidMount() {
    this.scheduleRerender();
  }

  scheduleRerender() {
    setTimeout(() => {
      this.forceUpdate();
      this.scheduleRerender();
    }, ms('1m'));
  }

  render() {
    const lastMealFormatted = moment(lastMeal.date).calendar();
    const nextMeal = moment(lastMeal.date).add(16, 'hours');
    
    let timeToNextMeal = nextMeal.fromNow();
    if (nextMeal.diff(moment()) < 0) {
      timeToNextMeal = 'whenever you want!';
    }

    return (
      <dl>
        <dt>last meal:</dt>
        <dd>{lastMealFormatted}</dd>

        <dt>time to next meal:</dt>
        <dd>
          {timeToNextMeal}
          <div className="sub-script">({todayOrWithDate(nextMeal)})</div>
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