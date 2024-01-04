import {ReportActions} from '../../../../actionNames';

export const initialMeals = {
  isLoading: true,
  data: {
    meals: [],
    members: [],
  },
  total: 0,
};

export function MealsReducer(state = initialMeals, action) {
  switch (action.type) {
    case ReportActions.SET_MEALS:
      return {...action.payload};
    case ReportActions.ADD_MEALS:
      let row_index = -1;
      for (let i = 0; i < state.data.meals.length; i++) {
        if (action.payload.meals[0] === state.data.meals[i][0]) {
          row_index = i;
          break;
        }
      }

      let row = [];
      for (let i = 0; i < state.data.members.length; i++) {
        row.push(row_index === -1 ? 0 : state.data.meals[row_index][i + 1]);
      }

      let members_add_flags = [];

      action.payload.members.map((m, i) => {
        let flag = false;
        state.data.members.map((member, index) => {
          if (m.account_id === member.account_id) {
            row[index] += action.payload.meals[i + 1];
            flag = true;
          }
        });
        members_add_flags.push(flag);
      });

      let members = [...state.data.members];
      let meals = [...state.data.meals];
      members_add_flags.map((flag, index) => {
        if (!flag) {
          members.push(action.payload.members[index]);
          row.push(action.payload.meals[index + 1]);
          for (let i = 0; i < meals.length; i++) {
            meals[i].push(0);
          }
        }
      });

      if (row_index === -1) {
        meals = [[action.payload.meals[0], ...row], ...meals];
      } else {
        meals[row_index] = [state.data.meals[row_index][0], ...row];
      }

      state.data.meals = meals;
      state.data.members = members;
      return {...state};
    default:
      return state;
  }
}
