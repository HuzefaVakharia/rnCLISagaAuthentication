import React from 'react';
import {ActivityIndicator} from 'react-native-paper';

export default function Loading({style}) {
  return <ActivityIndicator animating={true} style={{padding: 20, ...style}} />;
}
