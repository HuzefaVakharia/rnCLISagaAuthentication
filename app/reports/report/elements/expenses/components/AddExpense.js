import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View} from 'react-native';
import {FullModal} from '../../../../../components/FullModal';
import {Button, HelperText, TextInput, Title} from 'react-native-paper';
import globalStyle from '../../../../../style';
import {addExpense, createExpense} from '../expenses.action';

export function AddExpense({visible, onDismiss, mode = 'Add'}) {
  const [amount, setAmount] = useState('');
  const [expenseName, setExpenseName] = useState('');
  const [error, setError] = useState([]);

  const l = useSelector(state => state.language.translation.expenses.add);
  let modifier = 1;
  if (mode === 'Remove') {
    modifier = -1;
  }
  const dispatch = useDispatch();
  const add = () => {
    createExpense(expenseName, modifier * amount).then(result => {
      if (!result.errors) {
        dispatch(addExpense(result.expense));

        setAmount('');
        setExpenseName('');
        onDismiss();
      } else {
        setError(result.errors);
      }
    });
  };

  return (
    <View>
      <FullModal visible={visible} onDismiss={() => onDismiss()}>
        <Title>{mode} Expense</Title>
        <TextInput
          style={globalStyle.mb5}
          onChangeText={text => {
            setExpenseName(text);
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
      </FullModal>
    </View>
  );
}
