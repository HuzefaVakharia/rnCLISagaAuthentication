import {ReportActions} from '../../../../actionNames';

export const initialCredits = {
  isLoading: true,
  data: [],
  report: {},
  total: 0,
};

export const initialCreditHistory = {
  isLoading: true,
  data: [],
  report: {},
};

export function CreditsReducer(state = initialCredits, action) {
  switch (action.type) {
    case ReportActions.SET_CREDITS:
      return {...action.payload};
    case ReportActions.ADD_CREDITS:
      let new_state = [...state.data];
      state.data.map((credits, c_index) => {
        action.payload.map((_credits, index) => {
          if (_credits.account_id === credits.account.account_id) {
            new_state[c_index].total_credit =
              _credits.amount + credits.total_credit;
          }
        });
      });
      state.data = new_state;
      return {...state};
    default:
      return state;
  }
}

export function CreditHistoryReducer(state = initialCreditHistory, action) {
  switch (action.type) {
    case ReportActions.SET_CREDIT_HISTORIES:
      return {...action.payload};
    case ReportActions.ADD_CREDIT_HISTORIES:
      state.data = [...action.payload, ...state.data];
      return {...state};
    default:
      return state;
  }
}
