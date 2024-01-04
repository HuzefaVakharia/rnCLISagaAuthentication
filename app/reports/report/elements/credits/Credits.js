import React, {useEffect, useState} from 'react';
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import globalStyle from '../../../../style';
import {Button, Appbar, Avatar, Title, Text, Divider} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {ListItem} from 'react-native-elements';
import {AddCreditModal} from './components';
import {loadCredits, loadCreditHistory} from './credits.action';
import {formatDateTime} from '../../../../soceton';

function credit(totalMeal, totalMealShopping, amount, fixed_costs, meals) {
  let meal_cost = 0;
  let meal_rate = 0;

  if (parseFloat(totalMeal) !== 0) {
    meal_rate = parseFloat(totalMealShopping) / parseFloat(totalMeal);
    meal_cost = meal_rate * parseFloat(meals);
    meal_cost = meal_cost.toFixed(2);
  }
  const current_credit =
    parseFloat(amount) - (parseFloat(fixed_costs) + parseFloat(meal_cost));
  return {
    currentCredit: current_credit.toFixed(2),
    mealRate: meal_rate.toFixed(2),
    fixedCosts: parseFloat(fixed_costs).toFixed(2),
    mealCosts: parseFloat(meal_cost).toFixed(2),
    totalMeal: parseFloat(meals).toFixed(2),
  };
}

function CreditsSummary({credits}) {
  const totalMealShopping = useSelector(state => state.mealShopping.total);
  const totalMeal = useSelector(state => state.meals.total);
  const l = useSelector(state => state.language.translation.credits.detail);

  return (
    <View>
      {credits.map((member, index) => {
        const current_credit = credit(
          totalMeal,
          totalMealShopping,
          member.amount,
          member.fixed_costs,
          member.meals,
        );
        const color = current_credit.currentCredit > 0 ? 'green' : 'red';
        return (
          <View key={index}>
            <ListItem bottomDivider>
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
            <View style={globalStyle.list_detail_container}>
              <ListItem style={globalStyle.list_detail_item}>
                <ListItem.Content>
                  <Text>{l.fixed_cost}</Text>
                </ListItem.Content>
                <Text style={{textAlign: 'right'}}>
                  (-){current_credit.fixedCosts}
                </Text>
              </ListItem>

              <ListItem style={globalStyle.list_detail_item}>
                <ListItem.Content>
                  <Text>
                    {l.meal_cost} ({current_credit.totalMeal} *{' '}
                    {current_credit.mealRate})
                  </Text>
                </ListItem.Content>
                <Text style={{textAlign: 'right'}}>
                  (-){current_credit.mealCosts}
                </Text>
              </ListItem>

              <ListItem style={globalStyle.list_detail_item}>
                <ListItem.Content>
                  <ListItem.Title>{l.balance}</ListItem.Title>
                </ListItem.Content>
                <ListItem.Title style={{textAlign: 'right', color: color}}>
                  {current_credit.currentCredit}
                </ListItem.Title>
              </ListItem>
            </View>
            <Divider />
          </View>
        );
      })}
    </View>
  );
}

function CreditsHistory({transaction_history}) {
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

export default function Credits({navigation}) {
  const [visible, setVisible] = useState(false);
  const [visibleMinus, setVisibleMinus] = useState(false);
  const l = useSelector(state => state.language.translation.credits);

  const report = useSelector(state => state.activeReport.data);
  const me = useSelector(state => state.activeReport.me);
  const credits = useSelector(state => state.credits.data);
  const isLoading = useSelector(state => state.credits.isLoading);
  const transaction_history = useSelector(state => state.creditsHistory.data);
  const isHistoryLoading = useSelector(state => state.creditsHistory.isLoading);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadCredits());
    dispatch(loadCreditHistory());
    // eslint-disable-next-line
  }, []);

  const onRefresh = React.useCallback(() => {
    dispatch(loadCredits());
    dispatch(loadCreditHistory());
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
            refreshing={isLoading || isHistoryLoading}
            onRefresh={onRefresh}
          />
        }>
        {credits && credits.length > 0 ? (
          <CreditsSummary credits={credits} />
        ) : (
          <Text>{l.no_summaries}</Text>
        )}
        <View style={{marginTop: 25, marginBottom: 25, paddingLeft: 10}}>
          <Title>{l.transaction_history}</Title>
        </View>
        {transaction_history && transaction_history.length > 0 ? (
          <CreditsHistory transaction_history={transaction_history} />
        ) : (
          <Text>{l.no_history}</Text>
        )}
      </ScrollView>

      <AddCreditModal visible={visible} onDismiss={() => setVisible(false)} />
      <AddCreditModal
        visible={visibleMinus}
        onDismiss={() => setVisibleMinus(false)}
        mode="Remove"
      />

      <View style={{...globalStyle.footer_button_container}}>
        {transaction_history && me.position !== 'Member' && (
          <Button
            onPress={() => setVisible(true)}
            mode="contained"
            icon={'bank-plus'}
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
