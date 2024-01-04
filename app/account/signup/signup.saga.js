/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
/* eslint-disable eol-last */
import AsyncStorage from '@react-native-async-storage/async-storage';
import {call, put} from 'redux-saga/effects';
import {AuthActions} from '../../actionNames';
import {authorizedGet, post} from '../../soceton';
import {setUser} from '../account.action';
import {Alert, ToastAndroid} from 'react-native';




/* 

I have question that when we click on SignUp button from our UI file, the watcher function rootSaga() inside root-saga.js file will get action of 'AuthActions.SIGNUP' and so due to takeEvery() function i.e. 'takeEvery(AuthActions.SIGNUP, signup)' signup generator function of file signup.saga.js will be called and executed, but i have a question that we are not sending any argument while calling signup generator function from signup.saga.js file so how the function defination inside signup.saga.js file is getting 'action' as argument ie. export function* signup(action) {....}

So to know how to do post as this signup generator function is actually creating new entry in data base of new person, so to know how to do post operation using redux saga see this video: https://www.youtube.com/watch?v=oQga3s1e914 

*/





export function* signup(actiona) {
 
  try {
    
    const payload = {
      
      email: actiona.payload.email,
      username: actiona.payload.email,
      password: actiona.payload.password,
      password_confirm: actiona.payload.confirmPassword,
      first_name: actiona.payload.firstName,
      last_name: actiona.payload.lastName,
    };
    const auth = yield call(post, 'account/signup', payload);
    /*STEP 1: This call() function will call user defined post() function which is defined inside soceton.js file which will upload our payload data to our online server, thus our new user is registered inside server. 
    
    **************************************************************************************************************************
    **************************************************************************************************************************
    **************************************************************************************************************************
    **************************************************************************************************************************
    VIMP THING IS TO UNDERSTAND THAT THE POST() FUNCTION DEFINED INSIDE SOCETON.JS FILE REQUIRE TWO FUNCTIONAL ARGUMENTS, SEE BELOW  THE FUNCTION DEFINATION OF POST() FUNCTION FROM FILE SOCETON.JS:
    
    export async function post(handler, payload) {
           return axios.post(BASE_URL + handler, payload);
                                                  }

  BUT YOU WILL SEE THAT WE ARE NOT WRITING LIKE THIS 'const auth = yield call(post(argument1,argument2), 'account/signup', payload);' INSIDE call() BECAUSE WE CAN NOT PASS OUR ARGUMENTS LIKE THIS post(argument1,argument2) INSIDE CALL(), BUT YOU WILL SEE THAT FUNCTION post() inside soceton.js file require two arguments to execute, so REMEMBER THAT WHILE USING call() function OF REDUX, WHATEVER FUNCTION ARGUMENT WILL BE REQUIRED BY FUNCTION WHICH WE ARE CALLING USING call() function, is passed after that name of that function using comma ',' seperator like this: 
  
  call( functionNameToCall, argumentsWhichAreRequiredToByFunctionWhichIsGettingCalledByCallFunction )

  So when we will write like this: call(post, 'account/signup', payload) then the first argument of our called user defined function post() will be 'account/signup' and second argument which is required by function post() will be payload. 


    
    
    
    */
    
    
    
    
    
    //alert(JSON.stringify(actiona))

/*call() function in saga is use to call another function,just we did calling of post function which is defined inside soceton.js file

Also note that in this project we are not fetching data from API server using fetch() method inside our saga worker function, but we are using AXIOS to fetch all our api requests, and this AXIOS API calling code is present in functions written inside soceton.js file, so from saga worker file we will call another functions kept inside another file named soceton.js and that functions will call our API request using AXIOS. 

*/

console.log('auth got is:' + JSON.stringify(auth));

/* 
The above console.log will fetch after post operation inside auth variable:

auth got is:{"data":{"response":"Sign up successful.","data":{"email":"huzefahuzefa.vak@gmail.com","username":"huzefahuzefa.vak@gmail.com","token":"100a948176ea6b05005af07afb62183f906c4c9d"}},



*/

    AsyncStorage.setItem('token', auth.data.data.token);
    //alert('Token is got is:'+auth.data.data.token);

/* STEP 2:
After successfully creating new signup account the server will return a token which will be stored inside 'const auth' and then we will save this token inside Async data of our device with key name 'token' and to retrieve token value from auth we have to use . operator and get it from nested array like this 'auth.data.data.token' 

*/


/* STEP 3:
Then we will call 'authorizedGet' function which will return us all the newly created account initial details from baseURL+account/details URL, for this we will retrieve our stored token from our async storage in our device which has to be send with api call to fetch all the accounts details and whatever we will receive by this API call we will save it inside const user, 

Note that here we are not fetching all the users being registered data from server, we are just fetching the data of that user whose token number matches from the server data, so as we did in project rnCLISagaDemo where we were fetching a long json data with more than one index number and then we were retrieving some information from that full json file for each single index number by using iteration of map() inside a flatlist, here in this project we are not doing this kind of work. We are fetching only single person data using saga based on its token value matching, so the problem that we faced inside the previous project of rnCLISagaDemo where in our FlatList only one one data was getting viewed although we were able to see lots of index number data got fetched from online server but we could only see one one data in our flatlist by again calling dispatch() function by going to first screen of ProductWrapper.js and again comming to our second screen of UsersList.js, that problem is not going to be solved using this project.

See this site to solve :
https://www.c-sharpcorner.com/article/getting-started-with-redux-saga-in-react-native/

and then we will save another information related to account initial details which will be present inside 'user.data.data' inside our Async storage using setItem() 

*/




    const user = yield call(authorizedGet, 'account/detail');

    /* 
    call() function in saga is use to call another function,just we did calling of authorizedGet function which is defined inside soceton.js file


    **************************************************************************************************************************
    **************************************************************************************************************************
    **************************************************************************************************************************
    **************************************************************************************************************************
    VIMP THING IS TO UNDERSTAND THAT THE authorizedGet() FUNCTION DEFINED INSIDE SOCETON.JS FILE REQUIRE TWO FUNCTIONAL ARGUMENTS, SEE BELOW  THE FUNCTION DEFINATION OF authorizedGet() FUNCTION FROM FILE SOCETON.JS:
    
   export async function authorizedGet(handler, payload = false) {.....}




  BUT YOU WILL SEE THAT WE ARE NOT WRITING LIKE THIS 'const user = yield call(authorizedGet(argument1,argument2), 'account/detail');' INSIDE call() BECAUSE WE CAN NOT PASS OUR ARGUMENTS LIKE THIS authorizedGet(argument1,argument2) INSIDE CALL(), BUT YOU WILL SEE THAT FUNCTION authorizedGet() inside soceton.js file require two arguments to execute, so REMEMBER THAT WHILE USING call() function OF REDUX, WHATEVER FUNCTION ARGUMENT WILL BE REQUIRED BY FUNCTION WHICH WE ARE CALLING USING call() function, is passed after that name of that function using  comma i.e. ',' seperator like this: 
  
  call( functionNameToCall, argumentsWhichAreRequiredToByFunctionWhichIsGettingCalledByCallFunction )

  So when we will write like this: call(authorizedGet, 'account/detail') then the first argument of our called user defined function authorizedGet() will be 'account/detail', but since we can see that function authorizedGet() requires two function argument will calling it i.e. first argument to be passed inside variable 'handler' and second argument to be passed to variable 'payload'. But we are not passing two argument while calling authorizedGet function using call() because, we have already mentioned default value for our second argument i.e. payload which is false, so REMEMBER THIS CONCEPT THAT 
  
  IF WE HAVE WRITTEN A FUNCTION DEFINATION WITH TWO OR ANY NUMBER OF FUNCTIONAL ARGUMENTS AND WE ARE ALSO MENTIONING A DEFAULT VALUE FOR THAT FUNCTION ARGUMENTS WHILE DEFINING THAT USER DEFINED FUNCTION LIKE THIS:
  
  const myFunction(argumentOne=1,argumentTwo='Ok',argumentThree=false){......}
  
  THEN AT TIME OF CALLINE THIS myFunction() if we do not pass any argument then also we will not see any error, because we have already mentioned default value for those function arguments, and if we still pass our aruguments while calling that function i.e. 
  myFunction() then our default value which is defined while function defination will be changed or say overwritten. 
  
  So conclusion is that:

  While calling authorizedGet function using call() we can pass only one functional argument like this using comma ',' operator

  call(authorizedGet, 'account/detail'); 

  and second argument for function authorizedGet which is payload, is already passed a default value of false in function defination like this: 

  export async function authorizedGet(handler, payload = false) {.....}


  so we do not require to pass two arguments while calling  authorizedGet inside call() function. The 'account/detail' written inside  
  call(authorizedGet, 'account/detail'); will be given to variable handler of function authorizedGet because it is the first argument of authorizedGet function, and second argument of authorizedGet is having a default value of false so no need to compulsory pass any functional arguments while calling authorizedGet function.    
    */


    //alert('user info is:'+JSON.stringify(user));
    const response = {
      status: 'success',
      data: user.data.data,
      token: auth.data.data.token,
    };
    AsyncStorage.setItem('user', JSON.stringify(response.data));

   
   
   
   
   
   
   
   /* STEP 4:
   Now we will execute another event by calling put() function of saga which will initiate action of type 'AuthActions.SIGNUP_SUCCESS' and with this we will send payload data which will be 'response', so from this file signup.saga.js due to calling of put() function our app control will go to signup.reducer.js file where there is case in switch case statement like this:
   
   'case AuthActions.SIGNUP_SUCCESS:'

   and so the reducer will execute this switch case and our sent payload:response will get store in redux centralized data store array with name userDetails due to syntax 'return {...state, userDetails: action.payload, isLoading: false};'
   
   */
   
    yield put({
      type: AuthActions.SIGNUP_SUCCESS,
      payload: response,
    });




    /* 
    Then we will execute another event using put() which is defined inside setUser()
    
    */

    yield put(setUser({data: response.data, isLoading: false}));

    actiona.payload.navigation.reset({
      index: 0,
      routes: [{name: 'Home'}],
    });

    /* 
    What is navigation.reset():


    When we have came to Home screen after creating new account from Sign Up page, then if we want that from Home screen when user clicks on Back button from his/her device then again user should not be able to go to Sign Up page and all the memory from device of previous screen i.e. from stack state should be erased and the stack state memory should start Home screen after creating new account using sign in page then we will use navigation.reset() which will erase and reset the stack memory of with Home Screen as first screen on stack. So from Home screen when user will click on back button from device the app will get minimize and user will not go back to Sign Up screen.  

    See this : https://www.youtube.com/watch?v=RVWagLeH2o8 
    
    https://www.youtube.com/watch?v=d2mfr2fufvk 

    Also we have to wite 'actiona.payload.' before writing 'navigation.reset()' because in this file i.e. signup.saga.js we do not have navigation already present as props, like present in SignUp.js so, we can not write like this only 'navigation.reset()' because if we will remove 'actiona.payload.' from 'actiona.payload.navigation.reset()' we will see red line under 'navigation' keyword and when we will put our cursor on that error red line we will see error that 'navigation is not defined', so since programmer of this app is knowing that he will require to navigate from Sign Up page to Home page after creating new account in soceton app, so he have passing 'navigation' as props inside payload array like this from SignUp.js file:

    let payload = {
              email: email,
              password: password,
              confirmPassword: confirmPassword,
              navigation: navigation,
              firstName: firstName,
              lastName: lastName,
            };
    
    
    
    and passing the payload array when dispatch() function is executed like this: 
    
    dispatch(SomeThing.signup(payload))
    
    
    So this dispatch() will fist pass the payload array to signup.action.js file, and from signup.action.js file payload will be returned i.e. passed to signup.saga.js file, so to retrieve 'navigation' from payload array we will have to write like this:
    
    actiona.payload.navigation.reset()
    
    For full reference from official site visit: https://reactnavigation.org/docs/1.x/navigation-actions/#reset 
    
    The Reset action wipes the whole navigation state and replaces it with the result of several actions.
    

    Where:
    - index - number - required - Index of the active route on routes array in navigation state.
    - actions - array - required - Array of Navigation Actions that will replace the navigation state.
    - key - string or null - optional - If set, the navigator with the given key will reset. If null, the root navigator will reset.

    route=file or our UI Screen where we navigate by clicking on any button.


    */









    console.log('Signup success');
    ToastAndroid.show('Sign up successful', ToastAndroid.SHORT);
  } catch (err) {
    console.log('Error response:', err);
    yield put({type: AuthActions.SIGNUP_FAILED});
    ToastAndroid.show('Sign up failed', ToastAndroid.SHORT);
  }
}
