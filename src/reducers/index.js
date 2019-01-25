import { combineReducers } from 'redux';
import fetchEvents from './fetchEvents';

const rootReducer = combineReducers({ fetchEvents });

export default rootReducer;
