/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
/* eslint-disable eol-last */



import {AuthActions} from '../actionNames';
import {authorizedPut} from '../soceton';
import {ToastAndroid} from 'react-native';

export function updateUser(payload) {
  return async function (dispatch, getState) {
    const user = getState().activeUser;

    try {
      dispatch(
        setUser({
          ...user,
          isLoading: true,
        }),
      );
      const bodyFormData = new FormData();
      bodyFormData.append('first_name', payload.firstName);
      bodyFormData.append('last_name', payload.lastName);
      bodyFormData.append('email', payload.email);
      bodyFormData.append('username', payload.email);
      bodyFormData.append('old_password', payload.password);
      const response = await authorizedPut('account/update', bodyFormData);

      if (response) {
        dispatch(
          setUser({
            data: response.data,
            isLoading: false,
          }),
        );
        ToastAndroid.show('Update successful.', ToastAndroid.SHORT);
      }
    } catch (err) {
      ToastAndroid.show('Update failed.', ToastAndroid.SHORT);
      dispatch(
        setUser({
          ...user,
          isLoading: false,
        }),
      );
    }
  };
}

export function changePassword(payload) {
  return async function (dispatch, getState) {
    const user = getState().activeUser;

    try {
      dispatch(
        setUser({
          ...user,
          isLoading: false,
        }),
      );

      const bodyFormData = new FormData();
      bodyFormData.append('old_password', payload.password);
      bodyFormData.append('new_password', payload.newPassword);

      const response = await authorizedPut(
        'account/password/change',
        bodyFormData,
      );
      if (response) {
        dispatch(
          setUser({
            ...user,
            isLoading: false,
          }),
        );
        ToastAndroid.show('Update successful.', ToastAndroid.SHORT);
      }
    } catch (err) {
      ToastAndroid.show('Update failed.', ToastAndroid.SHORT);
      dispatch(
        setUser({
          ...user,
          isLoading: false,
        }),
      );
    }
  };
}

export const setUser = (payload) => {
  return {
    type: AuthActions.SET_USER,
    payload: payload,
  };
};

export const logout = payload => {
  return {
    type: AuthActions.LOGOUT,
    payload: payload,
  };
};
