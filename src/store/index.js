import { createStore, combineReducers } from 'redux';
import app from './App';
import product from './Products';

const rootReducer = combineReducers({
  app,
  product
});

const store = createStore(rootReducer);

export default store;