import React from 'react';
import {connect} from 'react-redux';

import {MODE_DEFAULT, MODE_EDIT, createModeSetAction} from '../state/app/data';
import Edit from './Edit';
import Show from './Show';

function Mode({dispatch, mode}) {
  return (
    <div>
      <div>
        <button onClick={() => dispatch(createModeSetAction(MODE_DEFAULT))} disabled={mode === MODE_DEFAULT}>show</button>
        <button onClick={() => dispatch(createModeSetAction(MODE_EDIT))} disabled={mode === MODE_EDIT}>edit</button>
      </div>

      <div>
        {mode === MODE_DEFAULT ? <Show /> : null}
        {mode === MODE_EDIT ? <Edit /> : null}
      </div>
    </div>
  )
}

export default connect(state => {
  return {
    mode: state.app.mode
  };
})(Mode);