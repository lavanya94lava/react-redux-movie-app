import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import { createStore,applyMiddleware } from 'redux';
import './index.css';
import App from './components/App';
import rootReducer from './reducers';


const logger = function ({dispatch, getState}){
  return function(next){
    return function(action){
      console.log("Action type ", action.type);
      next(action);
    }
  }
}

const thunk = ({dispatch, getState}) =>(next) => (action) =>{
  if(typeof action === 'function'){
    action(dispatch);
    return;
  }
  next(action);
}

const store = createStore(rootReducer,applyMiddleware(logger, thunk));

export const StoreContext = createContext();

console.log("StoreContext", StoreContext);


class Provider extends React.Component{
  render(){
    const {store } = this.props;
    return (
    <StoreContext.Provider value = {store}>
      {this.props.children}
    </StoreContext.Provider>
    )
  }
}

// console.log("before state", store.getState());

// store.dispatch({
//   type:'ADD_MOVIES',
//   movies:[{name:'Superman'}]
// });

// console.log("after state", store.getState());


ReactDOM.render(
  <Provider store = {store}>
    <App store = {store} />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
