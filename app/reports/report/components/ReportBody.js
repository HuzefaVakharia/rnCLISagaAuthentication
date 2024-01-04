import {useDispatch, useSelector} from 'react-redux';
import {Appbar, useTheme} from 'react-native-paper';
import React from 'react';
import {RefreshControl, SafeAreaView, ScrollView} from 'react-native';
import {Icon} from 'react-native-elements';
import globalStyle from '../../../style';
import MessReport from './mess/MessReport';
import PersonalReport from './personal/PersonalReport';
import {loadAllElements} from '../report.action';
import {formatDateTime} from '../../../soceton';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
export default function ReportBody({report, navigation, access}) {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.activeReport.isLoading);
  const {colors} = useTheme();

  const onRefresh = () => {
    dispatch(loadAllElements());
  };

  const Body = () => {
    if (report.report_type === 'Personal') {
      return <PersonalReport navigation={navigation} />;
    } else {
      return <MessReport navigation={navigation} access={access} />;
    }
  };

  return (
    <SafeAreaView>
      <Appbar.Header>
        <Appbar.Action
          //icon={() => <Icon name={'dashboard'} color={colors.surface} />}
          icon={() => (
            <MaterialCommunityIcons
              name="view-dashboard"
              size={24}
              color={'red'}
            />
          )}
        />
        <Appbar.Content
          title={report.title}
          subtitle={formatDateTime(report.modified_at)}
        />
      </Appbar.Header>
      <ScrollView
        contentContainerStyle={{...globalStyle.scrollViewBottomButtons}}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
        }>
        <Body />
      </ScrollView>
    </SafeAreaView>
  );
}
