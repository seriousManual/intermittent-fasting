import moment from 'moment';
import ip from 'inpairs';

export default function convertTimeRanges(dates) {
  dates = [].concat(dates);
  dates.sort((a, b) => moment(a.date).valueOf() - moment(b.date).valueOf());

  const ranges = inpairsMap(dates, (a, b) => {
    const diff = moment(b.date).diff(moment(a.date), 'hours');
    return {
      start: a.date,
      end: b.date,
      is16: diff >= 16
    };
  });

  const newRanges = ranges.reduce((carry, range) => {
    if (moment(range.start).format('DDMMYYYY') !== moment(range.end).format('DDMMYYYY')) {
      const newEnd = moment(range.start).utc().hour(23).minutes(59).seconds(59).milliseconds(999).toISOString();
      const newStart = moment(range.end).utc().hour(0).minutes(0).seconds(0).milliseconds(0).toISOString();
      carry.push({start: range.start, end: newEnd, is16: range.is16});
      carry.push({start: newStart, end: range.end, is16: range.is16});
    } else {
      carry.push(range);
    }

    return carry;
  }, []);

  return groupByDate(newRanges);
}

function groupByDate(dates) {
  const grouped = dates.reduce((carry, date) => {
    const key = moment(date.start).format('DDMMYYYY');
    
    if (!carry[key]) {
      carry[key] = [];
    }

    carry[key].push(date);

    return carry;
  }, {});

  return Object.values(grouped);
}

function inpairsReduce(list, handler, initial) {
  ip(list, (a, b) => {
    initial = handler(initial, a, b);
  });

  return initial;
}

function inpairsMap(list, handler) {
  return inpairsReduce(list, (carray, a, b) => {
    carray.push(handler(a, b));
    return carray;
  }, [])
}