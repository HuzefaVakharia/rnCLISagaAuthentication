import React, {useEffect} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import globalStyle from '../../style';
import {loadAllElements} from './report.action';
import NoBody from './components/NoBody';
import ReportBody from './components/ReportBody';

export default function Report({navigation}) {
  const report = useSelector(state => state.activeReport);
  //https://www.scaler.com/topics/react/useselector-and-usedispatch/
  const dispatch = useDispatch();

  useEffect(function () {
    dispatch(loadAllElements());
    // eslint-disable-next-line
  }, []);

  return (
    <SafeAreaView style={globalStyle.container}>
      {/*  <View>
        <Text>Hi everybody</Text>
      </View> */}
      <ReportBody
        access={report.me.position}
        report={report.data}
        navigation={navigation}
      />
      {/*  {report.data.title && report.me.position && (
        <ReportBody
          access={report.me.position}
          report={report.data}
          navigation={navigation}
        />
      )} */}
      {/*{(!report.data.title || !report.me.position) && <NoBody />} */}
    </SafeAreaView>
  );
}
