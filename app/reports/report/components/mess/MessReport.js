import {useSelector} from 'react-redux';
import {TouchableOpacity, View} from 'react-native';
import globalStyle from '../../../../style';
import React, {useState} from 'react';
import {AddMemberModal} from '../../elements/members/components';
import {AddCreditModal} from '../../elements/credits/components';
import {AddFixedCostModal} from '../../elements/fixed-costs/components';
import {AddMealShoppingModal} from '../../elements/meal-shopping/components';
import {AddMealModal} from '../../elements/meals/components';
import {plus_style} from '../../../../plus/plus.styles';
import {Button, Card, Text, Title} from 'react-native-paper';
import Loading from '../../../../components/Loading';
//import {MaterialIcons} from '@expo/vector-icons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import Summary from '../Summary';

export default function MessReport({navigation, access}) {
  const [visible, setVisible] = useState(false);
  const totalMembers = useSelector(state => state.members.total);
  const totalCredits = useSelector(state => state.credits.total);
  const totalFixedCosts = useSelector(state => state.fixedCosts.total);
  const totalMealShopping = useSelector(state => state.mealShopping.total);
  const totalMeal = useSelector(state => state.meals.total);
  const l_summaries = useSelector(
    state => state.language.translation.report.summaries,
  );

  const isLoadingMembers = useSelector(state => state.members.isLoading);
  const isLoadingCredits = useSelector(state => state.credits.isLoading);
  const isLoadingFixedCosts = useSelector(state => state.fixedCosts.isLoading);
  const isLoadingMealShopping = useSelector(
    state => state.mealShopping.isLoading,
  );
  const isLoadingMeal = useSelector(state => state.meals.isLoading);

  const summaries = {
    total_members: 0,
    total_credits: 0,
    total_fixed_costs: 0,
    total_meal_shopping: 0,
    total_meals: 0,
  };

  const elements = [
    {
      title: l_summaries.elements.members,
      value: 0,
      component: 'Members',
      show: true,
      isLoading: true,
    },
    {
      title: l_summaries.elements.credits,
      value: 0,
      component: 'Credits',
      show: true,
      isLoading: true,
    },
    {
      title: l_summaries.elements.fixed_costs,
      value: 0,
      component: 'FixedCosts',
      show: true,
      isLoading: true,
    },
    {
      title: l_summaries.elements.meal_shopping,
      value: 0,
      component: 'MealShopping',
      show: true,
      isLoading: true,
    },
    {
      title: l_summaries.elements.meals,
      value: 0,
      component: 'Meals',
      show: true,
      isLoading: true,
    },
  ];

  elements.map((element, index) => {
    switch (element.component) {
      case 'Members':
        elements[index].value = totalMembers;
        // elements[index].show = totalMembers > 0;
        elements[index].isLoading = isLoadingMembers;
        summaries.total_members = element.value;
        break;
      case 'Credits':
        elements[index].value = totalCredits;
        // elements[index].show = totalCredits > 0;
        elements[index].isLoading = isLoadingCredits;
        summaries.total_credits = element.value;
        break;
      case 'FixedCosts':
        elements[index].value = totalFixedCosts;
        // elements[index].show = totalFixedCosts > 0;
        elements[index].isLoading = isLoadingFixedCosts;
        summaries.total_fixed_costs = element.value;
        break;
      case 'MealShopping':
        elements[index].value = totalMealShopping;
        // elements[index].show = totalMealShopping > 0;
        elements[index].isLoading = isLoadingMealShopping;
        summaries.total_meal_shopping = element.value;
        break;
      case 'Meals':
        elements[index].value = totalMeal;
        // elements[index].show = totalMeal > 0;
        elements[index].isLoading = isLoadingMeal;
        summaries.total_meals = element.value;
        break;
      default:
        break;
    }
  });

  const total_costs =
    summaries.total_fixed_costs + summaries.total_meal_shopping;
  const total_credits = summaries.total_credits - total_costs;

  let meal_rate = false;
  if (summaries.total_meals !== 0) {
    meal_rate = summaries.total_meal_shopping / summaries.total_meals;
    meal_rate = meal_rate.toFixed(2);
  }

  return (
    <View>
      <Summary
        title={l_summaries.total_amount}
        value={summaries.total_credits}
      />
      <Summary title={l_summaries.total_costs} value={total_costs} />
      <Summary title={l_summaries.total_credits} value={total_credits} />
      {meal_rate && <Summary title={l_summaries.meal_rate} value={meal_rate} />}

      <View style={{...globalStyle.grid_container, paddingBottom: 100}}>
        {elements.map((card, index) => {
          let modal = null;

          switch (card.component) {
            case 'Members':
              modal = (
                <AddMemberModal
                  visible={visible}
                  onDismiss={() => setVisible(false)}
                />
              );
              break;
            case 'Credits':
              modal = (
                <AddCreditModal
                  visible={visible}
                  onDismiss={() => setVisible(false)}
                />
              );
              break;
            case 'FixedCosts':
              modal = (
                <AddFixedCostModal
                  visible={visible}
                  onDismiss={() => setVisible(false)}
                />
              );
              break;
            case 'MealShopping':
              modal = (
                <AddMealShoppingModal
                  visible={visible}
                  onDismiss={() => setVisible(false)}
                />
              );
              break;
            case 'Meals':
              modal = (
                <AddMealModal
                  visible={visible}
                  onDismiss={() => setVisible(false)}
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
                        {access !== 'Member' && (
                          <Button onPress={() => setVisible(true)}>
                            <Ionicons name="add" size={24} />
                          </Button>
                        )}
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
