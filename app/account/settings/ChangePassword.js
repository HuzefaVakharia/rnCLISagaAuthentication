import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, ToastAndroid, View} from 'react-native';
import {Appbar, Button, TextInput, useTheme} from 'react-native-paper';
import {changePassword} from '../account.action';
import {useDispatch, useSelector} from 'react-redux';
import {Icon} from 'react-native-elements';
import globalStyle from '../../style';

export default function ChangePassword({navigation}) {
  const [hidden, setHidden] = useState(true);
  const [password, setPassword] = useState('');
  const [newHidden, setNewHidden] = useState(true);
  const [newPassword, setNewPassword] = useState('');
  const [confirmHidden, setConfirmHidden] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState('');
  const isLoading = useSelector(state => state.activeUser.isLoading);
  const {colors} = useTheme();

  const dispatch = useDispatch();

  const updateButton = () => {
    if (password && newPassword && confirmPassword) {
      if (newPassword === confirmPassword) {
        dispatch(
          changePassword({
            password: password,
            newPassword: newPassword,
            confirmPassword: confirmPassword,
          }),
        );
      } else {
        ToastAndroid.show('New passwords must match.', ToastAndroid.SHORT);
      }
    } else {
      ToastAndroid.show('Please fill all fields.', ToastAndroid.SHORT);
    }
  };

  return (
    <SafeAreaView
      style={{...StyleSheet.absoluteFill, ...globalStyle.container}}>
      <Appbar.Header>
        <Appbar.Action icon="arrow-left" onPress={() => navigation.pop()} />
        <Appbar.Content title={'Change Password'} />
      </Appbar.Header>

      <View style={globalStyle.form_container}>
        <TextInput
          onChangeText={value => {
            setPassword(value);
          }}
          secureTextEntry={hidden}
          label="Enter Current Password"
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
              onPress={() => setHidden(!hidden)}
            />
          }
          autoCapitalize={'none'}
        />

        <TextInput
          onChangeText={value => {
            setNewPassword(value);
          }}
          secureTextEntry={newHidden}
          label="Enter New Password"
          style={globalStyle.mb5}
          right={
            <TextInput.Icon
              name={() => (
                <Icon
                  color={colors.inputIcon}
                  name={newHidden ? 'visibility-off' : 'visibility'}
                  size={24}
                />
              )}
              onPress={() => setNewHidden(!newHidden)}
            />
          }
          autoCapitalize={'none'}
        />

        <TextInput
          onChangeText={value => {
            setConfirmPassword(value);
          }}
          secureTextEntry={confirmHidden}
          label="Enter Confirm Password"
          style={globalStyle.mb5}
          right={
            <TextInput.Icon
              name={() => (
                <Icon
                  color={colors.inputIcon}
                  name={confirmHidden ? 'visibility-off' : 'visibility'}
                  size={24}
                />
              )}
              onPress={() => setConfirmHidden(!confirmHidden)}
            />
          }
          autoCapitalize={'none'}
        />

        <Button
          mode={'contained'}
          contentStyle={globalStyle.big_button}
          loading={isLoading}
          onPress={() => {
            updateButton();
          }}>
          Update
        </Button>
      </View>
    </SafeAreaView>
  );
}
