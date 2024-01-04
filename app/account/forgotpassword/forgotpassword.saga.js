import {call, put} from 'redux-saga/effects';
import {AuthActions} from '../../actionNames';
import {ToastAndroid} from 'react-native';
import {post} from '../../soceton';

export function* forgotPassword(action) {
  const bodyFormData = new FormData();




/* 
The formdata object lets you compile a set of key/value pairs to send using XMLHttpRequest.In a simply term formdata provide an alternative of bundling data(object),and sending it to the server without using basic html form tag. Think of it as a way to replicate what a html form does.

*/






  bodyFormData.append('username', action.payload.email);

  const {auth, error} = yield call(function () {
    return post('account/password/forgot', bodyFormData)
      .then(auth => ({auth}))
      .catch(error => ({error}));
  });

  if (auth) {
    yield put({
      type: AuthActions.FORGOT_PASSWORD_SUCCESS,
      payload: auth,
    });
    ToastAndroid.show('Email sent!', ToastAndroid.SHORT);
  } else {
    console.log('Hi ' + error);
    yield put({type: AuthActions.FORGOT_PASSWORD_FAILED});
    ToastAndroid.show('Invalid Input!', ToastAndroid.SHORT);
  }
}
