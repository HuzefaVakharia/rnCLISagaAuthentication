import {AuthActions} from '../../actionNames';

const initialState = {userDetails: [], isLoading: false};

export function LoginReducer(state = initialState, action) {
  switch (action.type) {
    case AuthActions.LOGIN:
      return {...state, isLoading: true};
    case AuthActions.LOGIN_SUCCESS:
      return {...state, userDetails: action.payload, isLoading: false};
    case AuthActions.LOGIN_FAILED:
      return {...state, isLoading: false};
    default:
      return state;
  }
}
