import React, {useState} from 'react';
import {View} from 'react-native';
import {Button, HelperText, TextInput, Title} from 'react-native-paper';
import {FullModal} from '../../../../components/FullModal';
import {useDispatch, useSelector} from 'react-redux';
import {MemberSelector} from '../members/components';
import {addMealsAsync, createMeals} from './meals.action';
import globalStyle from '../../../../style';

export function AddMealModal({visible, onDismiss, mode = 'Add'}) {
  const [day, setDay] = useState('');
  const [amount, setAmount] = useState('');
  const [selected, setSelected] = useState([]);
  const [error, setError] = useState([]);
  const l = useSelector(state => state.language.translation.meals.add);

  const members = useSelector(state => state.members.data);

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
    createMeals(
      members.filter((member, index) => selected.includes(index)),
      modifier * amount,
      day,
    ).then(result => {
      if (!result.errors) {
        dispatch(addMealsAsync(result));

        setAmount('');
        setDay('');
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
        <Title>{mode} Meal</Title>
        <TextInput
          onChangeText={text => {
            setAmount(text);
            setError([]);
          }}
          label={l.meal_amount}
          keyboardType="decimal-pad"
        />
        <HelperText type="error" visible={error.includes('amount')}>
          {l.invalid_amount}
        </HelperText>

        <TextInput
          onChangeText={text => {
            setDay(text);
            setError([]);
          }}
          label={l.identifier}
        />
        <HelperText type="error" visible={error.includes('date')}>
          {l.invalid_identifier}
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
