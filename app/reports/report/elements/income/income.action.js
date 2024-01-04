import {
  authorizedGet,
  authorizedPost,
  authorizedPut,
  getHandler,
  REQUEST_DELAY_SMALL,
} from '../../../../soceton';
import {ToastAndroid} from 'react-native';
import {ReportActions} from '../../../../actionNames';
import {initialIncome} from './income.reducer';

export async function createIncome(name, amount) {
  let errors = [];
  amount = parseInt(amount);
  if (name.length === 0) {
    name = 'Income';
  }
  if (isNaN(amount)) {
    errors.push('amount');
  }
  if (amount > 100000 || amount < -100000 || amount === 0) {
    errors.push('amount');
  }

  if (errors.length === 0) {
    return {
      income: {
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

export function addIncome(payload) {
  return async (dispatch, getState) => {
    const currentState = getState().income;

    try {
      dispatch(setIncome({...currentState, isLoading: true}));
      const report_id = getState().activeReport.data.report_id;
      const bodyFormData = new FormData();
      bodyFormData.append('name', payload.name);
      bodyFormData.append('amount', payload.amount);
      const response = await authorizedPost(
        'report/' + report_id + '/income/add',
        bodyFormData,
      );

      if (response) {
        setTimeout(function () {
          dispatch(loadIncome());
        }, REQUEST_DELAY_SMALL);
      }

      ToastAndroid.show('Income Added', ToastAndroid.SHORT);
    } catch (err) {
      dispatch(setIncome({...currentState, isLoading: false}));
      ToastAndroid.show('Failed add income', ToastAndroid.SHORT);
    }
  };
}

export function updateIncome(payload) {
  return async (dispatch, getState) => {
    const currentState = getState().income;

    try {
      dispatch(setIncome({...currentState, isLoading: true}));
      const report_id = getState().activeReport.data.report_id;
      const bodyFormData = new FormData();
      bodyFormData.append('name', payload.name);
      bodyFormData.append('amount', payload.amount);
      const response = await authorizedPut(
        'report/' + report_id + '/income/' + payload.id + '/update',
        bodyFormData,
      );

      if (response) {
        setTimeout(function () {
          dispatch(loadIncome());
        }, REQUEST_DELAY_SMALL);
      }

      ToastAndroid.show('Income Updated', ToastAndroid.SHORT);
    } catch (err) {
      dispatch(setIncome({...currentState, isLoading: false}));
      ToastAndroid.show('Failed update income', ToastAndroid.SHORT);
    }
  };
}

export function loadIncome(url) {
  return async (dispatch, getState) => {
    const currentState = getState().income;
    try {
      dispatch(setIncome({...currentState, isLoading: true}));
      const report_id = getState().activeReport.data.report_id;
      let handler = 'report/' + report_id + '/income/paginate';
      if (url) {
        handler = getHandler(url);
      } else {
        dispatch(
          setIncome({
            ...initialIncome,
            data: {...initialIncome.data, results: [], next: null},
          }),
        );
      }
      const response = await authorizedGet(handler);
      const summary = await authorizedGet(
        'report/' + report_id + '/income/summary',
      );
      if (summary) {
        dispatch(setTotalIncome(summary.data));
      }

      if (response) {
        dispatch(
          appendMoreIncome({
            isLoading: false,
            data: response.data,
            report: getState().activeReport.data,
          }),
        );
      }
    } catch (err) {
      console.log(err);
      dispatch(setIncome({...currentState, isLoading: false}));
      ToastAndroid.show('Failed to load income', ToastAndroid.SHORT);
    }
  };
}

function appendMoreIncome(payload) {
  console.log('Income has been set...');

  return {
    type: ReportActions.LOAD_MORE_INCOME,
    payload: payload,
  };
}

export function setIncome(payload) {
  console.log('Income has been set...');

  return {
    type: ReportActions.SET_INCOME,
    payload: payload,
  };
}

function setTotalIncome(payload) {
  console.log('Income total has been set...');

  return {
    type: ReportActions.SET_TOTAL_INCOME,
    payload: payload,
  };
}
