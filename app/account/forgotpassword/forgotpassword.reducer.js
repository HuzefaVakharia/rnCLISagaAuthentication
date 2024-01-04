import {AuthActions} from '../../actionNames';

const initialState = {isLoading: false, stage: 0};

export function ForgotPasswordReducer(state = initialState, action) {
  switch (action.type) {
    case AuthActions.SET_FORGOT_PASSWORD:
      return {...action.payload};
    case AuthActions.FORGOT_PASSWORD:
      return {...state, isLoading: true};
    case AuthActions.FORGOT_PASSWORD_SUCCESS:
      return {...state, isLoading: false, stage: 1};
    case AuthActions.FORGOT_PASSWORD_FAILED:
      return {...state, isLoading: false};
    default:
      return state;
  }
}
