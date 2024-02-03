/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-lone-blocks */
/* eslint-disable comma-dangle */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
/* eslint-disable eol-last */


import {useDispatch, useSelector} from 'react-redux';
import {
  addReportAsync,
  createReport,
  deleteReportAsync,
  loadMoreReportsAsync,
  loadReports,
  selectReportAsync,
} from '../reports.action';
import {FlatList, View} from 'react-native';
import globalStyle from '../../style';
import FullReportCard from './FullReportCard';
import {
  Button,
  HelperText,
  Text,
  TextInput,
  Title,
  useTheme,
} from 'react-native-paper';
import React, {useState} from 'react';
import {Picker} from '@react-native-picker/picker';

export default function ReportsBody({navigation}) {
  const [text, setText] = React.useState('');
  const [reportType, setReportType] = useState('null');
  const [error, setError] = useState([]);

  const report_id = useSelector(state => state.reports).length;
  const l_a = useSelector(state => state.language.translation.reports.add);
  const {colors} = useTheme();

  const l = useSelector(state => state.language.translation.reports.empty);
  const reports = useSelector(state => state.reports.data.results);
  const next = useSelector(state => state.reports.data.next);
  const isLoading = useSelector(state => state.reports.isLoading);

  const dispatch = useDispatch();
  const handleSelectReport = report => {
    dispatch(selectReportAsync(report, navigation));
  };

  const handleDeleteReport = (index, report) => {
    dispatch(deleteReportAsync(index, report));
  };

  const handleUpdateReport = (index, report) => {
    console.log('update', index, report);
  };

  const onRefresh = () => {
    dispatch(loadReports());
  };

  const loadMore = () => {
    if (next) {
      dispatch(loadMoreReportsAsync(next));
    }
  };

  const listHeader = navigation => {
    const handleAddReport = () => {
      createReport('new_' + report_id, text, reportType).then(result => {
        if (result.report) {
          dispatch(addReportAsync(result.report, navigation));
          setText('');
        } else {
          setError(result.errors);
        }
      });
    };

    return (
      <View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'stretch',
            backgroundColor: colors.placeholder,
          }}>
          <TextInput
            label={l_a.name}
            onChangeText={text => {
              setText(text);
              setError([]);
            }}
            style={{flex: 2}}
          />
          <Picker
            selectedValue={reportType}
            style={{height: 70, color: colors.text, flex: 1}}
            onValueChange={(itemValue, itemIndex) => {
              setReportType(itemValue);
              setError([]);
            }}>
            <Picker.Item label="Select.." value="null" />
            <Picker.Item label="Mess" value="Mess" />
            <Picker.Item label="Personal" value="Personal" />
          </Picker>
        </View>
        <View>
          <HelperText
            type="error"
            style={{display: error.length > 0 ? 'flex' : 'none'}}>
            Report is invalid!
          </HelperText>
          <Button
            onPress={() => handleAddReport()}
            mode={'contained'}
            style={globalStyle.mb5}>
            {l_a.add}
          </Button>
        </View>
      </View>
    );
  };

  const renderReport = ({item, index}) => {
    return (
      <View style={globalStyle.mt5}>
        <FullReportCard
          report={item}
          selectReport={() => handleSelectReport(item)}
          deleteReport={() => handleDeleteReport(index, item)}
          updateReport={() => handleUpdateReport(index, item)}
        />
      </View>
    );
  };

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  /* This below is the default return() of ReportsBody.js file and above two return() and kept inside function and will be returned when that function will be called.  */
  
  return (
    <FlatList
      contentContainerStyle={{...globalStyle.reports, ...globalStyle.pb150}}
      data={reports}
      renderItem={renderReport}
      keyExtractor={item => item.report_id}
      onRefresh={onRefresh}
      refreshing={isLoading}
      onEndReached={loadMore}
      onEndThreshold={0.2}
      ListEmptyComponent={() => <Text>{l}</Text>}
      ListHeaderComponent={() => listHeader(navigation)}
    />
  );
}
