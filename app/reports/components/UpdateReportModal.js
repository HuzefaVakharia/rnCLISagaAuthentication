import * as React from 'react';
import {
  Button,
  HelperText,
  TextInput,
  Title,
  useTheme,
} from 'react-native-paper';
import {View} from 'react-native';
import {
  addReportAsync,
  createReport,
  updateReportAsync,
} from '../reports.action';
import {useDispatch, useSelector} from 'react-redux';
import {FullModal} from '../../components/FullModal';
import globalStyle from '../../style';
import {Picker} from '@react-native-picker/picker';
import {useState} from 'react';

const UpdateReportModal = ({visible, onDismiss, title, report_id}) => {
  const [text, setText] = useState(title);
  const [error, setError] = useState([]);

  const l = useSelector(state => state.language.translation.reports.update);
  const {colors} = useTheme();

  const dispatch = useDispatch();

  const handleUpdateReport = () => {
    dispatch(updateReportAsync(report_id, text));
    onDismiss();
  };
  return (
    <View>
      <FullModal onDismiss={onDismiss} visible={visible}>
        <Title>{l.title}</Title>
        <TextInput
          label={l.name}
          onChangeText={text => setText(text)}
          value={text}
        />
        <HelperText type="error" visible={error.includes('name')}>
          Report name is invalid!
        </HelperText>

        <View style={globalStyle.modal_footer}>
          <Button
            onPress={() => handleUpdateReport()}
            mode={'contained'}
            style={globalStyle.modal_button}>
            {l.update}
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

export default UpdateReportModal;
