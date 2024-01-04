import React, {useState} from 'react';
import {View} from 'react-native';
import {Button, HelperText, TextInput, Title} from 'react-native-paper';
import {FullModal} from '../../../../components/FullModal';
import {MemberSelector} from '../members/components';
import {useDispatch, useSelector} from 'react-redux';
import {createCredit, addCreditAsync} from './credits.action';
import globalStyle from '../../../../style';

export function AddCreditModal({visible, onDismiss, mode = 'Add'}) {
  const [amount, setAmount] = useState('');
  const [selected, setSelected] = useState([]);
  const [error, setError] = useState([]);

  const members = useSelector(state => state.members.data);
  const credit_id = useSelector(state => state.creditsHistory.data).length;
  const l = useSelector(state => state.language.translation.credits.add);

  let modifier = 1;

  if (mode === 'Remove') {
    modifier = -1;
  }

  const handleSelect = selectedList => {
    setSelected(selectedList);
    setError([]);
  };

  const dispatch = useDispatch();
  const add = () => {
    createCredit(
      members.filter((member, index) => selected.includes(index)),
      modifier * amount,
      credit_id,
    ).then(result => {
      if (result.histories) {
        dispatch(addCreditAsync(result));

        setAmount('');
        onDismiss();
        setSelected([]);
      } else {
        setError(result.errors);
      }
    });
  };

  return (
    <View>
      <FullModal visible={visible} onDismiss={() => onDismiss()}>
        <Title>{mode} Credit</Title>
        <TextInput
          onChangeText={text => {
            setAmount(text);
            setError([]);
          }}
          label={l.credit_amount}
          keyboardType="decimal-pad"
        />
        <HelperText type="error" visible={error.includes('amount')}>
          {l.invalid_amount}
        </HelperText>

        <MemberSelector
          onSelect={selected => handleSelect(selected)}
          selectedList={selected}
          members={members}
          title={l.select_members}
        />
        <HelperText type="error" visible={error.includes('members')}>
          {l.no_member}
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
