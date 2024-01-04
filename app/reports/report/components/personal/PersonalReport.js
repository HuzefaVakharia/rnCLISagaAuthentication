import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import Summary from '../Summary';
import globalStyle from '../../../../style';
import {plus_style} from '../../../../plus/plus.styles';
import {Button, Card, Title} from 'react-native-paper';
import Loading from '../../../../components/Loading';
//import {MaterialIcons} from '@expo/vector-icons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import {AddExpense} from '../../elements/expenses/components/AddExpense';
import AddIncome from '../../elements/income/components/AddIncome';

export default function PersonalReport({navigation}) {
  const [visible, setVisible] = useState(false);
  const [addIncomeVisible, setAddIncomeVisible] = useState(false);
  const l_summaries = useSelector(
    state => state.language.translation.report.summaries,
  );

  const totalIncome = useSelector(state => state.income.total);
  const totalExpense = useSelector(state => state.expenses.total);

  const isLoadingIncome = useSelector(state => state.income.isLoading);
  const isLoadingExpense = useSelector(state => state.expenses.isLoading);

  const summaries = {
    total_income: 0,
    total_expense: 0,
  };

  const elements = [
    {
      title: l_summaries.elements.income,
      value: 0,
      component: 'Income',
      show: true,
      isLoading: true,
    },
    {
      title: l_summaries.elements.expenses,
      value: 0,
      component: 'Expenses',
      show: true,
      isLoading: true,
    },
  ];

  elements.map((element, index) => {
    switch (element.component) {
      case 'Income':
        elements[index].value = totalIncome;
        // elements[index].show = totalMembers > 0;
        elements[index].isLoading = isLoadingIncome;
        summaries.total_income = element.value;
        break;
      case 'Expenses':
        elements[index].value = totalExpense;
        // elements[index].show = totalCredits > 0;
        elements[index].isLoading = isLoadingExpense;
        summaries.total_expense = element.value;
        break;
      default:
        break;
    }
  });
  return (
    <View>
      <Summary
        title={l_summaries.total_income}
        value={summaries.total_income}
      />
      <Summary
        title={l_summaries.total_expenses}
        value={summaries.total_expense}
      />
      <Summary
        title={l_summaries.total_credits}
        value={summaries.total_income - summaries.total_expense}
      />

      <View style={{...globalStyle.grid_container, paddingBottom: 100}}>
        {elements.map((card, index) => {
          let modal = null;

          switch (card.component) {
            case 'Expenses':
              modal = (
                <AddExpense
                  visible={visible}
                  onDismiss={() => setVisible(false)}
                />
              );
              break;

            case 'Income':
              modal = (
                <AddIncome
                  visible={addIncomeVisible}
                  onDismiss={() => setAddIncomeVisible(false)}
                />
              );
              break;

            default:
              break;
          }
          if (card.value !== 0 || card.show) {
            return (
              <View key={index} style={{...plus_style.report_card}}>
                {modal && modal}
                <Card>
                  <Card.Content>
                    <TouchableOpacity
                      onPress={() => navigation.navigate(card.component)}>
                      <Text style={{alignSelf: 'center'}}>{card.title}</Text>
                    </TouchableOpacity>
                    {card.isLoading && <Loading style={{padding: 13}} />}
                    {!card.isLoading && (
                      <View
                        style={{...globalStyle.grid_container, marginTop: 10}}>
                        <TouchableOpacity
                          onPress={() => navigation.navigate(card.component)}>
                          <Title style={{marginTop: 6}}>{card.value}</Title>
                        </TouchableOpacity>
                        {/* <Button onPress={() => alert('Hi')}>
                          <Ionicons name="add" size={24} />
                        </Button> */}
                        <Button
                          onPress={() => setVisible(true)}
                          style={{display: 'true'}}>
                          <Ionicons name="remove-outline" size={24} />
                        </Button>
                        <Button onPress={() => setAddIncomeVisible(true)}>
                          <Ionicons name="add" size={24} />
                        </Button>
                      </View>
                    )}
                  </Card.Content>
                </Card>
              </View>
            );
          }
        })}
      </View>
    </View>
  );
}
