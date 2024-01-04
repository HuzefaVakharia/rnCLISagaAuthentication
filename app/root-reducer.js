import {combineReducers} from 'redux';
import {ReportsReducer} from './reports/reports.reducer';
import {ActiveReportReducer} from './reports/report/report.reducer';
import {LoginReducer} from './account/login/login.reducer';
import {SignUpReducer} from './account/signup/signup.reducer';
import {ForgotPasswordReducer} from './account/forgotpassword/forgotpassword.reducer';
import {ActiveUserReducer} from './account/account.reducer';
import {
  CreditHistoryReducer,
  CreditsReducer,
} from './reports/report/elements/credits/credits.reducer';
import {MembersReducer} from './reports/report/elements/members/members.reducer';
import {
  MealShoppingHistoryReducer,
  MealShoppingReducer,
} from './reports/report/elements/meal-shopping/meal-shopping.reducer';
import {FixedCostsReducer} from './reports/report/elements/fixed-costs/fixed-costs.reducer';
import {MealsReducer} from './reports/report/elements/meals/meals.reducer';
import {languageReducer} from './account/settings/lang/lang.reducer';
import {IncomeReducer} from './reports/report/elements/income/income.reducer';
import {ExpenseReducer} from './reports/report/elements/expenses/expenses.reducer';
import {SplashReducer} from './splash/splash.reducer';

const rootReducers = combineReducers({
  forgotPassword: ForgotPasswordReducer,
  login: LoginReducer,
  signup22: SignUpReducer,
  language: languageReducer,

  activeReport: ActiveReportReducer,
  activeUser: ActiveUserReducer,

  reports: ReportsReducer,

  members: MembersReducer,
  credits: CreditsReducer,
  creditsHistory: CreditHistoryReducer,
  fixedCosts: FixedCostsReducer,
  mealShopping: MealShoppingReducer,
  mealShoppingHistory: MealShoppingHistoryReducer,
  meals: MealsReducer,

  income: IncomeReducer,
  expenses: ExpenseReducer,

  splash: SplashReducer,
});

export const whitelist = [
  'activeReport',
  'activeUser',
  'language',

  'reports',

  'members',
  'credits',
  'creditsHistory',
  'fixedCosts',
  'mealShopping',
  'mealShoppingHistory',
  'meals',

  'income',
  'expenses',
];

export default rootReducers;
