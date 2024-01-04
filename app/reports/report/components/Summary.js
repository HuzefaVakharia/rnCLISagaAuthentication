import {Card, Text, Title} from 'react-native-paper';
import globalStyle from '../../../style';
import React from 'react';

export default function Summary({title, value}) {
  return (
    <Card style={globalStyle.mb5}>
      <Card.Content>
        <Title style={{textAlign: 'center'}}>{value}</Title>
        <Text style={{textAlign: 'center', ...globalStyle.mt10}}>{title}</Text>
      </Card.Content>
    </Card>
  );
}
