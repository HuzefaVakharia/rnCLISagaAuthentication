import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import globalStyle from '../../style';
import {Logo} from '../../splash/components';

export default function Logout({navigation}) {
  return (
    <SafeAreaView
      style={{...globalStyle.container, ...StyleSheet.absoluteFill}}>
      <Logo containerStyle={{marginTop: '25%', marginBottom: '15%'}} />
      <View style={{alignSelf: 'center', marginTop: '15%'}}>
        <Text style={{alignSelf: 'center'}}>
          You have been logged out from Soceton Manager.
        </Text>

        <Button
          onPress={() =>
            navigation.reset({
              index: 1,
              routes: [{name: 'Login'}],
            })
          }
          style={{marginTop: '15%'}}>
          LOGIN AGAIN
        </Button>
      </View>
    </SafeAreaView>
  );
}
