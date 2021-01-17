import { SET_ORDERS, ADD_ORDER } from './type';

const defaultState = {
  orders: []
}

const reducer = (state = defaultState, action) => {
  switch(action.type) {
    case SET_ORDERS:
      return {
        ...state, 
        orders: [...action.payload]
      }
    case ADD_ORDER: 
      return {
        ...state,
        orders: [...state.orders, action.payload]
      }
    default:
      return state
      
  }
}

export default reducer;