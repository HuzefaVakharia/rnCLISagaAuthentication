import {StyleSheet} from 'react-native';

const forgotPasswordStyle = StyleSheet.create({
  textInputViewStyle: {
    borderColor: '#8F92A1',
    borderWidth: 1,
    borderRadius: 12,
    paddingLeft: 15,
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textInputStyle: {
    fontSize: 14,
    color: 'black',
    backgroundColor: 'transparent',
    width: '80%',
  },
  container: {
    height: '80%',
    marginTop: 37,
    marginHorizontal: 18,
  },
  iconStyle: {
    alignSelf: 'center',
    marginRight: 10,
  },
  button: {
    alignSelf: 'center',
    height: 56,
    width: 345,
    backgroundColor: '#0FBCF9',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 35,
  },
});

export default forgotPasswordStyle;
