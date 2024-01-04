import {AuthActions} from '../../actionNames';

export function login(payload) {
  return {
    type: AuthActions.LOGIN,
    payload,
  };
  /* This login() function will return action type name 'AuthActions.LOGIN' and payload to root-saga.js file where 
  
  REMEMBER ONE THING IF OUR PROJECT CONTAINS root-saga.js or root-reducer.js file then before our action file return any action type name or data to saga file, first of all action will return action type and data to root-saga.js file where we will have takeEvery() function executing, takeEvery() function inside our Watcher function rootSaga() which will keep watching the action type provided inside it getting passed by action.js file, and once this takeEvery() function will get 'AuthActions.LOGIN', then login() generator function from login.saga.js will be called.

  So the flow of our program is like this after dispatch() function call from Login.js:
  
  login.action.js -> root-saga.js- > login.saga.js
  */
}
