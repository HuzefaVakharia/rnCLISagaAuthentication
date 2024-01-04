import {ReportActions} from '../../../../actionNames';

export const initialMembers = {
  isLoading: true,
  data: [],
  report: {},
  total: 0,
};

export function MembersReducer(state = initialMembers, action) {
  switch (action.type) {
    case ReportActions.SET_MEMBERS:
      return {...action.payload};
    case ReportActions.ADD_MEMBER:
      state.data = [...state.data, action.payload];
      state.total = state.data.length;
      return {...state};
    case ReportActions.DELETE_MEMBERS:
      state.data = state.data.filter(
        (member, index) => !action.payload.includes(index),
      );
      state.total = state.data.length;
      return {...state};
    case ReportActions.UPDATE_MEMBERS:
      const new_state = [...state.data];
      action.payload.data.map(member => {
        new_state[member].position = action.payload.position;
      });
      state.data = new_state;
      state.total = new_state.length;
      return {...state};
    default:
      return state;
  }
}
