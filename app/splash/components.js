import {Dimensions, Image, View} from 'react-native';
import React from 'react';

export function Logo({style, containerStyle}) {
  return (
    <View
      style={{
        alignSelf: 'center',
        alignContent: 'center',
        width: '100%',
        marginTop: 15,
        maxHeight: parseInt('' + Dimensions.get('screen').height * 0.1),
        ...containerStyle,
      }}>
      <Image
        source={require('../../assets/logo.png')}
        style={{
          maxWidth: parseInt('' + Dimensions.get('screen').width * 0.5),
          maxHeight: parseInt('' + Dimensions.get('screen').height * 0.1),
          alignSelf: 'center',
          resizeMode: 'contain',
          ...style,
        }}
      />
    </View>
  );
}
