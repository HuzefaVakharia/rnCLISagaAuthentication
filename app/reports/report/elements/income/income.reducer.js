import {ReportActions} from '../../../../actionNames';
import {getUnique} from '../../../reports.reducer';

export const initialIncome = {
  isLoading: true,
  data: {
    next: null,
    results: [],
  },
  total: 0,
};

export function IncomeReducer(state = initialIncome, action) {
  switch (action.type) {
    case ReportActions.SET_INCOME:
      return {...action.payload};
    case ReportActions.LOAD_MORE_INCOME:
      const _state = {...state};
      _state.data.next = action.payload.data.next;
      _state.data.results = [
        ..._state.data.results,
        ...action.payload.data.results,
      ];
      _state.data.results = getUnique(_state.data.results, 'id');
      _state.isLoading = action.payload.isLoading;
      return _state;
    case ReportActions.SET_TOTAL_INCOME:
      return {...state, total: action.payload.total};
    default:
      return state;
  }
}
