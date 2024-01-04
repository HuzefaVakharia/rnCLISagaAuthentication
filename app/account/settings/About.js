import React from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import globalStyle from '../../style';
import {Appbar, Divider, Paragraph, Title} from 'react-native-paper';
import {useSelector} from 'react-redux';

export default function About({navigation}) {
  const l = useSelector(state => state.language.translation.about);

  return (
    <SafeAreaView
      style={{...globalStyle.container, ...StyleSheet.absoluteFill}}>
      <Appbar.Header>
        <Appbar.Action icon="arrow-left" onPress={() => navigation.pop()} />
        <Appbar.Content title={l.title} />
      </Appbar.Header>
      <ScrollView>
        <View style={{color: '#8F92A1', alignSelf: 'center', marginTop: 24}}>
          <Image
            style={{
              width: parseInt('' + Dimensions.get('screen').width * 0.5),
              resizeMode: 'contain',
            }}
            source={require('../../../assets/logo.png')}
          />
        </View>
        <View style={{color: '#8F92A1', marginBottom: 40, padding: 10}}>
          <Title>{l.heading}</Title>
          <Divider />
          <Paragraph style={{marginTop: 20}}>{l.para0}</Paragraph>
          <Paragraph style={{marginTop: 20}}>{l.para1}</Paragraph>

          <Paragraph style={{marginTop: 20}}>{l.para2}</Paragraph>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
