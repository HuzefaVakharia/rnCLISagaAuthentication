import {StatusBar, StyleSheet, Platform} from 'react-native';
import {DefaultTheme} from 'react-native-paper';

export const normal = {
  ...DefaultTheme,
  roundness: 2,
  statusBarType: 'light-content',
  colors: {
    ...DefaultTheme.colors,
    primary: '#7b03fc',
    background: '#faf5ff',
    surface: '#FFFFFF',
    accent: '#fc0394',
    error: '#B71C1C',
    text: '#263238',
    onSurface: '#b54dff',
    onBackground: '#6f00f5',
    disabled: '#c399fe',
    placeholder: '#c399fe',

    danger: '#B71C1C',
    inputIcon: '#6f00f5',
    inactiveBottomTab: '#FFFFFF99',
    activeBottomTab: '#FFFFFF',
    statusBar: '#5700b5',
  },
};

const globalStyle = StyleSheet.create({
  container: {
    // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  },
  container_no_header: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  mt5: {
    marginTop: 5,
  },
  mb5: {
    marginBottom: 5,
  },
  mt10: {
    marginTop: 10,
  },
  pb150: {
    paddingBottom: 150,
  },
  pb500: {
    paddingBottom: 500,
  },
  container_padding: {
    padding: 20,
  },
  footer: {
    // marginBottom:
  },
  grid_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  footer_button_container: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    padding: 10,
  },
  footer_button: {
    marginLeft: 10,
  },
  modal_footer: {
    width: '100%',
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  modal_button: {
    marginTop: 10,
    marginLeft: 10,
  },
  button_add: {
    margin: 10,
  },
  modal_button_cancel: {
    marginTop: 10,
    marginLeft: 10,
    backgroundColor: normal.colors.danger,
  },
  scrollViewBottomButtons: {
    paddingBottom: 150,
    padding: 10,
  },
  reports: {
    padding: 10,
  },
  form_container: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingRight: 10,
    paddingLeft: 10,
  },
  big_button: {
    padding: 20,
  },
  list_detail_container: {
    width: '100%',
    alignSelf: 'flex-end',
    backgroundColor: 'white',
    paddingBottom: 20,
    paddingTop: 8,
  },
  list_detail_item: {
    height: 35,
    padding: 0,
    width: '80%',
    alignSelf: 'flex-end',
    justifyContent: 'center',
  },
});

export default globalStyle;
