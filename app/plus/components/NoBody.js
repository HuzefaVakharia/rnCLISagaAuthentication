import {useSelector} from 'react-redux';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import React from 'react';

export default function NoBody() {
  const no_body = useSelector(state => state.language.translation.plus.no_body);

  return (
    <View style={{marginTop: 25, marginBottom: 25, paddingLeft: 10}}>
      <Text>{no_body}</Text>
    </View>
  );
}
