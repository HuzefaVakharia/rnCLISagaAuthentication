import React, {useEffect, useState} from 'react';
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import globalStyle from '../../../../style';
import {useDispatch, useSelector} from 'react-redux';
import {Appbar, Avatar, DataTable, Button} from 'react-native-paper';
import {AddMealModal} from './components';
import {loadMeals} from './meals.action';

function MealsTable({meals}) {
  const [activeRow, setActiveRow] = useState(0);
  const [activeCol, setActiveCol] = useState(1);

  return (
    <ScrollView horizontal={true}>
      <DataTable style={{backgroundColor: 'white'}}>
        <DataTable.Header style={{}}>
          <DataTable.Title style={{width: 100}}>Date</DataTable.Title>
          {meals.members.map((member, index) => {
            const color = index + 1 === activeCol ? '#f0e0ff' : 'white';
            return (
              <DataTable.Title
                onPress={() => setActiveCol(index + 1)}
                key={index}
                style={{
                  width: 50,
                  padding: 5,
                  backgroundColor: color,
                }}>
                <Avatar.Text size={32} label={member.avatar_text} />
              </DataTable.Title>
            );
          })}
        </DataTable.Header>
        {meals.meals.map((day_meals, index) => {
          return (
            <DataTable.Row key={'row_' + index}>
              {day_meals.map((meal, im) => {
                const color =
                  im === activeCol || index === activeRow ? '#f0e0ff' : 'white';

                if (im === 0) {
                  return (
                    <DataTable.Cell
                      onPress={() => setActiveRow(index)}
                      style={{width: 100, backgroundColor: color}}
                      key={'col_' + im}>
                      {meal}
                    </DataTable.Cell>
                  );
                } else {
                  return (
                    <DataTable.Cell
                      style={{
                        width: 50,
                        justifyContent: 'center',
                        padding: 5,
                        backgroundColor: color,
                      }}
                      key={'col_' + im}>
                      {meal}
                    </DataTable.Cell>
                  );
                }
              })}
            </DataTable.Row>
          );
        })}
      </DataTable>
    </ScrollView>
  );
}

export default function Meals({navigation}) {
  const [visible, setVisible] = useState(false);
  const [visibleMinus, setVisibleMinus] = useState(false);

  const report = useSelector(state => state.activeReport.data);
  const me = useSelector(state => state.activeReport.me);
  const meals = useSelector(state => state.meals.data);
  const isLoading = useSelector(state => state.meals.isLoading);
  const l = useSelector(state => state.language.translation.meals);

  const dispatch = useDispatch();
  useEffect(function () {
    dispatch(loadMeals());
    // eslint-disable-next-line
  }, []);

  const onRefresh = React.useCallback(() => {
    dispatch(loadMeals());
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
        {meals.meals.length > 0 ? (
          <MealsTable meals={meals} />
        ) : (
          <Text>{l.no_meals}</Text>
        )}
      </ScrollView>

      <AddMealModal visible={visible} onDismiss={() => setVisible(false)} />
      <AddMealModal
        visible={visibleMinus}
        onDismiss={() => setVisibleMinus(false)}
        mode={'Remove'}
      />
      <View style={{...globalStyle.footer_button_container}}>
        {meals.meals && me.position !== 'Member' && (
          <Button
            onPress={() => setVisible(true)}
            mode="contained"
            icon={'plus'}
            style={globalStyle.footer_button}>
            {l.add_button}
          </Button>
        )}
        {meals.meals && me.position !== 'Member' && (
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
