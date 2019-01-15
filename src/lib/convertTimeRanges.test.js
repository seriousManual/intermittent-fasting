import convertTimeRanges from './convertTimeRanges';

describe('convertTimeRanges', () => {
  it('should create time ranges for one date', () => {
    const given = [
      {date: new Date('2010-01-10T18:00:00.000Z')},
      {date: new Date('2010-01-10T12:00:00.000Z')},
      {date: new Date('2010-01-11T11:00:00.000Z')},
      {date: new Date('2010-01-11T20:00:00.000Z')}
    ];
    const expected = [
      [
        {start: new Date('2010-01-10T12:00:00.000Z'), end: new Date('2010-01-10T18:00:00.000Z'), is16: false},
        {start: new Date('2010-01-10T18:00:00.000Z'), end: new Date('2010-01-10T23:59:59.999Z'), is16: true}
      ],
      [
        {start: new Date('2010-01-11T00:00:00.000Z'), end: new Date('2010-01-11T11:00:00.000Z'), is16: true},
        {start: new Date('2010-01-11T11:00:00.000Z'), end: new Date('2010-01-11T20:00:00.000Z'), is16: false}
      ]
    ];

    const result = convertTimeRanges(given);

    expect(result).toEqual(expected);
  })
});