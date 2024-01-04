import {loadMembers, setMembers} from './elements/members/members.action';
import {
  loadCredits,
  setCreditHistory,
  setCredits,
} from './elements/credits/credits.action';
import {
  loadFixedCosts,
  setFixedCosts,
} from './elements/fixed-costs/fixed-costs.action';
import {
  loadMealShopping,
  setMealShopping,
  setMealShoppingHistory,
} from './elements/meal-shopping/meal-shopping.action';
import {loadMeals, setMeals} from './elements/meals/meals.action';
import {initialMembers} from './elements/members/members.reducer';
import {
  initialCreditHistory,
  initialCredits,
} from './elements/credits/credits.reducer';
import {initialFixedCosts} from './elements/fixed-costs/fixed-costs.reducer';
import {
  initialMealShopping,
  initialMealShoppingHistory,
} from './elements/meal-shopping/meal-shopping.reducer';
import {initialMeals} from './elements/meals/meals.reducer';
import {loadIncome} from './elements/income/income.action';
import {loadExpenses} from './elements/expenses/expenses.action';

export function loadAllElements() {
  return function (dispatch, getState) {
    if (
      getState().activeReport.data.report_type &&
      getState().activeReport.data.report_type === 'Personal'
    ) {
      console.log('Loading personal elements');
      dispatch(loadIncome());
      dispatch(loadExpenses());
    } else {
      console.log('Loading mess elements');
      dispatch(loadMembers());
      dispatch(loadCredits());
      dispatch(loadFixedCosts());
      dispatch(loadMealShopping());
      dispatch(loadMeals());
    }
  };
}

export function initializeAllElements() {
  return function (dispatch, getState) {
    if (
      getState().activeReport.data.report_type &&
      getState().activeReport.data.report_type === 'Personal'
    ) {
      console.log('Initializing personal elements');
    } else {
      console.log('Initializing mess elements');
      dispatch(setMembers(initialMembers));
      dispatch(setCredits(initialCredits));
      dispatch(setCreditHistory(initialCreditHistory));
      dispatch(setFixedCosts(initialFixedCosts));
      dispatch(setMealShopping(initialMealShopping));
      dispatch(setMealShoppingHistory(initialMealShoppingHistory));
      dispatch(setMeals(initialMeals));
    }
  };
}
