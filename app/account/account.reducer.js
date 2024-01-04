import {AuthActions} from '../actionNames';

export function ActiveUserReducer(state = {data: {}, isLoading: true}, action) {
  switch (action.type) {
    case AuthActions.SET_USER:
      return action.payload;
    case AuthActions.LOGOUT:
      return action.payload;
    default:
      return state;
  }
}
