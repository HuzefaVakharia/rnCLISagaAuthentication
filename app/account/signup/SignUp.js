/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
/* eslint-disable eol-last */











import React, {useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  ToastAndroid,
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import globalStyle from '../../style';
import {Appbar, Button, TextInput, useTheme} from 'react-native-paper';
//import SignUpAction from './signup.action';

import SomeThing from './signup.action';



import {Icon} from 'react-native-elements';
import {Logo} from '../../splash/components';

const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

function SignUp({navigation, route}) {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState(route.params.email);
  const [password, setPassword] = useState(route.params.password);
  const [confirmPassword, setConfirmPassword] = useState('');
  console.log(route.params.email, email);

  const [hidden, setHidden] = useState(true);
  const [hidden2, setHidden2] = useState(true);

  //const isLoading = useSelector(state => state.signup22.isLoading);
  

/* 
 Since in this project (rnCLISagaAuthentication or soceton app) where store file used createStore() function which is deprecated now and latest function option for createStore() function usage which is configureStore() function is not used, so the syntax of using useSelector() hook will be:
 
const xyzName=useSelector(state=>state.keyNameOfCombineReducerFromRootReducerFile)

Example : const isLoading = useSelector(state => state.signup22)

where our combineReducer() function inside root-reducer.js is written like this as shown below:

const rootReducers = combineReducers({
  forgotPassword: ForgotPasswordReducer,
  login: LoginReducer,
  signup22: SignUpReducer,
  language: languageReducer,

  activeReport: ActiveReportReducer,
  activeUser: ActiveUserReducer,

  reports: ReportsReducer,

  members: MembersReducer,
  credits: CreditsReducer,
  creditsHistory: CreditHistoryReducer,
  fixedCosts: FixedCostsReducer,
  mealShopping: MealShoppingReducer,
  mealShoppingHistory: MealShoppingHistoryReducer,
  meals: MealsReducer,

  income: IncomeReducer,
  expenses: ExpenseReducer,

  splash: SplashReducer,
});








OR THE SECOND SYNTAX OF USESELCTOR CAN ALSO BE LIKE THIS:

const xyzName=useSelector(state=>state.keyNameOfCombineReducerFromRootReducerFile.keyNameOfReducerInitialValueFromReducerFile)

Example: const isLoading = useSelector(state => state.signup22.isLoading);

Where our combineReducer() function inside root-reducer.js is written like this as shown below:

const rootReducers = combineReducers({
  forgotPassword: ForgotPasswordReducer,
  login: LoginReducer,
  signup22: SignUpReducer,
  language: languageReducer,

  activeReport: ActiveReportReducer,
  activeUser: ActiveUserReducer,

  reports: ReportsReducer,

  members: MembersReducer,
  credits: CreditsReducer,
  creditsHistory: CreditHistoryReducer,
  fixedCosts: FixedCostsReducer,
  mealShopping: MealShoppingReducer,
  mealShoppingHistory: MealShoppingHistoryReducer,
  meals: MealsReducer,

  income: IncomeReducer,
  expenses: ExpenseReducer,

  splash: SplashReducer,
});


And our InitialState array inside our signup.reducer.js is written like this:

const initialState = {userDetails: [], isLoading: false};




But when we have used configureStore() function which is recommanded and also latest function inside our store.js file like we done in our first project with name rnCLIReduxSagaDemo then the syntax of useSelector() hook will be like this:

const xyzName=useSelector((state)=>state.keyNameofconfigureStoreFunctionInsideStoreFile)

Example: const userList=useSelector((state)=>state.reducer);

The code for configureStore() Function Inside Store File is as shown below:

import { configureStore } from "@reduxjs/toolkit";
import rootReducerForHoldingMultipleReducers from "./rootReducerForHoldingMultipleReducers";
import createMySagaMiddleware_ourChoiceForThisName from 'redux-saga';
import SagaData from "./saga";




const sagaMiddleware=createMySagaMiddleware_ourChoiceForThisName();


const myStore=configureStore({
------>>>>>>>>  reducer:rootReducerForHoldingMultipleReducers,
    middleware:()=>[sagaMiddleware]
});
sagaMiddleware.run(SagaData);
export default myStore;


*/





  const isLoading = useSelector(state => state.signup22);
  /* General syntax of useSelector() hook for fetching data from our store is:
  
  useSelector(state=>state.KEY_NAME_WHICH_WE_HAVE_COMBINED_WITH_OUR_REDUCER_FILE_NAME_IN_ROOT_REDUCER_FILE.(OPTIONAL THING)NAME_OF_PARTICULAR_DATA_LIKE_ISLOADING_WHICH_IS_BEING_RETURENED_BY_REDUCER)*/

/* 
We can also fetch redux maintained data by using this syntax "const isLoading = useSelector(state => state.signup22);" in which we will not specify .isLoading, and if we fetch data from our redux system without using specific name of attribute which we want to fetch we will get a raw formate data from our redux system which we can see by puting inside JSON stringify using "alert('signup22 data is:'+JSON.stringify(isLoading));" but when we want to fetch particular attribute from our redux data we will using this below syntax:

"const isLoading = useSelector(state => state.signup22.isLoading);" which will only fetch single attribute value of isLoading from our redux data

The isLoading attribute for our redux data has to be declared inside our reducer file as we have done in our signup.reducer.js file like this:

const initialState = {userDetails: [], isLoading: false};


As we can see we are not fetching data from array of userDetails but we are fetching data from key isLoading which we have used inside initialState={} array.

*/




  /* useEffect(()=>{
   alert('signup22 data is:'+JSON.stringify(isLoading));
  },[isLoading]); */

  
  
  
  
  
  
  
  
  
  
  
  /* The signup22 word inside 'useSelector(state => state.signup22.isLoading);' is written inside root-reducer.js file inside
  combineReducers() section 
  
  
  SignUpReducer which is the main function of file signup.reducer.js is passed as the value to a key inside the combineReducers() function defination in root-reducers.js file like this :

  const rootReducers = combineReducers({
  forgotPassword: ForgotPasswordReducer,
  login: LoginReducer,
  
  
  ->>>>>>>signup22: SignUpReducer,
  
  
  
  language: languageReducer,

  activeReport: ActiveReportReducer,
  activeUser: ActiveUserReducer,

  reports: ReportsReducer,

  members: MembersReducer,
  credits: CreditsReducer,
  creditsHistory: CreditHistoryReducer,
  fixedCosts: FixedCostsReducer,
  mealShopping: MealShoppingReducer,
  mealShoppingHistory: MealShoppingHistoryReducer,
  meals: MealsReducer,

  income: IncomeReducer,
  expenses: ExpenseReducer,

  splash: SplashReducer,
});
  

So to fetch data which is being returned from this reducer function i.e. SignUpReducer which is the main function of file signup.reducer.js we have to first use . operator to indication key for that reducer file and the key name is signup22 

  
  */

  //Ref this site to know how to handle ActivityIndicator loader to maintain true or false using redux.
  //https://www.appsloveworld.com/react-native/100/23/how-to-show-and-hide-activityindicator-from-actions-in-react-native-redux 




  



/* 

useSelector() is use to display the current data after fetching it which is mentained by redux centrally. 

*/




  const {colors} = useTheme();

  const signUpButton = () => {
    if (email && password && firstName && lastName && confirmPassword) {
      if (emailRegex.test(email)) {
        if (password === confirmPassword) {
          {
            let payload = {
              email: email,
              password: password,
              confirmPassword: confirmPassword,
              navigation: navigation,
              firstName: firstName,
              lastName: lastName,
            };
            //dispatch(SignUpAction.signup(payload));

            dispatch(SomeThing.signup(payload));

            /* 
            This above dispatch(SomeThing.signup(payload)) will first transfer our app control to signup.action.js file where       'static signup(payload) {..}' is defined and so dispatch() will call this action function, from the signup.action.js file control of our app will go to root-saga.js file where 'AuthActions.SIGNUP' is written inside takeEvery() and so our saga worker function export function* signup(actiona){...} will be executed. And i think that since this information of email, password etc which we want to upload to our server using saga api call is comming via action file from syntax 

            return {
            type: AuthActions.SIGNUP,
            payload,
                  };

                  we have to access our data by using argument in worker function defination like this :
                  export function* signup(actiona) {....} 
                  
                  and fetch each single data using:

                  'action.payload.email' 

                  But you will say that we did not required any argument while writting worker function in project of rnCLISagaDemo, it is because as in the project of rnCLISagaDemo when we were calling saga file to fetch api data, then we were not sending any data to the worker file of saga and so we just describe our worker file in that project without any argument, for example, see the worker function from rnCLISagaDemo project. 

                  function* userList(){.....}



            
            */
          }
        } else {
          ToastAndroid.show('Passwords do not match', ToastAndroid.SHORT);
        }
      } else {
        ToastAndroid.show('Please enter validate email', ToastAndroid.SHORT);
      }
    } else {
      ToastAndroid.show('Please fill all fields', ToastAndroid.SHORT);
    }
  };
  return (
    <SafeAreaView
      style={{...globalStyle.container, ...StyleSheet.absoluteFill}}>
      
      
      {/* Below starts screen header part which is section of top tab bar navigation */}
      
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.pop()} />
        <Appbar.Content title={'Sign Up'} />
      </Appbar.Header>
      
      {/* Below ends screen header part which is section of top tab bar navigation */}
      
      
      
      
      
      
      
      
      {/* Actual code of signup ui starts from below part */}
      
      <ScrollView>
        <Logo containerStyle={{marginTop: '10%', marginBottom: '5%'}} />
        <View style={globalStyle.form_container}>
          <TextInput
            onChangeText={value => {
              setFirstName(value);
            }}
            label="First Name"
            style={globalStyle.mb5}
            right={
              <TextInput.Icon
                name={() => (
                  <Icon color={colors.inputIcon} name={'person'} size={24} />
                )}
              />
            }
            autoCapitalize={'none'}
            //onFocus={false}
          />

          <TextInput
            onChangeText={value => {
              setLastName(value);
            }}
            label="Last Name"
            style={globalStyle.mb5}
            right={
              <TextInput.Icon
                name={() => (
                  <Icon color={colors.inputIcon} name={'person'} size={24} />
                )}
              />
            }
            autoCapitalize={'none'}
            //onFocus={false}
          />

          <TextInput
            onChangeText={value => {
              setEmail(value);
            }}
            value={email}
            label="Email"
            keyboardType="email-address"
            style={globalStyle.mb5}
            right={
              <TextInput.Icon
                name={() => (
                  <Icon color={colors.inputIcon} name={'mail'} size={24} />
                )}
              />
            }
            autoCapitalize={'none'}
          />

          <TextInput
            onChangeText={value => {
              setPassword(value);
            }}
            value={password}
            secureTextEntry={hidden}
            label="Password"
            style={globalStyle.mb5}
            right={
              <TextInput.Icon
                name={() => (
                  <Icon
                    color={colors.inputIcon}
                    name={hidden ? 'visibility-off' : 'visibility'}
                    size={24}
                  />
                )}
                onPress={() => setHidden(!hidden)}
              />
            }
            autoCapitalize={'none'}
          />

          <TextInput
            onChangeText={value => {
              setConfirmPassword(value);
            }}
            secureTextEntry={hidden2}
            label="Confirm Password"
            style={globalStyle.mb5}
            right={
              <TextInput.Icon
                name={() => (
                  <Icon
                    color={colors.inputIcon}
                    name={hidden2 ? 'visibility-off' : 'visibility'}
                    size={24}
                  />
                )}
                onPress={() => setHidden2(!hidden2)}
              />
            }
            autoCapitalize={'none'}
          />

          <Button
            mode={'contained'}
            contentStyle={globalStyle.big_button}
            loading={isLoading}
            onPress={() => {
              signUpButton();
            }}>
            Sign Up
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default SignUp;
