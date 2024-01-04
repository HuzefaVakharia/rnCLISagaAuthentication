import React, {useEffect, useState} from 'react';
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import globalStyle from '../../../../style';
import {useDispatch, useSelector} from 'react-redux';
import {Appbar, Avatar, Divider, Button, Text} from 'react-native-paper';
import {ListItem} from 'react-native-elements';
import {AddFixedCostModal} from './components';
import {loadFixedCosts} from './fixed-costs.action';

function FCBody({expenses}) {
  return (
    <View>
      {expenses.map((fixed_cost, index) => {
        return (
          <View key={index}>
            <ListItem bottomDivider>
              <Avatar.Text size={32} label={fixed_cost.member.avatar_text} />
              <ListItem.Content>
                <ListItem.Title>
                  {fixed_cost.member.first_name} {fixed_cost.member.last_name}
                </ListItem.Title>
              </ListItem.Content>
              <View style={{flexDirection: 'column'}}>
                <ListItem.Title style={{textAlign: 'right'}}>
                  {fixed_cost.amount}
                </ListItem.Title>
              </View>
            </ListItem>
            <View style={globalStyle.list_detail_container}>
              {fixed_cost.elements.map((item, ii) => {
                return (
                  <ListItem key={ii} style={globalStyle.list_detail_item}>
                    <ListItem.Content>
                      <Text>{item.title}</Text>
                    </ListItem.Content>
                    <Text>{item.amount}</Text>
                  </ListItem>
                );
              })}
            </View>
            <Divider />
          </View>
        );
      })}
    </View>
  );
}

export default function FixedCosts({navigation}) {
  const [visible, setVisible] = useState(false);
  const [visibleMinus, setVisibleMinus] = useState(false);

  const report = useSelector(state => state.activeReport.data);
  const me = useSelector(state => state.activeReport.me);
  const fixedCosts = useSelector(state => state.fixedCosts.data);
  const isLoading = useSelector(state => state.fixedCosts.isLoading);
  const l = useSelector(state => state.language.translation.fixed_costs);

  const dispatch = useDispatch();
  useEffect(function () {
    dispatch(loadFixedCosts());
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
          <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
        }>
        {fixedCosts.length === 0 && !isLoading && <Text>No fixed costs</Text>}
        {fixedCosts.length > 0 && !isLoading && (
          <FCBody expenses={fixedCosts} />
        )}
      </ScrollView>

      <AddFixedCostModal
        visible={visibleMinus}
        onDismiss={() => setVisibleMinus(false)}
        mode={'Remove'}
      />
      <AddFixedCostModal
        visible={visible}
        onDismiss={() => setVisible(false)}
      />

      <View style={{...globalStyle.footer_button_container}}>
        {fixedCosts && me.position !== 'Member' && (
          <Button
            onPress={() => setVisible(true)}
            mode="contained"
            icon={'plus'}
            style={globalStyle.footer_button}>
            {l.add_button}
          </Button>
        )}
        {fixedCosts && me.position !== 'Member' && (
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
