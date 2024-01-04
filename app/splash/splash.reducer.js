import {SplashActions} from '../actionNames';

export const initialState = {
  isLoading: true,
  manager: {},
};

export function SplashReducer(state = initialState, action) {
  switch (action.type) {
    case SplashActions.CHECK_UPDATE:
      return {...state, manager: action.payload};
    case SplashActions.IS_LOADING:
      return {...state, isLoading: action.payload};
    default:
      return state;
  }
}
