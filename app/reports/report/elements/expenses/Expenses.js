import React, {useEffect} from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import globalStyle from '../../../../style';
import {Appbar} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import ExpenseBody from './components/ExpenseBody';
import {loadExpenses} from './expenses.action';

export default function Expenses({navigation}) {
  const report = useSelector(state => state.activeReport.data);
  const l = useSelector(state => state.language.translation.expenses);

  const expenses = useSelector(state => state.expenses.data.results);

  const dispatch = useDispatch();
  useEffect(function () {
    dispatch(loadExpenses());
    // eslint-disable-next-line
  }, []);

  return (
    <SafeAreaView
      style={{...globalStyle.container, ...StyleSheet.absoluteFill}}>
      <Appbar.Header>
        <Appbar.Action icon="arrow-left" onPress={() => navigation.pop()} />
        <Appbar.Content title={l.title} subtitle={report.title} />
      </Appbar.Header>
      {expenses && <ExpenseBody expenses={expenses} />}
      {/*<AddExpense visible={visibleMinus} onDismiss={() => setVisibleMinus(false)} mode={"Remove"} />*/}
      {/*<AddExpense visible={visible} onDismiss={() => setVisible(false)} />*/}

      {/*<View style={{...globalStyle.footer_button_container}}>*/}
      {/*    {<Button onPress={() => setVisible(true)} mode="contained" icon={"plus"} style={globalStyle.footer_button}>{l.add_button}</Button>}*/}
      {/*    {<Button onPress={() => setVisibleMinus(true)} mode="contained" icon={"minus"} style={globalStyle.footer_button}>{l.minus_button}</Button>}*/}
      {/*</View>*/}
    </SafeAreaView>
  );
}
