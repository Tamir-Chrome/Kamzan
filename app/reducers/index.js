import { combineReducers } from 'redux';
import actList from './actList';
import personList from './personList';
import sharedItems from './sharedItems';

export default combineReducers({
  actList,
  personList,
  sharedItems,
});
