import {ReportActions} from '../../../../actionNames';

export const initialMealShopping = {
  isLoading: true,
  data: [],
  total: 0,
};

export const initialMealShoppingHistory = {
  isLoading: true,
  data: [],
};

export function MealShoppingReducer(state = initialMealShopping, action) {
  switch (action.type) {
    case ReportActions.SET_MEAL_SHOPPING:
      return {...action.payload};
    case ReportActions.ADD_MEAL_SHOPPING:
      let new_state = [...state];
      state.map((meal_shopping, c_index) => {
        action.payload.map((_meal_shopping, index) => {
          if (_meal_shopping.account_id === meal_shopping.member.account_id) {
            new_state[c_index].amount =
              _meal_shopping.amount + meal_shopping.amount;
          }
        });
      });
      state.data = new_state;
      return {...state};
    default:
      return state;
  }
}

export function MealShoppingHistoryReducer(
  state = initialMealShoppingHistory,
  action,
) {
  switch (action.type) {
    case ReportActions.SET_MEAL_SHOPPING_HISTORIES:
      return {...action.payload};
    case ReportActions.ADD_MEAL_SHOPPING_HISTORIES:
      state.data = [...action.payload, ...state];
      return {...state};
    default:
      return state;
  }
}
