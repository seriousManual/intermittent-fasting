import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import ms from 'ms';

import {meals} from '../selector';
import convertTimeRanges from '../convertTimeRanges';

class Graph extends React.Component {
  render() {
    console.log(this.props.meals)
    const days = convertTimeRanges(this.props.meals);
    console.log(days)

    return (
      <div id="graph">
        {days.map(ranges => {
          const today = moment(ranges[0].start).utc().hour(0).minutes(0).seconds(0).milliseconds(0);
          return (
            <div>
              {today.format('DD.MM.YYYY')}
              <div>
                {ranges.map(range => {
                  const start = moment(range.start);
                  const end = moment(range.end);
                  const left = (start.valueOf() - today.valueOf()) / ms('1d') * 100;
                  const width = (end.valueOf() - start.valueOf()) / ms('1d') * 100;

                  return <div className={range.is16 ? 'hot' : ''} 
                    style={{left: left + '%', width: width + '%'}}
                  />
                })}
              </div>
            </div>
          )
        })}
      </div>
    );
  }
}

export default connect(state => {
  return {meals: meals(state)}
})(Graph);