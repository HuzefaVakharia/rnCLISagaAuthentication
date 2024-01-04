import {useSelector} from 'react-redux';
import {TouchableOpacity, View} from 'react-native';
import {Button, Card, Paragraph, Text, Title} from 'react-native-paper';
import {plus_style} from '../plus.styles';
import React, {useState} from 'react';
import AddIncome from '../../reports/report/elements/income/components/AddIncome';
import {AddExpense} from '../../reports/report/elements/expenses/components/AddExpense';

export default function AddToReportPersonal({report}) {
  const [visible, setVisible] = useState(false);
  const add_to_report = useSelector(
    state => state.language.translation.plus.add_to_report,
  );

  const addToReportOptions = [
    {
      title: add_to_report.add_income.title,
      paragraph: add_to_report.add_income.paragraph,
      image: require('../../../assets/credits.png'),
      button_text: add_to_report.add_income.title,
      slug: 'AddIncome',
    },
    {
      title: add_to_report.add_expense.title,
      paragraph: add_to_report.add_expense.paragraph,
      image: require('../../../assets/costs.png'),
      button_text: add_to_report.add_expense.title,
      slug: 'AddExpense',
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
            case 'AddIncome':
              modal = (
                <AddIncome
                  visible={visible}
                  onDismiss={() => setVisible(false)}
                />
              );
              break;
            case 'AddExpense':
              modal = (
                <AddExpense
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
