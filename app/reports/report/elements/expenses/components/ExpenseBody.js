import {FlatList, View} from 'react-native';
import {ListItem} from 'react-native-elements';
import {Avatar, Button, HelperText, Text, TextInput} from 'react-native-paper';
import React, {useState} from 'react';
import globalStyle from '../../../../../style';
import {useDispatch, useSelector} from 'react-redux';
import {addExpense, createExpense, loadExpenses} from '../expenses.action';
import Summary from '../../../components/Summary';
import UpdateExpense from './UpdateExpense';
import {formatDateTime} from '../../../../../soceton';

export default function ExpenseBody({expenses}) {
  const total = useSelector(state => state.expenses.total);
  const l_t = useSelector(state => state.language.translation.expenses.total);
  const l_i = useSelector(state => state.language.translation.expenses.add);

  const [amount, setAmount] = useState('');
  const [expenseName, setExpenseName] = useState('');
  const [error, setError] = useState([]);

  const dispatch = useDispatch();

  const isLoading = useSelector(state => state.expenses.isLoading);
  const next = useSelector(state => state.expenses.data.next);
  const l = useSelector(
    state => state.language.translation.expenses.no_history,
  );
  const [visible, setVisible] = useState(false);
  const [Item, setItem] = useState({name: '', amount: ''});

  //const dispatch = useDispatch();
  const onRefresh = () => {
    dispatch(loadExpenses());
  };

  const loadMore = () => {
    if (next) {
      dispatch(loadExpenses(next));
    }
  };
  const onDismiss = () => {
    setVisible(false);
  };
  const updateModal = item => {
    setItem(item);
    setVisible(true);
  };

  const listHeader = () => {
    const add = () => {
      createExpense(expenseName, amount).then(result => {
        if (!result.errors) {
          dispatch(addExpense(result.expense));

          setAmount('');
          setExpenseName('');
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
            marginLeft: 10,
            marginRight: 10,
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'stretch',
          }}>
          <TextInput
            style={{flex: 2}}
            onChangeText={text => {
              setExpenseName(text);
              setError([]);
            }}
            label={l_i.name}
            value={expenseName}
          />
          <TextInput
            style={{flex: 1, marginLeft: 5}}
            onChangeText={text => {
              setAmount(text);
              setError([]);
            }}
            value={amount}
            label={l_i.amount}
            keyboardType="decimal-pad"
          />
        </View>
        <View style={globalStyle.mb5}>
          <HelperText
            type="error"
            style={{display: error.includes('amount') ? 'flex' : 'none'}}>
            {l_i.invalid_amount}
          </HelperText>
          <Button
            onPress={() => add()}
            mode={'contained'}
            style={globalStyle.button_add}>
            {l_i.add.Add}
          </Button>
        </View>

        <Summary title={l_t} value={total} />
      </View>
    );
  };

  const renderReport = ({item, index}) => {
    const color = item.amount >= 0 ? 'green' : 'red';
    return (
      <ListItem
        key={index}
        bottomDivider
        onPress={() => updateModal(item)}
        onLongPress={() => updateModal(item)}>
        <Avatar.Text size={32} label={item.admin.avatar_text} />
        <ListItem.Content>
          <ListItem.Title>{item.name}</ListItem.Title>
          <ListItem.Subtitle>
            {formatDateTime(item.created_at)}
          </ListItem.Subtitle>
        </ListItem.Content>
        <View style={{flexDirection: 'column'}}>
          <ListItem.Title style={{textAlign: 'right', color: color}}>
            {item.amount.toString()}
          </ListItem.Title>
        </View>
      </ListItem>
    );
  };

  return (
    <View style={globalStyle.mt10}>
      <UpdateExpense
        onDismiss={() => onDismiss()}
        visible={visible}
        item={Item}
      />
      <FlatList
        contentContainerStyle={{...globalStyle.pb500}}
        data={expenses}
        renderItem={renderReport}
        keyExtractor={item => item.id.toString()}
        onRefresh={onRefresh}
        refreshing={isLoading}
        onEndReached={loadMore}
        onEndThreshold={0.2}
        ListEmptyComponent={() => <Text>{l}</Text>}
        ListHeaderComponent={listHeader}
      />
    </View>
  );
}
