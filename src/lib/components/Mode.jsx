import React from 'react';
import {connect} from 'react-redux';

import {MODE_DEFAULT, MODE_EDIT, createModeSetAction} from '../state/app/data';

function Mode({dispatch, mode}) {
  return (
    <div id="mode-switcher">
      <button onClick={() => dispatch(createModeSetAction(MODE_DEFAULT))} disabled={mode === MODE_DEFAULT}>show</button>
      <button onClick={() => dispatch(createModeSetAction(MODE_EDIT))} disabled={mode === MODE_EDIT}>edit</button>
    </div>
  )
}

export default connect(state => {
  return {
    mode: state.app.mode
  };
})(Mode);