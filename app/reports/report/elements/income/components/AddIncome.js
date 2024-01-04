import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View} from 'react-native';
import {FullModalForAddIncome} from '../../../../../components/FullModalForAddIncome';
import {Button, HelperText, TextInput, Title} from 'react-native-paper';
import globalStyle from '../../../../../style';
import {addIncome, createIncome} from '../income.action';

export default function AddIncome({visible, onDismiss, mode = 'Add'}) {
  const [amount, setAmount] = useState('');
  const [incomeName, setIncomeName] = useState('');
  const [error, setError] = useState([]);

  const l = useSelector(state => state.language.translation.income.add);

  let modifier = 1;
  if (mode === 'Remove') {
    modifier = -1;
  }
  const dispatch = useDispatch();
  const add = () => {
    createIncome(incomeName, modifier * amount).then(result => {
      if (!result.errors) {
        dispatch(addIncome(result.income));

        setAmount('');
        setIncomeName('');
        onDismiss();
      } else {
        setError(result.errors);
      }
    });
  };

  return (
    <View>
      <FullModalForAddIncome visible={visible} onDismiss={() => onDismiss()}>
        <Title>{mode} Income</Title>
        <TextInput
          style={globalStyle.mb5}
          onChangeText={text => {
            setIncomeName(text);
            setError([]);
          }}
          label={l.name}
        />

        <TextInput
          onChangeText={text => {
            setAmount(text);
            setError([]);
          }}
          label={l.amount}
          keyboardType="decimal-pad"
        />
        <HelperText type="error" visible={error.includes('amount')}>
          {l.invalid_amount}
        </HelperText>

        <View style={globalStyle.modal_footer}>
          <Button
            onPress={() => add()}
            mode={'contained'}
            style={globalStyle.modal_button}>
            {l.add[mode]}
          </Button>
          <Button
            onPress={() => onDismiss()}
            mode={'contained'}
            style={globalStyle.modal_button_cancel}>
            {l.cancel}
          </Button>
        </View>
      </FullModalForAddIncome>
    </View>
  );
}
