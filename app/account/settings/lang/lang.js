import {Language} from '../../../actionNames';
import {ToastAndroid} from 'react-native';
import en from './translations/en.js';
import bn from './translations/bn.js';

const translations = {
  en,
  bn,
};

export const changeLanguage = (language, toast = true) => {
  return async (dispatch, getState) => {
    const lan = getState().language;
    try {
      dispatch(
        setLanguage({
          ...lan,
          isLoading: true,
        }),
      );

      dispatch(
        setLanguage({
          isLoading: false,
          language: language,
          translation: {...translations[language]},
        }),
      );
      if (toast) {
        ToastAndroid.show('Changed language', ToastAndroid.SHORT);
      }
    } catch (err) {
      dispatch(
        setLanguage({
          ...lan,
          isLoading: false,
        }),
      );
      if (toast) {
        ToastAndroid.show('Failed changing language', ToastAndroid.SHORT);
      }
    }
  };
};

export function setLanguage(payload) {
  return {
    type: Language.SET_LANGUAGE,
    payload: payload,
  };
}
