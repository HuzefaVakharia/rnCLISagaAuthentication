import {ReportsActions} from '../actionNames';
import {
  authorizedDelete,
  authorizedGet,
  authorizedPost,
  authorizedPut,
  getHandler,
  REQUEST_DELAY_SMALL,
} from '../soceton';
import {initializeAllElements, loadAllElements} from './report/report.action';
import {ToastAndroid} from 'react-native';
import {initialReport} from './report/report.reducer';

export const createReport = async (id, name, report_type) => {
  let errors = [];
  if (name.length === 0) {
    errors.push('name');
  }
  if (report_type === 'null') {
    errors.push('type');
  }

  if (errors.length === 0) {
    return {
      report: {
        id: id,
        title: name,
        report_type: report_type,
        created_at: 'date',
        modified_at: 'date',
      },
    };
  } else {
    return {
      errors: errors,
    };
  }
};

export const loadReports = () => {
  return async (dispatch, getState) => {
    const reports = getState().reports;

    try {
      dispatch(
        setReports({
          ...reports,
          isLoading: true,
        }),
      );
      const _reports = await authorizedGet('report/paginate');
      if (_reports.data) {
        dispatch(
          setReports({
            isLoading: false,
            data: _reports.data,
          }),
        );
      }
    } catch (err) {
      dispatch(
        setReports({
          ...reports,
          isLoading: false,
        }),
      );
    }
  };
};

export const loadMoreReportsAsync = url => {
  return async (dispatch, getState) => {
    const reports = getState().reports;

    try {
      dispatch(
        setReports({
          ...reports,
          isLoading: true,
        }),
      );
      const handler = getHandler(url);
      const _reports = await authorizedGet(handler);
      if (_reports.data) {
        dispatch(
          loadMoreReports({
            isLoading: false,
            data: _reports.data,
          }),
        );
      }
    } catch (err) {
      dispatch(
        setReports({
          ...reports,
          isLoading: false,
        }),
      );
      ToastAndroid.show('Failed to load more reports', ToastAndroid.SHORT);
    }
  };
};

export function selectReportAsync(report, navigation) {
  return async (dispatch, getState) => {
    dispatch(initializeAllElements());

    const state = getState();
    try {
      dispatch(
        selectReport({
          ...state.activeReport,
          isLoading: true,
        }),
      );
      // if (state.activeReport.data) {
      //     console.log("Saving old report data...");
      //     await AsyncStorage.setItem("reportElementSummary-" + state.activeReport.data.id, JSON.stringify(state.reportElementSummary));
      //
      //     await AsyncStorage.setItem("members-" + state.activeReport.data.id, JSON.stringify(state.members));
      //     await AsyncStorage.setItem("credits-" + state.activeReport.data.id, JSON.stringify(state.credits));
      //     await AsyncStorage.setItem("creditsHistory-" + state.activeReport.data.id, JSON.stringify(state.creditsHistory));
      //     await AsyncStorage.setItem("fixedCosts-" + state.activeReport.data.id, JSON.stringify(state.fixedCosts));
      //     await AsyncStorage.setItem("mealShopping-" + state.activeReport.data.id, JSON.stringify(state.mealShopping));
      //     await AsyncStorage.setItem("mealShoppingHistory-" + state.activeReport.data.id, JSON.stringify(state.mealShoppingHistory));
      //     await AsyncStorage.setItem("meals-" + state.activeReport.data.id, JSON.stringify(state.meals));
      // }
      if (navigation) {
        navigation.navigate('Report');
      }
      authorizedGet('/report/' + report.report_id + '/member/access').then(
        response => {
          if (response.data) {
            dispatch(
              selectReport({
                isLoading: false,
                data: report,
                me: response.data,
              }),
            );
            dispatch(loadAllElements());
          }
        },
      );
    } catch (err) {
      dispatch(
        selectReport({
          ...state.activeReport,
          isLoading: false,
        }),
      );
      ToastAndroid.show('Failed to select report', ToastAndroid.SHORT);
    }
  };
}

export function addReportAsync(report, navigation) {
  return async (dispatch, getState) => {
    dispatch(
      setReports({
        isLoading: true,
        data: [],
      }),
    );
    try {
      authorizedPost('report/create', {
        title: report.title,
        type: report.report_type,
      }).then(__report => {
        navigation.navigate('Report');
        if (__report) {
          dispatch(selectReportAsync(__report.data.data));
          setTimeout(function () {
            dispatch(loadReports());
          }, REQUEST_DELAY_SMALL);
        }
        ToastAndroid.show('Report Created', ToastAndroid.SHORT);
      });
    } catch (err) {
      dispatch(
        setReports({
          isLoading: false,
          data: [],
        }),
      );
      ToastAndroid.show('Failed add report', ToastAndroid.SHORT);
    }
  };
}

export function deleteReportAsync(index, report) {
  return async (dispatch, getState) => {
    const reports = getState().reports;
    try {
      const _report = getState().activeReport;

      dispatch(
        setReports({
          ...reports,
          isLoading: true,
        }),
      );
      const response = await authorizedDelete(
        'report/' + report.report_id + '/delete',
      );
      if (report.report_id === _report.data.report_id) {
        dispatch(selectReport(initialReport));
      }
      if (response) {
        dispatch(loadReports());
      }
    } catch (err) {
      dispatch(
        setReports({
          ...reports,
          isLoading: false,
        }),
      );
    }
  };
}

export function updateReportAsync(report_id, title) {
  return async (dispatch, getState) => {
    const reports = getState().reports;
    try {
      dispatch(
        setReports({
          ...reports,
          isLoading: true,
        }),
      );
      const response = await authorizedPut('report/' + report_id + '/update', {
        title: title,
      });

      if (response) {
        dispatch(loadReports());
        ToastAndroid.show('Successful report update', ToastAndroid.SHORT);
      }
    } catch (err) {
      dispatch(
        setReports({
          ...reports,
          isLoading: false,
        }),
      );
      ToastAndroid.show('Failed report update', ToastAndroid.SHORT);
    }
  };
}

export const setReports = reports => {
  return {
    type: ReportsActions.LOAD_REPORT,
    payload: reports,
  };
};

export const loadMoreReports = reports => {
  return {
    type: ReportsActions.LOAD_MORE_REPORT,
    payload: reports,
  };
};

export const selectReport = report => {
  console.log(
    'You have selected: ' + report.data.report_id + ' - ' + report.data.title,
  );
  return {
    type: ReportsActions.SELECT_REPORT,
    payload: report,
  };
};
