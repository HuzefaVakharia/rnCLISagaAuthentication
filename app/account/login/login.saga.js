/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-lone-blocks */
/* eslint-disable comma-dangle */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
/* eslint-disable eol-last */








import AsyncStorage from '@react-native-async-storage/async-storage';
import {put, call} from 'redux-saga/effects';
import {AuthActions} from '../../actionNames';
import {authorizedGet, post} from '../../soceton';
import {ToastAndroid} from 'react-native';
import {setUser} from '../account.action';

export function* login(action) {
  alert('Action got is:' + JSON.stringify(action));
  console.log('Action got is:' + JSON.stringify(action));



/* 
This above console.log will give below given array from 'action':


Action got is:{"type":"LOGIN","payload":{"email":"huzefa147.vak@gmail.com","password":"12345678","navigation":{}}}


*/







  let auth = null;
  
  
  
  
  
  if (!action.payload.token) {
    console.log('No action.payload.token found:');
    /* 
    When we will login first time after creating new sign up, this there will be no token inside array of action, so this if condition will execute of 
    
    if(no action.payload.token){
      
      console.log('No action.payload.token found:');
      ......
      .......
      ......  
    }
    
    */
    const payload = {
      username: action.payload.email,
      password: action.payload.password,
    };
       
    /* 
    
    To understand async and await used below see this video: 
    
    https://www.youtube.com/watch?v=8yU3OVVsC7k 

    https://www.youtube.com/watch?v=1vPAIF3tfJs 

    https://stackoverflow.com/questions/47413296/can-i-use-async-await-without-then 

    https://www.youtube.com/watch?v=8yU3OVVsC7k 
    
    https://www.youtube.com/watch?v=0yOSXj-wRDs 
    
    https://www.youtube.com/watch?v=bLre6Uf4Op0 
    
    https://www.youtube.com/watch?v=lbHuwpPwfoc 
    
    */
    
    const {auth_c, error} = yield call(async function () {
      try {
          const auth_c = await post('account/login', payload);
          return ({ auth_c });
        } catch (error) {
          return ({ error });
        }
    });
    auth = auth_c;
    console.log('auth_c got is:' + JSON.stringify(auth_c));
    

    /*
    We can call above post() function which we have defined inside soceton.js using below syntax:
    const auth = yield call(post, 'account/login', payload);
    console.log('auth got is:' + JSON.stringify(auth));


    But since we have mentioned in soceton.js that post() function is an async function like this : 

    export async function post(handler, payload) {
          return axios.post(BASE_URL + handler, payload);
                                                }


    so since post() function is async function so we have to call it with await, 
     
    What is the difference between async and non async functions and what is use of setTimeOut()?

    Ref: https://www.youtube.com/watch?v=LxaXjuG_SmU  
    
    
    
    https://www.youtube.com/watch?v=rUg0Bi5uRLw   

    Synchronous =  happens after previous process gets completed,
    Asynchronous = all processes works simultaniously and in parallel time without waiting for other process or previously running process to complete. 


    await only blocks execution internal to the async function. It does not block anything outside of the function.


    Ref: https://stackoverflow.com/questions/56895695/why-do-i-need-to-await-an-async-function-when-it-is-not-supposedly-returning-a-p 
    
    */

    /* 
    How to write function inside another function:

    https://stackoverflow.com/questions/68412465/javascript-async-function-inside-another-function 
    https://stackoverflow.com/questions/10204420/define-a-function-within-another-function-in-javascript 
    
    
    
    */
    
    /* 
    Above console.log will show this data from auth_c after successfull Sign In:
    
    auth_c got is:{"data":{"token":"100a948176ea6b05005af07afb62183f906c4c9d"}.....


    Means that after executing post() user defined function we will get token for user who have sign in.  
    */



  } else {
    console.log('action.payload.token found successfully:');
    auth = {
      data: {
        token: action.payload.token,
      },
    };
  }


/* Till here programmer have written code only to get token which will be stored inside const auth   */









/* Now from below section programmer will check if he have got the required auth data from the user name and password provided by user */



  if (auth) {
    console.log('Auth is true and Token is of auth.data: ', auth.data.token);

    /* 
    Above console.log will give this :

    Auth is true and Token is of auth.data:  db0221ce35e8f2f5dc8ec9bd98884a6d151f0ff9
    
    */




    AsyncStorage.setItem('token', auth.data.token);
       
    
    
    
    
     /* If auth data will not be null after user provides the username and password then this part will be runing in which we will call 'account/detail' api which will require to retrieve the token which we have saved inside our AsyncStorge data using 'auth.data.token' for fetching all the user details based on that token value and all the user details will be passed inside const user.    */
    
    const {user, u_error} = yield call(async function () {
      try {
          const user = await authorizedGet('account/detail');
          return ({ user });
        } catch (u_error) {
          return ({ u_error });
        }
    }); 
    
    
    


    
  /* const user = yield call(authorizedGet, 'account/detail');
    console.log('User got is=====>'+JSON.stringify(user)); 
 */    
    
    
    
    if (user) {
      const response = {
        status: 'success',
        data: user.data.data,
        social_auth: user.data.social_auth,
        token: auth.data.token,
      };
      AsyncStorage.setItem('user', JSON.stringify(response.data));

      yield put(
        setUser({
          data: response.data,
          social_auth: response.social_auth,
          isLoading: false,
        }),
      );

      yield put({
        type: AuthActions.LOGIN_SUCCESS,
        payload: response,
      });

      action.payload.navigation.reset({
        index: 1,
        routes: [{name: 'Home'}],
      });

      console.log('Login success');
    } else {
      console.log('Error response');

      ToastAndroid.show('Login failed.', ToastAndroid.SHORT);
      AsyncStorage.removeItem('token');
      yield put({type: AuthActions.LOGIN_FAILED});
    }
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  } else {
    console.log('Error response');
    ToastAndroid.show('Login failed.', ToastAndroid.SHORT);
    yield put({type: AuthActions.LOGIN_FAILED});
  }
}
