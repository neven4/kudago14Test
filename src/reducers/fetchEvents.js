import { GET_EVENTS } from '../actions/actionTypes';

const getDiscover = (state = [], action) => {
  switch(action.type) {
    case GET_EVENTS:
      return [
        ...state,
        ...action.payload
      ];
    default:
      return state;
  }
}

export default getDiscover;
