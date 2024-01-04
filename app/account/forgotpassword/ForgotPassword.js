/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
/* eslint-disable eol-last */

import React, {useState} from 'react';
import {View, SafeAreaView, StyleSheet, ToastAndroid} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import globalStyle from '../../style';
import {Appbar, Button, TextInput, useTheme} from 'react-native-paper';
import {
  updatePassword,
  forgotPassword,
  setForgotPassword,
} from './forgotpassword.action';
import {Icon} from 'react-native-elements';
import {Logo} from '../../splash/components';

const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;








  function EmailInput({setEmail}) {
  const {colors} = useTheme();

  return (

    <TextInput
      onChangeText={value => {
        setEmail(value);
      }}
      label="Email"
      keyboardType="email-address"
      style={globalStyle.mb5}
      right={<TextInput.Icon icon="mail" />}
      autoCapitalize={'none'}
      //onFocus={false}
    />



   
  );
}
















function TokenInput({setToken}) {
  const {colors} = useTheme();
  return (
    <TextInput
      onChangeText={value => {
        setToken(value);
      }}
      placeholder="Token"
      keyboardType="decimal-pad"
      style={globalStyle.mb5}
      right={
        <TextInput.Icon
          name={() => <Icon color={colors.inputIcon} name={'mail'} size={24} />}
        />
      }
      //onFocus={false}
    />
  );
}














function PasswordInput({setPassword, setConfirmPassword}) {
  const [hidden, setHidden] = useState(true);
  const [hidden2, setHidden2] = useState(true);
  const {colors} = useTheme();

  return (
    <View>
      <TextInput
        onChangeText={value => {
          setPassword(value);
        }}
        secureTextEntry={hidden}
        label="Password"
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
          setConfirmPassword(value);
        }}
        secureTextEntry={hidden2}
        label="Confirm Password"
        style={globalStyle.mb5}
        right={
          <TextInput.Icon
            name={() => (
              <Icon
                color={colors.inputIcon}
                name={hidden2 ? 'visibility-off' : 'visibility'}
                size={24}
              />
            )}
            onPress={() => setHidden2(!hidden2)}
          />
        }
        autoCapitalize={'none'}
      />
    </View>
  );
}



















/*ForgotPassword.js files main return and main function defination starts from here below:  */




function ForgotPassword({navigation}) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const isLoading = useSelector(state => state.forgotPassword.isLoading);
  const stage = useSelector(state => state.forgotPassword.stage);

  const forgotPasswordButton = () => {
    if (stage === 0) {
      if (email) {
        if (emailRegex.test(email)) {
          let payload = {
            email: email,
          };
          dispatch(forgotPassword(payload));
        } else {
          ToastAndroid.show('Please enter validate email', ToastAndroid.SHORT);
        }
      } else {
        ToastAndroid.show('Please fill all fields', ToastAndroid.SHORT);
      }
    } else if (stage === 1) {
      let payload = {
        email: email,
        token: token,
        stage: 2,
      };
      dispatch(updatePassword(payload));
    } else {
      let payload = {
        email: email,
        token: token,
        password: password,
        passwordConfirm: confirmPassword,
        stage: 3,
        navigation: navigation,
      };
      dispatch(updatePassword(payload));
    }
  };

  const back = () => {
    dispatch(setForgotPassword({stage: 0}));
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView
      style={{...globalStyle.container, ...StyleSheet.absoluteFill}}>
      
      
      {/* 
      What is Appbar? 

A component to display action items in a bar. It can be placed at the top or bottom. The top bar usually contains the screen title, controls such as navigation buttons, menu button etc. The bottom bar usually provides access to a drawer and up to four actions.
      
In this project we have made default header of Navigation false from syntax in file Navigation.js, see below syntax:

<Stack.Navigator screenOptions={{headerShown: false}}>

and used this Appbar Header from react-native-paper library.


      See demo example at this site: https://callstack.github.io/react-native-paper/docs/components/Appbar/ 
      
       */}
      
      <Appbar.Header>
        <Appbar.BackAction onPress={() => back()} />
        <Appbar.Content title={'Forgot Password'} />
      </Appbar.Header>
      
      
      
      
      
      
      
      <View style={globalStyle.form_container}>
        
        
        <Logo containerStyle={{marginTop: '10%', marginBottom: '15%'}} />
        
        
        
        
        
        {stage === 0 && <EmailInput setEmail={setEmail} />}
        {stage === 1 && <TokenInput setToken={setToken} />}
        {stage === 2 && (
          <PasswordInput
            setPassword={setPassword}
            setConfirmPassword={setConfirmPassword}
          />
        )}

        <Button
          mode={'contained'}
          contentStyle={globalStyle.big_button}
          loading={isLoading}
          onPress={() => {
            forgotPasswordButton();
          }}>
          {stage === 0 && 'Send'}
          {stage === 1 && 'Check'}
          {stage === 2 && 'Update'}
        </Button>
      </View>
    </SafeAreaView>
  );
}

export default ForgotPassword;
