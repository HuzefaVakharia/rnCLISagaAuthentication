import {ReportActions} from '../../../../actionNames';
import {
  authorizedGet,
  authorizedPost,
  authorizedPut,
  REQUEST_DELAY_SMALL,
} from '../../../../soceton';
import {ToastAndroid} from 'react-native';

const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export async function createMember(email, type, member_id) {
  if (emailRegex.test(email)) {
    let name = email.split('@')[0];
    name = name.charAt(0).toUpperCase() + name.slice(1);
    return {
      member: {
        account_id: 'new_' + member_id,
        first_name: name,
        last_name: name,
        email: email,
        position: type,
        avatar_text: name.charAt(0) + name.charAt(0),
      },
    };
  } else {
    return {
      errors: ['email'],
    };
  }
}

export const loadMembers = () => {
  return async (dispatch, getState) => {
    const currentMembers = getState().members;
    try {
      dispatch(setMembers({...currentMembers, isLoading: true}));
      const report_id = getState().activeReport.data.report_id;

      if (report_id) {
        const response = await authorizedGet(
          'report/' + report_id + '/member/list',
        );
        if (response) {
          dispatch(
            setMembers({
              isLoading: false,
              data: response.data.members,
              report: getState().activeReport.data,
              total: response.data.total,
            }),
          );
        }
      } else {
        console.log('failed');
        dispatch(setMembers({...currentMembers, isLoading: false}));
      }
    } catch (err) {
      dispatch(setMembers({...currentMembers, isLoading: false}));
      ToastAndroid.show('Failed to load members', ToastAndroid.SHORT);
    }
  };
};

export function addMemberAsync(payload) {
  return async (dispatch, getState) => {
    const currentState = getState().members;

    try {
      dispatch(setMembers({...currentState, isLoading: true}));
      const report_id = getState().activeReport.data.report_id;
      const bodyFormData = new FormData();
      bodyFormData.append('username', payload.member.email);
      bodyFormData.append('position', payload.member.position);

      const response = await authorizedPost(
        'report/' + report_id + '/member/add',
        bodyFormData,
      );
      if (response) {
        setTimeout(function () {
          dispatch(loadMembers());
        }, REQUEST_DELAY_SMALL);
      }
      ToastAndroid.show('Member Added', ToastAndroid.SHORT);
    } catch (err) {
      dispatch(setMembers({...currentState, isLoading: false}));
      ToastAndroid.show('Failed add member', ToastAndroid.SHORT);
    }
  };
}

async function updateAll(report_id, payload, members) {
  payload.members.map(member => {
    const bodyFormData = new FormData();
    bodyFormData.append('position', payload.position);
    authorizedPut(
      'report/' +
        report_id +
        '/member/' +
        members[member].account.account_id +
        '/update',
      bodyFormData,
    );
  });
}

export function updateMembersAsync(payload) {
  return async (dispatch, getState) => {
    const currentState = getState().members;

    try {
      dispatch(setMembers({...currentState, isLoading: true}));
      const report_id = getState().activeReport.data.report_id;
      updateAll(report_id, payload, currentState.data).then(() => {
        setTimeout(function () {
          dispatch(loadMembers());
        }, REQUEST_DELAY_SMALL);
      });
      ToastAndroid.show('Updated member', ToastAndroid.SHORT);
    } catch (err) {
      dispatch(setMembers({...currentState, isLoading: false}));
      ToastAndroid.show('Failed update member', ToastAndroid.SHORT);
    }
  };
}

export function setMembers(payload) {
  console.log('Members has been set...');

  return {
    type: ReportActions.SET_MEMBERS,
    payload: payload,
  };
}

export function addMember(payload) {
  console.log('Members has been added...');

  return {
    type: ReportActions.ADD_MEMBER,
    payload: payload,
  };
}

export function deleteMembers(payload) {
  console.log('Deleting member...');

  return {
    type: ReportActions.DELETE_MEMBERS,
    payload: payload,
  };
}

export function updateMembers(payload) {
  console.log('Updating member...');

  return {
    type: ReportActions.UPDATE_MEMBERS,
    payload: payload,
  };
}
