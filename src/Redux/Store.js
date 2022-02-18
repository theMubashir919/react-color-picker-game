import {createStore,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
// import rootreducer from './Reducer';
import {myReducers} from './Reducers/myReducers';


const initialstate={
  currScore: 0,
  highScore: 0,
  playeHistory: '',
};

const middleware = [thunk];

const store = createStore(myReducers,initialstate,composeWithDevTools(applyMiddleware(...middleware)))

export default store;
