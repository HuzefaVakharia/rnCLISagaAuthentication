import {AuthActions} from '../../actionNames';

const initialState = {userDetails: [], isLoading: false};

export function SignUpReducer(state = initialState, action) {
  switch (action.type) {
    case AuthActions.SIGNUP:
      //return {...state, isLoading: true};
      return {...state, isLoading: false};
    case AuthActions.SIGNUP_SUCCESS:
      return {...state, userDetails: action.payload, isLoading: false};
    case AuthActions.SIGNUP_FAILED:
      return {...state, isLoading: false};

    default:
      return state;
  }
}



