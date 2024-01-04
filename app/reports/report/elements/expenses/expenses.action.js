import {
  authorizedGet,
  authorizedPost,
  authorizedPut,
  getHandler,
  REQUEST_DELAY_SMALL,
} from '../../../../soceton';
import {ReportActions} from '../../../../actionNames';
import {ToastAndroid} from 'react-native';
import {initialExpenses} from './expenses.reducer';

export async function createExpense(name, amount) {
  let errors = [];
  amount = parseInt(amount);
  if (name.length === 0) {
    name = 'Expense';
  }
  if (isNaN(amount)) {
    errors.push('amount');
  }
  if (amount > 100000 || amount < -100000 || amount === 0) {
    errors.push('amount');
  }

  if (errors.length === 0) {
    return {
      expense: {
        amount: amount,
        name: name,
      },
    };
  } else {
    return {
      errors: errors,
    };
  }
}

export function addExpense(payload) {
  return async (dispatch, getState) => {
    const currentState = getState().expenses;

    try {
      dispatch(setExpenses({...currentState, isLoading: true}));
      const report_id = getState().activeReport.data.report_id;
      const bodyFormData = new FormData();
      bodyFormData.append('name', payload.name);
      bodyFormData.append('amount', payload.amount);
      const response = await authorizedPost(
        'report/' + report_id + '/expense/add',
        bodyFormData,
      );

      if (response) {
        setTimeout(function () {
          dispatch(loadExpenses());
        }, REQUEST_DELAY_SMALL);
      }

      ToastAndroid.show('Expense Added', ToastAndroid.SHORT);
    } catch (err) {
      dispatch(setExpenses({...currentState, isLoading: false}));
      ToastAndroid.show('Failed add expense', ToastAndroid.SHORT);
      console.log('Failed add expense with this error:', err);
    }
  };
}

export function updateExpense(payload) {
  return async (dispatch, getState) => {
    const currentState = getState().expenses;

    try {
      dispatch(setExpenses({...currentState, isLoading: true}));
      const report_id = getState().activeReport.data.report_id;
      const bodyFormData = new FormData();
      bodyFormData.append('name', payload.name);
      bodyFormData.append('amount', payload.amount);
      const response = await authorizedPut(
        'report/' + report_id + '/expense/' + payload.id + '/update',
        bodyFormData,
      );

      if (response) {
        setTimeout(function () {
          dispatch(loadExpenses());
        }, REQUEST_DELAY_SMALL);
      }

      ToastAndroid.show('Expense Updated', ToastAndroid.SHORT);
    } catch (err) {
      dispatch(setExpenses({...currentState, isLoading: false}));
      console.log(err.response.data);

      ToastAndroid.show('Failed update expense', ToastAndroid.SHORT);
    }
  };
}

export function loadExpenses(url = false) {
  return async (dispatch, getState) => {
    const currentState = getState().expenses;
    try {
      dispatch(setExpenses({...currentState, isLoading: true}));
      const report_id = getState().activeReport.data.report_id;
      let handler = 'report/' + report_id + '/expense/paginate';
      if (url) {
        handler = getHandler(url);
      } else {
        dispatch(
          setExpenses({
            ...initialExpenses,
            data: {...initialExpenses.data, results: [], next: null},
          }),
        );
      }
      const response = await authorizedGet(handler);
      const summary = await authorizedGet(
        'report/' + report_id + '/expense/summary',
      );
      if (summary) {
        dispatch(setTotalExpenses(summary.data));
      }

      if (response) {
        dispatch(
          appendMoreExpenses({
            isLoading: false,
            data: response.data,
            report: getState().activeReport.data,
          }),
        );
      }
    } catch (err) {
      console.log(err);
      dispatch(setExpenses({...currentState, isLoading: false}));
      ToastAndroid.show('Failed to load expenses', ToastAndroid.SHORT);
    }
  };
}

function appendMoreExpenses(payload) {
  console.log('Expenses has been set...');

  return {
    type: ReportActions.LOAD_MORE_EXPENSE,
    payload: payload,
  };
}

export function setExpenses(payload) {
  console.log('Expenses has been set...');

  return {
    type: ReportActions.SET_EXPENSES,
    payload: payload,
  };
}

function setTotalExpenses(payload) {
  console.log('Expenses total has been set...');

  return {
    type: ReportActions.SET_EXPENSE_TOTAL,
    payload: payload,
  };
}
