import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import ms from 'ms';

import {meals} from '../selector';
import convertTimeRanges from '../convertTimeRanges';

class Graph extends React.Component {
  render() {
    const days = convertTimeRanges(this.props.meals);
    days.sort((a, b) => moment(b[0].start).valueOf() - moment(a[0].start).valueOf());

    return (
      <div id="graph">
        {days.map(ranges => {
          const today = moment(ranges[0].start).utc().hour(0).minutes(0).seconds(0).milliseconds(0);
          return (
            <div key={today.format()}>
              {today.format('DD.MM.YYYY')}
              <div>
                {ranges.map(range => {
                  const start = moment(range.start);
                  const end = moment(range.end);
                  const left = (100 - ((end.valueOf() - today.valueOf()) / ms('1d') * 100)) + '%';
                  const width = ((end.valueOf() - start.valueOf()) / ms('1d') * 100) + '%';

                  return <div key={start.format()} className={range.is16 ? 'hot' : ''}  style={{left, width}} />
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