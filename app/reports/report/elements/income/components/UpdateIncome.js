import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View} from 'react-native';
import {FullModal} from '../../../../../components/FullModal';
import {Button, HelperText, TextInput, Title} from 'react-native-paper';
import globalStyle from '../../../../../style';
import {updateIncome} from '../income.action';

export default function UpdateIncome({visible, onDismiss, item}) {
  const [amount, setAmount] = useState(null);
  const [incomeName, setIncomeName] = useState(null);
  const [error, setError] = useState([]);

  const l = useSelector(state => state.language.translation.income.update);

  const dispatch = useDispatch();
  const update = () => {
    dispatch(
      updateIncome({
        amount: amount !== null ? amount : item.amount,
        name: incomeName ? incomeName : item.name,
        id: item.id,
      }),
    );
    onDismiss();
  };

  return (
    <View>
      <FullModal visible={visible} onDismiss={() => onDismiss()}>
        <Title>Update Income</Title>
        <TextInput
          style={globalStyle.mb5}
          onChangeText={text => {
            setIncomeName(text);
            setError([]);
          }}
          label={l.name}
          defaultValue={item.name}
        />

        <TextInput
          onChangeText={text => {
            setAmount(text.toString() === '' ? 0 : text);
            setError([]);
          }}
          label={l.amount}
          keyboardType="decimal-pad"
          defaultValue={item.amount.toString()}
        />
        <HelperText type="error" visible={error.includes('amount')}>
          {l.invalid_amount}
        </HelperText>

        <View style={globalStyle.modal_footer}>
          <Button
            onPress={() => update()}
            mode={'contained'}
            style={globalStyle.modal_button}>
            {l.title}
          </Button>
          <Button
            onPress={() => onDismiss()}
            mode={'contained'}
            style={globalStyle.modal_button_cancel}>
            {l.cancel}
          </Button>
        </View>
      </FullModal>
    </View>
  );
}
