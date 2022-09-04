import { combineReducers } from 'redux';
import recordStateReducer from './recordReducer';
import modalStateReducer from './modalReducer';
import connectStateReducer from './connectReducer';

export default combineReducers({
  recordStateReducer,
  modalStateReducer,
  connectStateReducer,
});
