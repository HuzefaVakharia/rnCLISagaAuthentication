import {useSelector} from 'react-redux';
import {TouchableOpacity, View} from 'react-native';
import {Button, Card, Paragraph, Text, Title} from 'react-native-paper';
import {plus_style} from '../plus.styles';
import React, {useState} from 'react';
import {AddMemberModal} from '../../reports/report/elements/members/components';
import {AddCreditModal} from '../../reports/report/elements/credits/components';
import {AddFixedCostModal} from '../../reports/report/elements/fixed-costs/components';
import {AddMealShoppingModal} from '../../reports/report/elements/meal-shopping/components';
import {AddMealModal} from '../../reports/report/elements/meals/components';

export default function AddToReportMess({report}) {
  const [visible, setVisible] = useState(false);
  const add_to_report = useSelector(
    state => state.language.translation.plus.add_to_report,
  );

  const addToReportOptions = [
    {
      title: add_to_report.add_member.title,
      paragraph: add_to_report.add_member.paragraph,
      image: require('../../../assets/members.png'),
      button_text: add_to_report.add_member.title,
      slug: 'AddMember',
    },
    {
      title: add_to_report.add_credit.title,
      paragraph: add_to_report.add_credit.paragraph,
      image: require('../../../assets/credits.png'),
      button_text: add_to_report.add_credit.title,
      slug: 'AddCredit',
    },
    {
      title: add_to_report.add_fixed_cost.title,
      paragraph: add_to_report.add_fixed_cost.paragraph,
      image: require('../../../assets/costs.png'),
      button_text: add_to_report.add_fixed_cost.title,
      slug: 'AddFixedCost',
    },
    {
      title: add_to_report.add_meal_shopping.title,
      paragraph: add_to_report.add_meal_shopping.paragraph,
      image: require('../../../assets/shopping.png'),
      button_text: add_to_report.add_meal_shopping.title,
      slug: 'AddMealShopping',
    },
    {
      title: add_to_report.add_meal.title,
      paragraph: add_to_report.add_meal.paragraph,
      image: require('../../../assets/meals.png'),
      button_text: add_to_report.add_meal.title,
      slug: 'AddMeal',
    },
  ];
  return (
    <View>
      <View style={{marginTop: 25, marginBottom: 25, paddingLeft: 10}}>
        <Title>
          <Text style={{fontSize: 14}}>{add_to_report.add_to}</Text>{' '}
          {report.title}
        </Title>
        <Text>{add_to_report.add_to_desc}</Text>
      </View>

      <View style={plus_style.report_card_container}>
        {addToReportOptions.map((card, index) => {
          let modal = null;

          switch (card.slug) {
            case 'AddMember':
              modal = (
                <AddMemberModal
                  visible={visible}
                  onDismiss={() => setVisible(false)}
                />
              );
              break;
            case 'AddCredit':
              modal = (
                <AddCreditModal
                  visible={visible}
                  onDismiss={() => setVisible(false)}
                />
              );
              break;
            case 'AddFixedCost':
              modal = (
                <AddFixedCostModal
                  visible={visible}
                  onDismiss={() => setVisible(false)}
                />
              );
              break;
            case 'AddMealShopping':
              modal = (
                <AddMealShoppingModal
                  visible={visible}
                  onDismiss={() => setVisible(false)}
                />
              );
              break;
            case 'AddMeal':
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
          return (
            <View key={index} style={{...plus_style.report_card}}>
              {modal && modal}
              <Card>
                <TouchableOpacity onPress={() => setVisible(true)}>
                  <Card.Content
                    style={{
                      ...plus_style.content,
                      ...plus_style.report_content,
                    }}>
                    {/*<Title style={{...plus_style.texts_create_cards, fontSize: 14}}>{card.title}</Title>*/}
                    <Paragraph
                      style={{
                        ...plus_style.texts_create_cards,
                        fontSize: 12,
                      }}>
                      {card.paragraph}
                    </Paragraph>
                  </Card.Content>
                  <Card.Cover style={{height: 150}} source={card.image} />
                </TouchableOpacity>

                <Card.Actions style={plus_style.action_style}>
                  <Button onPress={() => setVisible(true)}>
                    {card.button_text}
                  </Button>
                </Card.Actions>
              </Card>
            </View>
          );
        })}
      </View>
    </View>
  );
}
