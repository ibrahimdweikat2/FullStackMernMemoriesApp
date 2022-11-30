import { combineReducers } from "redux";
import Posts from './Posts';
import auth from './auth';

export default combineReducers({Posts,auth})