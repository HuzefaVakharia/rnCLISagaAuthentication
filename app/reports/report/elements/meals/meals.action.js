import {ReportActions} from '../../../../actionNames';
import {
  authorizedGet,
  authorizedPost,
  REQUEST_DELAY_BIG,
  REQUEST_DELAY_SMALL,
} from '../../../../soceton';
import {ToastAndroid} from 'react-native';

export async function createMeals(members, amount, date) {
  amount = parseInt(amount);
  let errors = [];
  if (members.length === 0) {
    errors.push('members');
  }
  if (isNaN(amount)) {
    errors.push('amount');
  }
  if (amount > 10 || amount < -10 || amount === 0) {
    errors.push('amount');
  }
  if (date.length === 0) {
    errors.push('date');
  }

  if (errors.length === 0) {
    let row = [date];
    let total = 0;

    members.map(member => {
      row.push(amount);
      total += amount;
    });

    let histories = [];
    for (let i = 0; i < members.length; i++) {
      histories.push({
        account: members[i].account,
        identifier: date,
        amount: amount,
      });
    }

    return {
      meals: {
        members: members,
        meals: row,
      },
      histories: histories,
      total: total,
    };
  } else {
    return {
      errors: errors,
    };
  }
}

async function addAll(report_id, histories) {
  histories.map(async item => {
    const bodyFormData = new FormData();
    bodyFormData.append('account_id', item.account.account_id);
    bodyFormData.append('amount', item.amount);
    bodyFormData.append('identifier', item.identifier);

    authorizedPost('report/' + report_id + '/meal/add', bodyFormData);
  });
}

export function addMealsAsync(meals) {
  return async (dispatch, getState) => {
    const currentCredits = getState().meals;

    try {
      dispatch(setMeals({...currentCredits, isLoading: true}));
      const report_id = getState().activeReport.data.report_id;
      addAll(report_id, meals.histories).then(() => {
        setTimeout(function () {
          dispatch(loadMeals());
        }, REQUEST_DELAY_BIG);
      });
      ToastAndroid.show('Meal Added', ToastAndroid.SHORT);
    } catch (err) {
      dispatch(setMeals({...currentCredits, isLoading: false}));
      ToastAndroid.show('Failed add meal', ToastAndroid.SHORT);
    }
  };
}

export function loadMeals() {
  return async (dispatch, getState) => {
    const currentState = getState().meals;
    try {
      dispatch(setMeals({...currentState, isLoading: true}));
      const report_id = getState().activeReport.data.report_id;

      if (report_id) {
        const response = await authorizedGet(
          'report/' + report_id + '/meal/summary',
        );
        if (response) {
          dispatch(
            setMeals({
              isLoading: false,
              data: {
                meals: response.data.meals,
                members: response.data.members,
              },
              report: getState().activeReport.data,
              total: response.data.total,
            }),
          );
        }
      } else {
        dispatch(setMeals({...currentState, isLoading: false}));
      }
    } catch (err) {
      dispatch(setMeals({...currentState, isLoading: false}));
      ToastAndroid.show('Failed to load meals', ToastAndroid.SHORT);
    }
  };
}

export function setMeals(payload) {
  console.log('Meals has been set...');

  return {
    type: ReportActions.SET_MEALS,
    payload: payload,
  };
}

export function addMeals(payload) {
  console.log('Meals has been added...');

  return {
    type: ReportActions.ADD_MEALS,
    payload: payload,
  };
}
