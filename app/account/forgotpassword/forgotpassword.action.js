/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
/* eslint-disable eol-last */
import {AuthActions} from '../../actionNames';
import {put} from '../../soceton';
import {ToastAndroid} from 'react-native';

export function updatePassword(payload) {
  return async function (dispatch, getState) {
    const forgotPassword = getState().forgotPassword;
    try {
      dispatch(
        setForgotPassword({
          ...forgotPassword,
          isLoading: true,
        }),
      );
      const bodyFormData = new FormData();
      bodyFormData.append('username', payload.email);
      bodyFormData.append('token', payload.token);
      if (payload.password) {
        bodyFormData.append('password', payload.password);
        bodyFormData.append('password_confirm', payload.passwordConfirm);
      }

      const response = await put('account/password/update', bodyFormData);

      if (payload.navigation) {
        ToastAndroid.show('Password has been updated.', ToastAndroid.SHORT);
        setInterval(() => {
          payload.navigation.pop();
        }, 3000);
      } else {
        ToastAndroid.show(
          'Token validated. Now, update the password.',
          ToastAndroid.SHORT,
        );
      }
      dispatch(
        setForgotPassword({
          isLoading: false,
          stage: payload.stage,
        }),
      );
    } catch (err) {
      dispatch(
        setForgotPassword({
          ...forgotPassword,
          isLoading: false,
        }),
      );
      ToastAndroid.show('Invalid Input!', ToastAndroid.SHORT);
    }
  };
}

export function setForgotPassword(payload) {
  console.log('Set Forgot Password Received this payload'+JSON.stringify(payload));
  console.log('Set Forgot Password');
  return {
    type: AuthActions.SET_FORGOT_PASSWORD,
    payload,
  };
}

export function forgotPassword(payload) {
  console.log('Forgot Password');
  return {
    type: AuthActions.FORGOT_PASSWORD,
    payload,
  };
}
