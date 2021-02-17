import { combineReducers } from 'redux';
import courses from './courseReducer';
import authors from './authorReducer';
import apiCallsInProgress from './apiCallsStatusReducer';

const rootReducer = combineReducers({
    courses : courses,
    authors : authors,
    apiCallsInProgress
});

export default rootReducer;