import {ADD_SCORE,DELETE_SCORE} from '../constants'
const score = (state = [], action: any) => {
  switch (action.type) {
    case ADD_SCORE:
      return [
        ...state,
        action.payload
      ];
      case DELETE_SCORE:
        let newState = [...state];
        newState.pop(); 
      return newState;
    default:
      return state;
  }
};

export default score;
