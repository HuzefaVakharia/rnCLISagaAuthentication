/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
/* eslint-disable eol-last */

import {AuthActions} from '../../actionNames';

export default class Action {
  
  
  
  
  static signup(payload) {
  console.log('ACTION DISPATCHED22222222222222222222222222222', payload);
   
   
   
   
return {
      type: AuthActions.SIGNUP,
      payload,
    };

    /* 
When the signup(payload) action will be called in SignUp.js file using dispatch(SomeThing.signup(payload)) then due to the action type name "AuthActions.SIGNUP" the action file will not return directly anything to signup.reducer.js file, but it will return to file with name root-saga.js where takeEvery() function is written like this " takeEvery(AuthActions.SIGNUP, signup)," and since in takeEvery function there is saga generator function name "signup" is written in second argument of takeEvery() function, so the control will be sent to signup.saga.js file where generator function "export function* signup(action) {...}" is present. 



*/
  }
}
