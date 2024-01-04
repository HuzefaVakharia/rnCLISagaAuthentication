import {ReportsActions} from '../../actionNames';

export const initialReport = {
  isLoading: false,
  data: {},
  me: {},
};

export function ActiveReportReducer(state = initialReport, action) {
  switch (action.type) {
    case ReportsActions.SELECT_REPORT:
      return action.payload;
    default:
      return state;
  }
}
