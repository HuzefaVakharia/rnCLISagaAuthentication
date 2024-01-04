import {ReportsActions} from '../actionNames';

export const initialState = {
  isLoading: true,
  data: {},
};

export function getUnique(arr, index) {
  return (
    arr
      .map(e => e[index])
      // store the keys of the unique objects
      .map((e, i, final) => final.indexOf(e) === i && i)
      // eliminate the dead keys & store unique objects
      .filter(e => arr[e])
      .map(e => arr[e])
  );
}

export function ReportsReducer(state = initialState, action) {
  switch (action.type) {
    case ReportsActions.LOAD_REPORT:
      return action.payload;
    case ReportsActions.LOAD_MORE_REPORT:
      const _state = {...state};
      _state.data.next = action.payload.data.next;
      _state.data.results = [
        ..._state.data.results,
        ...action.payload.data.results,
      ];
      _state.data.results = getUnique(_state.data.results, 'report_id');
      _state.isLoading = action.payload.isLoading;
      return _state;
    case ReportsActions.ADD_REPORT:
      state.data = [action.payload, ...state];
      return {...state};
    case ReportsActions.DELETE_REPORT:
      state.data = state.data.filter(
        (report, index) => index !== action.payload,
      );
      return {...state};
    default:
      return state;
  }
}
