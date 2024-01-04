import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import globalStyle from '../style';

export default function Notification({navigation}) {
  return (
    <SafeAreaView
      style={{...globalStyle.container, ...StyleSheet.absoluteFill}}>
      <View style={{color: '#8F92A1', alignSelf: 'center', marginTop: 250}}>
        <Text style={{alignSelf: 'center'}}>Notification</Text>
      </View>
    </SafeAreaView>
  );
}
