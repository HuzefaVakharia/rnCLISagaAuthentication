import {ReportActions} from '../../../../actionNames';
import {
  authorizedGet,
  authorizedPost,
  REQUEST_DELAY_BIG,
} from '../../../../soceton';
import {ToastAndroid} from 'react-native';

export async function createFixedCost(members, amount, costName) {
  amount = parseInt(amount);
  let errors = [];
  if (members.length === 0) {
    errors.push('members');
  }
  if (costName.length === 0) {
    errors.push('name');
  }
  if (isNaN(amount)) {
    errors.push('amount');
  }
  if (amount > 20000 || amount < -20000 || amount === 0) {
    errors.push('amount');
  }

  if (errors.length === 0) {
    let fc = [];
    let total = 0;

    members.map((member, index) => {
      fc.push({
        amount: amount,
        account: member.account,
        elements: [
          {
            title: costName,
            amount: amount,
          },
        ],
      });
      total += amount;
    });

    return {
      fixed_costs: fc,
      total: total,
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
    bodyFormData.append('name', item.elements[0].title);

    authorizedPost('report/' + report_id + '/fixed-cost/add', bodyFormData);
  });
}

export function addFixedCostAsync(payload) {
  return async (dispatch, getState) => {
    const currentState = getState().fixedCosts;

    try {
      dispatch(setFixedCosts({...currentState, isLoading: true}));
      const report_id = getState().activeReport.data.report_id;
      addAll(report_id, payload.fixed_costs).then(() => {
        setTimeout(function () {
          dispatch(loadFixedCosts());
        }, REQUEST_DELAY_BIG);
      });
      ToastAndroid.show('Fixed Cost Added', ToastAndroid.SHORT);
    } catch (err) {
      dispatch(setFixedCosts({...currentState, isLoading: false}));
      ToastAndroid.show('Failed add fixed cost', ToastAndroid.SHORT);
    }
  };
}

export function loadFixedCosts() {
  return async (dispatch, getState) => {
    const currentFixedCosts = getState().fixedCosts;
    try {
      dispatch(setFixedCosts({...currentFixedCosts, isLoading: true}));
      const report_id = getState().activeReport.data.report_id;
      if (report_id) {
        const response = await authorizedGet(
          'report/' + report_id + '/fixed-cost/summary',
        );
        if (response) {
          dispatch(
            setFixedCosts({
              isLoading: false,
              data: response.data.fixed_costs,
              report: getState().activeReport.data,
              total: response.data.total,
            }),
          );
        }
      } else {
        dispatch(setFixedCosts({...currentFixedCosts, isLoading: false}));
      }
    } catch (err) {
      dispatch(setFixedCosts({...currentFixedCosts, isLoading: false}));
      ToastAndroid.show('Failed to load fixed costs', ToastAndroid.SHORT);
    }
  };
}

export function setFixedCosts(payload) {
  console.log('Fixed Costs has been set...');

  return {
    type: ReportActions.SET_FIXED_COSTS,
    payload: payload,
  };
}

export function addFixedCosts(payload) {
  console.log('Fixed Costs has been added...');

  return {
    type: ReportActions.ADD_FIXED_COSTS,
    payload: payload,
  };
}
