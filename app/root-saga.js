import {all, takeEvery, take} from 'redux-saga/effects';
import {AuthActions} from './actionNames';
import {forgotPassword} from './account/forgotpassword/forgotpassword.saga';
import {signup} from './account/signup/signup.saga';
import {login} from './account/login/login.saga';



/* 
To understand how to create rootSaga() function see this video: https://www.youtube.com/watch?v=G3BDAR8zkl0&list=PLWwJRj72soFfa8PRzpXF44P-FZJYedj-E&index=12 

*/




// Redux Saga: Root Saga
export function* rootSaga() {
  yield all([
    takeEvery(AuthActions.LOGIN, login),
    
    /* Always remember this VIMP CONCEPT THAT WHEN WE WILL CALL ANY WORKER FUNCTION FROM SAGA.JS FILE LIKE HERE ABOVE WE ARE CALLING WORKER FUNCTION WHOSE NAME IS login, then ALONG WITH CALLING THIS WORKER FUNCTION login WE WILL PASS THE ACTION.TYPE NAME AND DATA WHICH IS GOT FROM ACTION.JS FILE, BUT IT IS NOT WRITTEN AS FUNCTION ARGUMENT WHILE CALLING OUR WORKER FUNCTION LIKE THIS:
    
    takeEvery(AuthActions.LOGIN, login(action)),

    BUT STILL WHEN login WATCHER FUNCTION IS CALLED FROM root-saga.js file then whatever is returned from action.js file will be sent automatically to the saga.js file.  


    
    */
    takeEvery(AuthActions.SIGNUP, signup),
    takeEvery(AuthActions.FORGOT_PASSWORD, forgotPassword),
  ]);
}
