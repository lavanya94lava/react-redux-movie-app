import React from 'react';
import {Provider} from 'react-redux';
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

// export const StoreContext = createContext();

// console.log("StoreContext", StoreContext);


// class Provider extends React.Component{
//   render(){
//     const {store } = this.props;
//     return (
//     <StoreContext.Provider value = {store}>
//       {this.props.children}
//     </StoreContext.Provider>
//     )
//   }
// }

// const connectedAppComponent = connect(callback)(App);
// export function connect(callback){
//   return function (Component){
//     class ConnectedComponent extends React.Component{
//       constructor(props){
//         super(props);
//         this.unsubscribe = this.props.store.subscribe(() => this.forceUpdate());
//       }

//       componentWillUnmount(){
//         this.unsubscribe();
//       }
//       render(){
//         const {store} = this.props;
//         const state = store.getState();
//         const dataToBePassedAsProps = callback(state);
//         return (
//         <Component {...dataToBePassedAsProps}
//                 dispatch = {store.dispatch}
//                 />
//         )
//       }
//     }
//     class ConnectedComponentWrapper extends React.Component{
//       render(){
//         return (
//         <StoreContext.Consumer>
//           {(store) => <ConnectedComponent store = {store}/>}
//         </StoreContext.Consumer>
//         );
//       }
//     }
//     return ConnectedComponentWrapper;
//   }
// }



// console.log("before state", store.getState());

// store.dispatch({
//   type:'ADD_MOVIES',
//   movies:[{name:'Superman'}]
// });

// console.log("after state", store.getState());


ReactDOM.render(
  <Provider store = {store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
