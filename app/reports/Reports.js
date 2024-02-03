import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {loadReports} from './reports.action';
import {SafeAreaView, StyleSheet} from 'react-native';
import globalStyle from '../style';
import {Appbar, FAB} from 'react-native-paper';
import AddReportModal from './components/AddReportModal';
import ReportsBody from './components/ReportsBody';

export default function Reports({navigation}) {
  const [visible, setVisible] = useState(false);
  const l = useSelector(state => state.language.translation.reports.subtitle);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadReports());
    // eslint-disable-next-line
    
  }, []);

  return (
    <SafeAreaView
      style={{...globalStyle.container, ...StyleSheet.absoluteFill}}>
      <Appbar.Header>
        <Appbar.Action icon="home" />
        <Appbar.Content title={'Soceton Manager'} subtitle={l} />
      </Appbar.Header>
      <ReportsBody navigation={navigation} />
      {/*<FAB*/}
      {/*    style={{*/}
      {/*        position: 'absolute',*/}
      {/*        margin: 16,*/}
      {/*        right: 0,*/}
      {/*        bottom: 0,*/}
      {/*    }}*/}
      {/*    icon="plus"*/}
      {/*    onPress={() => setVisible(true)}*/}
      {/*/>*/}
      {/*<AddReportModal navigation={navigation} visible={visible} onDismiss={() => setVisible(false)}/>*/}
    </SafeAreaView>
  );
}
