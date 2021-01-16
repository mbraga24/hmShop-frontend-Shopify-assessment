import { SET_PRODUCTS } from './type';

const defaultState = {
  products: []
}

const reducer = (state = defaultState, action) => {
  switch(action.type) {
    case SET_PRODUCTS:
      return {
        ...state, 
        products: [...action.payload]
      }
    default: 
      return state
  }
}

export default reducer; 