import { createStore, applyMiddleware, combineReducers } from 'redux';
import{ thunk} from 'redux-thunk';
import itemsReducer from './itemsReducer';

const rootReducer = combineReducers({
  items: itemsReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
