import {useSelector} from 'react-redux';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import React from 'react';

export default function NoBody() {
  const no_body = useSelector(
    state => state.language.translation.report.no_body,
  );
  return (
    <View style={{color: '#8F92A1', alignSelf: 'center', marginTop: 250}}>
      <Text>{no_body}</Text>
    </View>
  );
}
