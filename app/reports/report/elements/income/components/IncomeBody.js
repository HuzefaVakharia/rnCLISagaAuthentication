import {FlatList, SafeAreaView, ScrollView, View} from 'react-native';
import globalStyle from '../../../../../style';
import {Avatar, Button, HelperText, Text, TextInput} from 'react-native-paper';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addIncome, createIncome, loadIncome} from '../income.action';
import {ListItem} from 'react-native-elements';
import Summary from '../../../components/Summary';
import UpdateIncome from './UpdateIncome';
import {formatDateTime} from '../../../../../soceton';

export default function IncomeBody({income}) {
  const total = useSelector(state => state.income.total);
  const l_t = useSelector(state => state.language.translation.income.total);
  const l_i = useSelector(state => state.language.translation.income.add);

  const [amount, setAmount] = useState('');
  const [incomeName, setIncomeName] = useState('');
  const [error, setError] = useState([]);

  //const dispatch = useDispatch();

  const next = useSelector(state => state.income.data.next);
  const isLoading = useSelector(state => state.income.isLoading);
  const l = useSelector(state => state.language.translation.income.no_history);
  const [Item, setItem] = useState({name: '', amount: ''});

  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();
  const onRefresh = () => {
    dispatch(loadIncome());
  };

  const loadMore = () => {
    if (next) {
      dispatch(loadIncome(next));
    }
  };

  const updateModal = item => {
    setItem(item);
    setVisible(true);
  };

  const onDismiss = () => {
    setVisible(false);
  };

  const listHeader = () => {
    const add = () => {
      createIncome(incomeName, amount).then(result => {
        if (!result.errors) {
          dispatch(addIncome(result.income));

          setAmount('');
          setIncomeName('');
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
              setIncomeName(text);
              setError([]);
            }}
            label={l_i.name}
            value={incomeName}
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
    <SafeAreaView style={globalStyle.mt10}>
      <UpdateIncome
        visible={visible}
        onDismiss={() => onDismiss()}
        item={Item}
      />
      <FlatList
        contentContainerStyle={{...globalStyle.pb500}}
        data={income}
        renderItem={renderReport}
        keyExtractor={item => item.id.toString()}
        onRefresh={onRefresh}
        refreshing={isLoading}
        onEndReached={loadMore}
        onEndThreshold={0.2}
        ListEmptyComponent={() => <Text>{l}</Text>}
        ListHeaderComponent={listHeader}
      />
    </SafeAreaView>
  );
}
