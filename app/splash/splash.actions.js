import {SplashActions} from '../actionNames';
import {get} from '../soceton';

export const checkUpdateAction = () => {
  return async (dispatch, getState) => {
    dispatch(splash_is_loading(true));

    try {
      const res = await get('soceton/manager');
      if (res.data) {
        dispatch(check_update(res.data));
      }
      dispatch(splash_is_loading(false));
    } catch (err) {
      dispatch(splash_is_loading(false));
    }
  };
};

export const check_update = payload => {
  console.log('Check update');
  return {
    type: SplashActions.CHECK_UPDATE,
    payload: payload,
  };
};

export const splash_is_loading = payload => {
  console.log('Checking update');
  return {
    type: SplashActions.IS_LOADING,
    payload: payload,
  };
};
