import { combineReducers } from 'redux';
import actList from './actList';
import personList from './personList';

export default combineReducers({
  actList,
  personList,
});
