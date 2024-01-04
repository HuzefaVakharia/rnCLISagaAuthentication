import React, {useEffect, useState} from 'react';
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import globalStyle from '../../../../style';
import {Appbar, Avatar, Title, Button, Text} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {ListItem} from 'react-native-elements';
import {AddMealShoppingModal} from './components';
import {
  loadMealShopping,
  loadMealShoppingHistory,
} from './meal-shopping.action';
import {loadFixedCosts} from '../fixed-costs/fixed-costs.action';
import {formatDateTime} from '../../../../soceton';

function MSBody({meal_shopping}) {
  return (
    <View>
      {meal_shopping.map((member, index) => {
        return (
          <ListItem key={index} bottomDivider>
            <Avatar.Text size={32} label={member.account.avatar_text} />
            <ListItem.Content>
              <ListItem.Title>
                {member.account.first_name} {member.account.last_name}
              </ListItem.Title>
            </ListItem.Content>
            <View style={{flexDirection: 'column'}}>
              <ListItem.Title style={{textAlign: 'right'}}>
                {member.amount}
              </ListItem.Title>
            </View>
          </ListItem>
        );
      })}
    </View>
  );
}

function MSHistory({transaction_history}) {
  return (
    <View>
      {transaction_history.map((transaction, index) => {
        const color = transaction.amount >= 0 ? 'green' : 'red';
        return (
          <ListItem key={index} bottomDivider>
            <Avatar.Text size={32} label={transaction.account.avatar_text} />
            <ListItem.Content>
              <ListItem.Title>
                {transaction.account.first_name} {transaction.account.last_name}
              </ListItem.Title>
              <ListItem.Subtitle>
                {formatDateTime(transaction.created_at)}
              </ListItem.Subtitle>
            </ListItem.Content>
            <View style={{flexDirection: 'column'}}>
              <ListItem.Title style={{textAlign: 'right', color: color}}>
                {transaction.amount}
              </ListItem.Title>
            </View>
          </ListItem>
        );
      })}
    </View>
  );
}

export default function MealShopping({navigation}) {
  const [visible, setVisible] = useState(false);
  const [visibleMinus, setVisibleMinus] = useState(false);

  const report = useSelector(state => state.activeReport.data);
  const me = useSelector(state => state.activeReport.me);
  const meal_shopping = useSelector(state => state.mealShopping.data);
  const isLoadingMealShopping = useSelector(
    state => state.mealShopping.isLoading,
  );
  const transaction_history = useSelector(
    state => state.mealShoppingHistory.data,
  );
  const isLoadingMealShoppingHistory = useSelector(
    state => state.mealShoppingHistory.isLoading,
  );
  const l = useSelector(state => state.language.translation.meal_shopping);
  const meal_shopping_id = meal_shopping.length;

  const dispatch = useDispatch();
  useEffect(function () {
    dispatch(loadMealShopping());
    dispatch(loadMealShoppingHistory());
    // eslint-disable-next-line
  }, []);
  const onRefresh = React.useCallback(() => {
    dispatch(loadFixedCosts());
    // eslint-disable-next-line
  }, []);

  return (
    <SafeAreaView
      style={{...globalStyle.container, ...StyleSheet.absoluteFill}}>
      <Appbar.Header>
        <Appbar.Action icon="arrow-left" onPress={() => navigation.pop()} />
        <Appbar.Content title={l.title} subtitle={report.title} />
      </Appbar.Header>

      <ScrollView
        contentContainerStyle={{...globalStyle.scrollViewBottomButtons}}
        refreshControl={
          <RefreshControl
            refreshing={isLoadingMealShoppingHistory || isLoadingMealShopping}
            onRefresh={onRefresh}
          />
        }>
        {meal_shopping_id === 0 && <Text>{l.no_summaries}</Text>}
        {meal_shopping_id > 0 && <MSBody meal_shopping={meal_shopping} />}

        <View style={{marginTop: 25, marginBottom: 25, paddingLeft: 10}}>
          <Title>{l.transaction_history}</Title>
        </View>
        {transaction_history.length === 0 && <Text>{l.no_history}</Text>}
        {transaction_history.length > 0 && (
          <MSHistory transaction_history={transaction_history} />
        )}
      </ScrollView>

      <AddMealShoppingModal
        visible={visible}
        onDismiss={() => setVisible(false)}
      />
      <AddMealShoppingModal
        visible={visibleMinus}
        onDismiss={() => setVisibleMinus(false)}
        mode={'Remove'}
      />
      <View style={{...globalStyle.footer_button_container}}>
        {transaction_history && me.position !== 'Member' && (
          <Button
            onPress={() => setVisible(true)}
            mode="contained"
            icon={'cart-plus'}
            style={globalStyle.footer_button}>
            {l.add_button}
          </Button>
        )}
        {transaction_history && me.position !== 'Member' && (
          <Button
            onPress={() => setVisibleMinus(true)}
            mode="contained"
            icon={'minus'}
            style={globalStyle.footer_button}>
            {l.minus_button}
          </Button>
        )}
      </View>
    </SafeAreaView>
  );
}
