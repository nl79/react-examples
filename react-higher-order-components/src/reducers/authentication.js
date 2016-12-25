import {CHANGE_AUTH} from '../actions/types';

const authentication = function(state = false, action) {
    switch(action.type) {
        case CHANGE_AUTH:
            return action.payload;
        break;
    }
    return state;
};
export default authentication;