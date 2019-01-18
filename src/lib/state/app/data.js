export const MODE_EDIT = 'mode-edit';
export const MODE_DEFAULT = 'mode-default';

export const MODE_SET = 'MODE:SET';

export function createModeSetAction(mode) {
  return { type: MODE_SET, mode };
}

const defaultState = {
  mode: MODE_DEFAULT
};

export default function reducer(state = defaultState, action) {
  if (action.type === MODE_SET) {
    return {...defaultState, mode: action.mode};
  }

  return state;
}