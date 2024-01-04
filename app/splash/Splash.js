import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import globalStyle from '../style';
import {useDispatch, useSelector} from 'react-redux';
import Loading from '../components/Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Logo} from './components';
import {selectReport} from '../reports/reports.action';
import {initialReport} from '../reports/report/report.reducer';
import {changeLanguage} from '../account/settings/lang/lang';
import {checkUpdateAction} from './splash.actions';

export default function Splash({navigation}) {
  const user = useSelector(state => state.activeUser);
  const report = useSelector(state => state.activeReport);
  const language = useSelector(state => state.language.language);
  const dispatch = useDispatch();

  useEffect(function () {
    dispatch(checkUpdateAction());
    dispatch(changeLanguage(language, false));
    if (!report) {
      dispatch(selectReport(initialReport));
    } else {
      dispatch(selectReport(report));
    }
    // eslint-disable-next-line
  }, []);

  let next_screen = {
    index: 1,
    routes: [{name: 'Login'}],
  };

  AsyncStorage.getItem('token').then(token => {
    if (token && user.data && user.data.account_id) {
      next_screen = {
        index: 1,
        routes: [{name: 'Home'}],
      };
    }
  });

  setTimeout(() => {
    navigation.reset(next_screen);
  }, 2000);

  return (
    <SafeAreaView
      style={{...globalStyle.container, ...StyleSheet.absoluteFill}}>
      <View style={{color: '#8F92A1', alignSelf: 'center', marginTop: '45%'}}>
        <Logo />
        {<Loading style={{marginTop: '5%'}} />}
      </View>
    </SafeAreaView>
  );
}
