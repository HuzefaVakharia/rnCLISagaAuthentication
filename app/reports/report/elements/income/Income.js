import React, {useEffect} from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import globalStyle from '../../../../style';
import {Appbar} from 'react-native-paper';
import IncomeBody from './components/IncomeBody';
import {loadIncome} from './income.action';

export default function Income({navigation}) {
  const report = useSelector(state => state.activeReport.data);
  const l = useSelector(state => state.language.translation.income);

  const income = useSelector(state => state.income.data.results);

  const dispatch = useDispatch();
  useEffect(function () {
    dispatch(loadIncome());
    // eslint-disable-next-line
  }, []);

  return (
    <SafeAreaView
      style={{...globalStyle.container, ...StyleSheet.absoluteFill}}>
      <Appbar.Header>
        <Appbar.Action icon="arrow-left" onPress={() => navigation.pop()} />
        <Appbar.Content title={l.title} subtitle={report.title} />
      </Appbar.Header>

      {income && <IncomeBody income={income} />}
    </SafeAreaView>
  );
}
