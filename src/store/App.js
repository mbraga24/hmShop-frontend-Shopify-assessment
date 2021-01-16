import { LOGGED_IN } from './type';

const defaultState = {
  currentUser: null
}

const reducer = (state = defaultState, action) => {
  switch(action.type) {
    case LOGGED_IN:
      return {
        ...state, 
        currentUser: action.payload
      }
    default: 
      return state
  }
}

export default reducer; 