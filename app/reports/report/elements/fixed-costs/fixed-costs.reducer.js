import {ReportActions} from '../../../../actionNames';

export const initialFixedCosts = {
  isLoading: true,
  data: [],
  total: 0,
};

export function FixedCostsReducer(state = initialFixedCosts, action) {
  switch (action.type) {
    case ReportActions.SET_FIXED_COSTS:
      return {...action.payload};
    case ReportActions.ADD_FIXED_COSTS:
      let new_state = [...state];
      state.map((sfc, index) => {
        action.payload.map((afc, a_index) => {
          if (sfc.member.account_id === afc.member.account_id) {
            new_state[index].amount += afc.amount;
            new_state[index].elements = [...sfc.elements, ...afc.elements];
          }
        });
      });

      state.data = new_state;
      return {...state};
    default:
      return state;
  }
}
