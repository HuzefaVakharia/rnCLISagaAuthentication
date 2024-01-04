import {ReportActions} from '../../../../actionNames';
import {
  authorizedGet,
  authorizedPost,
  REQUEST_DELAY_SMALL,
} from '../../../../soceton';
import {ToastAndroid} from 'react-native';

export async function createMealShopping(members, amount, ch_id) {
  amount = parseInt(amount);
  let errors = [];
  if (members.length === 0) {
    errors.push('members');
  }
  if (isNaN(amount)) {
    errors.push('amount');
  }
  if (amount > 20000 || amount < -20000 || amount === 0) {
    errors.push('amount');
  }

  if (errors.length === 0) {
    let histories = [];
    // let summaries = [];
    let value = 0;
    members.map((member, index) => {
      histories.push({
        ch_id: 'new_' + (ch_id + index),
        account: member.account,
        amount: amount,
        created_at: 'created_at',
      });
      // summaries.push({
      //     account_id: member.account_id,
      //     amount: amount
      // });
      value += amount;
    });
    return {
      histories: histories,
      // summaries: summaries,
      value: value,
    };
  } else {
    return {
      errors: errors,
    };
  }
}

async function addAll(report_id, fixed_costs) {
  fixed_costs.map(async item => {
    const bodyFormData = new FormData();
    bodyFormData.append('account_id', item.account.account_id);
    bodyFormData.append('amount', item.amount);

    authorizedPost('report/' + report_id + '/meal-shopping/add', bodyFormData);
  });
}

export function addMealShoppingAsync(payload) {
  return async (dispatch, getState) => {
    const currentState = getState().mealShopping;

    try {
      dispatch(setMealShopping({...currentState, isLoading: true}));
      const report_id = getState().activeReport.data.report_id;
      addAll(report_id, payload.histories).then(() => {
        setTimeout(function () {
          dispatch(loadMealShopping());
          dispatch(loadMealShoppingHistory());
        }, REQUEST_DELAY_SMALL);
      });
      ToastAndroid.show('Meal Shopping Added', ToastAndroid.SHORT);
    } catch (err) {
      dispatch(setMealShopping({...currentState, isLoading: false}));
      ToastAndroid.show('Failed add meal shopping', ToastAndroid.SHORT);
    }
  };
}

export function loadMealShopping() {
  return async (dispatch, getState) => {
    const currentCredits = getState().mealShopping;
    try {
      dispatch(setMealShopping({...currentCredits, isLoading: true}));
      const report_id = getState().activeReport.data.report_id;

      if (report_id) {
        const response = await authorizedGet(
          'report/' + report_id + '/meal-shopping/summary',
        );
        if (response) {
          dispatch(
            setMealShopping({
              isLoading: false,
              data: response.data.meal_shopping,
              report: getState().activeReport.data,
              total: response.data.total,
            }),
          );
        }
      } else {
        dispatch(setMealShopping({...currentCredits, isLoading: false}));
      }
    } catch (err) {
      dispatch(setMealShopping({...currentCredits, isLoading: false}));
      ToastAndroid.show('Failed to load meal shopping', ToastAndroid.SHORT);
    }
  };
}

export function loadMealShoppingHistory() {
  return async (dispatch, getState) => {
    const currentState = getState().mealShoppingHistory;
    try {
      dispatch(setMealShoppingHistory({...currentState, isLoading: true}));
      const report_id = getState().activeReport.data.report_id;
      const response = await authorizedGet(
        'report/' + report_id + '/meal-shopping/list',
      );
      if (response) {
        dispatch(
          setMealShoppingHistory({
            isLoading: false,
            data: response.data,
            report: getState().activeReport.data,
          }),
        );
      }
    } catch (err) {
      dispatch(setMealShoppingHistory({...currentState, isLoading: false}));
    }
  };
}

export function setMealShopping(payload) {
  console.log('Meal Shopping has been set...');

  return {
    type: ReportActions.SET_MEAL_SHOPPING,
    payload: payload,
  };
}

export function addMealShopping(payload) {
  console.log('Meal Shopping has been added...');

  return {
    type: ReportActions.ADD_MEAL_SHOPPING,
    payload: payload,
  };
}

export function setMealShoppingHistory(payload) {
  console.log('Meal Shopping histories has been set...');

  return {
    type: ReportActions.SET_MEAL_SHOPPING_HISTORIES,
    payload: payload,
  };
}

export function addMealShoppingHistory(payload) {
  console.log('Meal Shopping histories has been added...');

  return {
    type: ReportActions.ADD_MEAL_SHOPPING_HISTORIES,
    payload: payload,
  };
}
