import * as React from 'react';
import {
  Button,
  HelperText,
  TextInput,
  Title,
  useTheme,
} from 'react-native-paper';
import {View} from 'react-native';
import {addReportAsync, createReport} from '../reports.action';
import {useDispatch, useSelector} from 'react-redux';
import {FullModal} from '../../components/FullModal';
import globalStyle from '../../style';
import {Picker} from '@react-native-picker/picker';
import {useState} from 'react';

const AddReportModal = ({visible, onDismiss, navigation}) => {
  const [text, setText] = React.useState('');
  const [reportType, setReportType] = useState('Mess');
  const [error, setError] = useState([]);

  const report_id = useSelector(state => state.reports).length;
  const l = useSelector(state => state.language.translation.reports.add);
  const {colors} = useTheme();

  const dispatch = useDispatch();

  const handleAddReport = () => {
    createReport('new_' + report_id, text, reportType).then(result => {
      if (result.report) {
        onDismiss();
        dispatch(addReportAsync(result.report, navigation));
        setText('');
      } else {
        setError(result.errors);
      }
    });
  };

  return (
    <View>
      <FullModal onDismiss={onDismiss} visible={visible}>
        <Title>{l.title}</Title>
        <TextInput label={l.name} onChangeText={text => setText(text)} />
        <HelperText type="error" visible={error.includes('name')}>
          Report name is invalid!
        </HelperText>
        <Picker
          selectedValue={reportType}
          style={{height: 70, color: colors.text}}
          onValueChange={(itemValue, itemIndex) => setReportType(itemValue)}>
          <Picker.Item label="Mess" value="Mess" />
          <Picker.Item label="Personal" value="Personal" />
        </Picker>
        <View style={globalStyle.modal_footer}>
          <Button
            onPress={() => handleAddReport()}
            mode={'contained'}
            style={globalStyle.modal_button}>
            {l.add}
          </Button>
          <Button
            onPress={() => onDismiss()}
            mode={'contained'}
            style={{...globalStyle.modal_button_cancel}}>
            {l.cancel}
          </Button>
        </View>
      </FullModal>
    </View>
  );
};

export default AddReportModal;
