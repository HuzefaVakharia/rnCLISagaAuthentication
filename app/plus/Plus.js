import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import globalStyle from '../style';
import {Button, Card, Paragraph, Text} from 'react-native-paper';
import {plus_style} from './plus.styles';
import {useSelector} from 'react-redux';
import AddReportModal from '../reports/components/AddReportModal';
import AddToReportMess from './components/AddToReportMess';
import NoBody from './components/NoBody';
import AddToReportPersonal from './components/AddToReportPersonal';

export default function Plus({navigation}) {
  const [visible, setVisible] = useState(false);
  const l_report = useSelector(state => state.language.translation.plus.report);

  const report = useSelector(state => state.activeReport.data);
  const me = useSelector(state => state.activeReport.me);

  return (
    <SafeAreaView
      style={{...globalStyle.container, ...StyleSheet.absoluteFill}}>
      <ScrollView
        contentContainerStyle={{...globalStyle.scrollViewBottomButtons}}>
        <Card>
          <TouchableOpacity onPress={() => setVisible(true)}>
            <Card.Content
              style={{...plus_style.content, maxWidth: '80%', height: 'auto'}}>
              {/*<Title style={plus_style.texts_create_cards}>{l_report.create_report}</Title>*/}
              <Paragraph
                style={{...plus_style.texts_create_cards, marginTop: 30}}>
                {l_report.create_report_desc}
              </Paragraph>
            </Card.Content>
            <Card.Cover source={require('../../assets/create-report.png')} />
          </TouchableOpacity>
          <Card.Actions style={plus_style.action_style}>
            <Button onPress={() => setVisible(true)}>
              {l_report.create_report}
            </Button>
          </Card.Actions>
        </Card>
        <AddReportModal
          navigation={navigation}
          visible={visible}
          onDismiss={() => setVisible(false)}
        />
        {!report.title && <NoBody />}
        {me.position === 'Member' && (
          <Text style={{margin: 10}}>{l_report.no_permission}</Text>
        )}
        {report.title &&
          me.position !== 'Member' &&
          report.report_type === 'Mess' && <AddToReportMess report={report} />}
        {report.title && report.report_type === 'Personal' && (
          <AddToReportPersonal report={report} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
