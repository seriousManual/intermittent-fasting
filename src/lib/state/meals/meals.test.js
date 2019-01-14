import sinon from 'sinon';
import ms from 'ms';

import { delay } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';

import reducer, {
  createMealAddAction, createMealRemoveAction
} from './data';

const uuidExp = /[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/;

describe('meal', () => {
  describe('add meal, now date', () => {
    let clock = null;
    beforeAll(() => {
      clock = sinon.useFakeTimers();
    });

    afterAll(() => clock.restore());

    it('should add a meal', () => {
      const action = createMealAddAction();
      const state = [];

      const newState = reducer(state, action);

      expect(newState).toEqual([{
        date: '1970-01-01T00:00:00.000Z',
        ident: expect.stringMatching(uuidExp),
      }]);
    });
  });

  describe('add meal, custom date', () => {
    it('should add a meal', () => {
      const action = createMealAddAction(new Date('2010-02-02'));
      const state = [];

      const newState = reducer(state, action);

      expect(newState).toEqual([{
        date: '2010-02-02T00:00:00.000Z',
        ident: expect.stringMatching(uuidExp),
      }]);
    });
  });

  describe('removeMeal', () => {
    it('should add a meal', () => {
      const action = createMealRemoveAction('b')
      const state = [{ident: 'a'}, {ident: 'b'}, {ident: 'c'}];

      const newState = reducer(state, action);

      expect(newState).toEqual([{ident: 'a'}, {ident: 'c'}]);
    });
  });
});
