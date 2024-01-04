import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  ToastAndroid,
  View,
} from 'react-native';
import globalStyle from '../../style';
import {Appbar, Button, TextInput, useTheme} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {updateUser} from '../account.action';
import {Icon} from 'react-native-elements';
const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default function Settings({navigation}) {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [hidden, setHidden] = useState(true);
  const [password, setPassword] = useState('');

  const user = useSelector(state => state.activeUser.data);
  const isLoading = useSelector(state => state.activeUser.isLoading);
  const disabled = useSelector(state => state.activeUser.social_auth);

  const {colors} = useTheme();

  useEffect(function () {
    setEmail(user.email);
    setFirstName(user.first_name);
    setLastName(user.last_name);
    // eslint-disable-next-line
  }, []);

  const toggleEye = () => {
    setHidden(!hidden);
  };

  const dispatch = useDispatch();
  const updateButton = () => {
    if (email && password && firstName && lastName) {
      if (emailRegex.test(email)) {
        dispatch(
          updateUser({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
          }),
        );
      } else {
        ToastAndroid.show('Please enter validate email', ToastAndroid.SHORT);
      }
    } else {
      ToastAndroid.show('Please fill all fields', ToastAndroid.SHORT);
    }
  };

  return (
    <SafeAreaView
      style={{...globalStyle.container, ...StyleSheet.absoluteFill}}>
      <Appbar.Header>
        <Appbar.Action icon="arrow-left" onPress={() => navigation.pop()} />
        <Appbar.Content title={'Account Settings'} />
      </Appbar.Header>
      <ScrollView>
        <View style={globalStyle.form_container}>
          <TextInput
            onChangeText={value => {
              setEmail(value);
            }}
            value={email}
            label="Email"
            keyboardType="email-address"
            style={globalStyle.mb5}
            right={
              <TextInput.Icon
                name={() => (
                  <Icon color={colors.inputIcon} name={'mail'} size={24} />
                )}
              />
            }
            autoCapitalize={'none'}
            onFocus={false}
            disabled={disabled}
          />

          <TextInput
            onChangeText={value => {
              setFirstName(value);
            }}
            value={firstName}
            label="First Name"
            style={globalStyle.mb5}
            right={
              <TextInput.Icon
                name={() => (
                  <Icon color={colors.inputIcon} name={'person'} size={24} />
                )}
              />
            }
            autoCapitalize={'none'}
            disabled={disabled}
          />

          <TextInput
            onChangeText={value => {
              setLastName(value);
            }}
            value={lastName}
            label="Last Name"
            style={globalStyle.mb5}
            right={
              <TextInput.Icon
                name={() => (
                  <Icon color={colors.inputIcon} name={'person'} size={24} />
                )}
              />
            }
            autoCapitalize={'none'}
            disabled={disabled}
          />

          <TextInput
            onChangeText={value => {
              setPassword(value);
            }}
            secureTextEntry={hidden}
            label="Current Password"
            style={globalStyle.mb5}
            right={
              <TextInput.Icon
                name={() => (
                  <Icon
                    color={colors.inputIcon}
                    name={hidden ? 'visibility-off' : 'visibility'}
                    size={24}
                  />
                )}
                onPress={() => toggleEye()}
              />
            }
            autoCapitalize={'none'}
            disabled={disabled}
          />
          <Button
            mode={'contained'}
            contentStyle={globalStyle.big_button}
            loading={isLoading}
            disabled={disabled}
            onPress={() => {
              updateButton();
            }}>
            Update
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
