import {Language} from '../../../actionNames';
import en from './translations/en.js';

const initialState = {
  isLoading: true,
  language: 'en',
  translation: en,
};

export const languageReducer = (state = initialState, action) => {
  switch (action.type) {
    case Language.SET_LANGUAGE:
      return {...action.payload};
    default:
      return state;
  }
};
