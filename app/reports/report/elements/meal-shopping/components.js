import React, {useState} from 'react';
import {View} from 'react-native';
import {Button, HelperText, TextInput, Title} from 'react-native-paper';
import {FullModal} from '../../../../components/FullModal';
import {MemberSelector} from '../members/components';
import {useDispatch, useSelector} from 'react-redux';
import {addMealShoppingAsync, createMealShopping} from './meal-shopping.action';
import globalStyle from '../../../../style';

export function AddMealShoppingModal({visible, onDismiss, mode = 'Add'}) {
  const [error, setError] = useState([]);
  const [amount, setAmount] = useState('');
  const [selected, setSelected] = useState([]);

  const members = useSelector(state => state.members.data);
  const meal_shopping_id = useSelector(state => state.mealShopping).length;
  const l = useSelector(state => state.language.translation.meal_shopping.add);
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
    createMealShopping(
      members.filter((member, index) => selected.includes(index)),
      modifier * amount,
      meal_shopping_id,
    ).then(result => {
      if (!result.errors) {
        dispatch(addMealShoppingAsync(result));

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
        <Title>{mode} Meal Shopping</Title>

        <TextInput
          onChangeText={text => {
            setAmount(text);
            setError([]);
          }}
          label={l.cost_amount}
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
