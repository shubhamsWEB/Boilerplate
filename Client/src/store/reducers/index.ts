import { combineReducers } from "redux";
import subscriptions from './subscription'
import Score from "./score";

export default combineReducers({
    prevScore: Score,
    subscriptions
});
