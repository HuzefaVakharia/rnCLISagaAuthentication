import {ReportActions} from '../../../../actionNames';
import {
  authorizedGet,
  authorizedPost,
  REQUEST_DELAY_BIG,
} from '../../../../soceton';
import {ToastAndroid} from 'react-native';

export async function createCredit(members, amount, ch_id) {
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
    let summaries = [];
    let value = 0;
    members.map((member, index) => {
      histories.push({
        credit_id: 'new_' + (ch_id + index),
        account: member.account,
        amount: amount,
        created_at: 'created_at',
      });
      summaries.push({
        account: member.account,
        amount: amount,
      });
      value += amount;
    });
    return {
      histories: histories,
      summaries: summaries,
      total: value,
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

    authorizedPost('report/' + report_id + '/credit/add', bodyFormData);
  });
}

export function addCreditAsync(credits) {
  return async (dispatch, getState) => {
    const currentCredits = getState().credits;

    try {
      dispatch(setCredits({...currentCredits, isLoading: true}));
      const report_id = getState().activeReport.data.report_id;
      addAll(report_id, credits.histories).then(() => {
        setTimeout(function () {
          dispatch(loadCredits());
          dispatch(loadCreditHistory());
        }, REQUEST_DELAY_BIG);
      });
      ToastAndroid.show('Credit Added', ToastAndroid.SHORT);
    } catch (err) {
      dispatch(setCredits({...currentCredits, isLoading: false}));
      ToastAndroid.show('Failed add credit', ToastAndroid.SHORT);
    }
  };
}

export function loadCredits() {
  return async (dispatch, getState) => {
    const currentCredits = getState().credits;
    try {
      dispatch(setCredits({...currentCredits, isLoading: true}));
      const report_id = getState().activeReport.data.report_id;

      if (report_id) {
        const response = await authorizedGet(
          'report/' + report_id + '/credit/calculation',
        );
        if (response) {
          dispatch(
            setCredits({
              isLoading: false,
              data: response.data.credits,
              report: getState().activeReport.data,
              total: response.data.total,
            }),
          );
        }
      } else {
        dispatch(setCredits({...currentCredits, isLoading: false}));
      }
    } catch (err) {
      dispatch(setCredits({...currentCredits, isLoading: false}));
      ToastAndroid.show('Failed to load credits', ToastAndroid.SHORT);
    }
  };
}

export function loadCreditHistory() {
  return async (dispatch, getState) => {
    const currentCredits = getState().credits;

    try {
      dispatch(setCreditHistory({...currentCredits, isLoading: true}));

      const report_id = getState().activeReport.data.report_id;
      const response = await authorizedGet(
        'report/' + report_id + '/credit/list',
      );
      if (response) {
        dispatch(
          setCreditHistory({
            isLoading: false,
            data: response.data,
            report: getState().activeReport.data,
          }),
        );
      }
    } catch (err) {
      dispatch(setCreditHistory({...currentCredits, isLoading: false}));
    }
  };
}

export function setCredits(payload) {
  console.log('Credit has been set...');

  return {
    type: ReportActions.SET_CREDITS,
    payload: payload,
  };
}

export function setCreditHistory(payload) {
  console.log('Credit histories has been set...');

  return {
    type: ReportActions.SET_CREDIT_HISTORIES,
    payload: payload,
  };
}

export function addCreditHistories(payload) {
  console.log('Credit histories has been added...');

  return {
    type: ReportActions.ADD_CREDIT_HISTORIES,
    payload: payload,
  };
}

export function addCredits(payload) {
  console.log('Credit has been added...');

  return {
    type: ReportActions.ADD_CREDITS,
    payload: payload,
  };
}
