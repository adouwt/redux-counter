import { combineReducers } from 'redux';

import changeImg from "./changeImg";
import counter from "./counter";

export default combineReducers({
    src: changeImg,
    value: counter
})
