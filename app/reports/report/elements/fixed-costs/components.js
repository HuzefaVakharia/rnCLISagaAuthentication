import React, {useState} from 'react';
import {View} from 'react-native';
import {Button, HelperText, TextInput, Title} from 'react-native-paper';
import {FullModal} from '../../../../components/FullModal';
import {useDispatch, useSelector} from 'react-redux';
import {MemberSelector} from '../members/components';
import {addFixedCostAsync, createFixedCost} from './fixed-costs.action';
import globalStyle from '../../../../style';

export function AddFixedCostModal({visible, onDismiss, mode = 'Add'}) {
  const [amount, setAmount] = useState('');
  const [costName, setCostName] = useState('');
  const [error, setError] = useState([]);
  const [selected, setSelected] = useState([]);

  const members = useSelector(state => state.members.data);
  const l = useSelector(state => state.language.translation.fixed_costs.add);

  let modifier = 1;

  if (mode === 'Remove') {
    modifier = -1;
  }

  const dispatch = useDispatch();
  const handleSelect = selectedList => {
    setSelected(selectedList);
    setError([]);
  };

  const add = () => {
    createFixedCost(
      members.filter((member, index) => selected.includes(index)),
      modifier * amount,
      costName,
    ).then(result => {
      if (!result.errors) {
        dispatch(addFixedCostAsync(result));

        setAmount('');
        setCostName('');
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
        <Title>{mode} Fixed Cost</Title>
        <TextInput
          onChangeText={text => {
            setCostName(text);
            setError([]);
          }}
          label={l.fixed_cost_name}
        />
        <HelperText type="error" visible={error.includes('name')}>
          {l.invalid_name}
        </HelperText>

        <TextInput
          onChangeText={text => {
            setAmount(text);
            setError([]);
          }}
          label={l.fixed_cost_amount}
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
