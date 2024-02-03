/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-lone-blocks */
/* eslint-disable comma-dangle */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
/* eslint-disable eol-last */
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
   console.log('Reports got these values: '+JSON.stringify(reports));
   /* 
   
   QUESTION NUMBER 1: What is getstate in redux?
   
   getState()​ Returns the current state tree of your application. It is equal to the last value returned by the store's reducer.
   
   General syntax to fetch state of centralized store data using getState() function is:

   getState().KEY_NAME_WHICH_WE_HAVE_COMBINED_WITH_OUR_REDUCER_FILE_NAME_IN_ROOT_REDUCER_FILE
   
  
  
  
  
  
  
    QUESTION NUMBER 2: When and Why we have to use getState() function to fetch our state data from our store inside our Action.js file in Redux project.
    
    As you have seen in this Reports.js when our Reports.js screen is loaded on our device we have to show static data from our store inside the screen of Reports.js file, this can be done using two things:
    
    1. using useSelector() hook 
    2. or by using getState() function.

    QUESTION NUMBER 3: What is the difference between getState() and useSelector() in Redux?

    Ref: https://www.reddit.com/r/react/comments/jdbzme/what_is_the_difference_between_getstate_and/ 

    

I get that both functions enable you to access state from your component. I notice that in tutorials, getState is used in Actions as an argument and part of Redux Thunk? For example,

export const getUserDetails = (id) => async (dispatch, getState) => {

....}

Whereas useSelector is used mostly in components. What exactly is the difference?





Answer=>getState is just a function that returns current state. You could use the useStore hook in components to access it: const { getState } = useStore(). But instead you should use useSelector because it not only accesses store, it also rerenders your component when the result of your selector function changes. You also can use getState anywhere you want, but hooks can only be used in components.
  
  
  
   */

    try {
      dispatch(
        setReports({
          ...reports,
          isLoading: true,
        }),
      );

        /* Here in above dispatch() we are calling action function setReports() and passing two things in that action function which will be required as payload to perform desired action of setReport(), the first thing is previously present reports array with ... spread operator so that each single array data is passed one by one with iteration and not like single data, and second thing is the isLoading value which will be true, these two things will go to the setReports() action defination as  
        payload: reports
        */






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




/* Action defination starts here */

export const setReports = reports => {
  console.log('setReports ACTION DISPATCHED with this payload value', reports);
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
