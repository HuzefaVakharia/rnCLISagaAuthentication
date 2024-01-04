/* eslint-disable no-lone-blocks */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
/* eslint-disable eol-last */


import React, {useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  ToastAndroid,
  Text,
  ScrollView,
  Platform,
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import globalStyle from '../../style';
import {TextInput, useTheme, Button} from 'react-native-paper';
import {login} from './login.action';
import {Icon} from 'react-native-elements';
import {Logo} from '../../splash/components';

/* import {
  AccessToken,
  AuthenticationToken,
  LoginButton,
} from 'react-native-fbsdk-next'; */
import {socialLogin} from '../../soceton';

const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

function Login({navigation}) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidden, setHidden] = useState(true);

  const isLoading = useSelector(state => state.login.isLoading);
  const {colors} = useTheme();

  const loginButton = () => {
    if (email && password) {
      if (emailRegex.test(email)) {
        {
          let payload = {
            email: email,
            password: password,
            navigation: navigation,
          };
          dispatch(login(payload));
          /* 
          From Here our Login process starts after user enters his/her email, password and click on Login button, we will create a payload with email, password and navigation and using dispatch() we will trigger action function call of login(payload)
          
          */
        }
      } else {
        ToastAndroid.show('Please enter validated email', ToastAndroid.SHORT);
      }
    } else {
      ToastAndroid.show('Please fill all fields', ToastAndroid.SHORT);
    }
  };

  /* const facebookLogin = () => {
    AccessToken.getCurrentAccessToken().then(data => {
      if (data) {
        socialLogin('facebook', data?.accessToken.toString()).then(r => {
          if (r) {
            dispatch(
              login({
                token: r.token,
                navigation: navigation,
              }),
            );
          }
        });
      }
    });
  };

  

  useEffect(() => {
    facebookLogin();
    // eslint-disable-next-line
  }, []); */

  return (
    <SafeAreaView
      style={{...globalStyle.container, ...StyleSheet.absoluteFill}}>
      <ScrollView>
        <Logo containerStyle={{marginTop: '20%', marginBottom: '12%'}} />

        <View style={globalStyle.form_container}>
          <TextInput
            onChangeText={value => {
              setEmail(value);
            }}
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
          />
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

          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}>
            <Button
              mode={'contained'}
              style={{width: '49%', minWidth: 140}}
              contentStyle={{...globalStyle.big_button}}
              loading={isLoading}
              onPress={() => {
                navigation.navigate('SignUp', {email, password});
              }}>
              Sign Up
            </Button>
            <Button
              mode={'contained'}
              color={colors.accent}
              style={{width: '49%', minWidth: 140}}
              contentStyle={{...globalStyle.big_button}}
              loading={isLoading}
              onPress={() => {
                loginButton();
              }}>
              Sign In
            </Button>
          </View>
        </View>

        <View>
          <Text style={{color: '#8F92A1', alignSelf: 'center', marginTop: 10}}>
            Forgot Password?
          </Text>
          <Button onPress={() => navigation.navigate('ForgotPassword')}>
            Request Password Change
          </Button>
        </View>

        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginTop: 50,
          }}>
          {/* <LoginButton
            onLoginFinished={(error, result) => {
              if (error) {
                console.log('login has error: ' + error);
              } else if (result.isCancelled) {
                console.log('login is cancelled.');
              } else {
                if (Platform.OS === 'ios') {
                  AuthenticationToken.getAuthenticationTokenIOS().then(data => {
                    console.log(data?.authenticationToken);
                  });
                } else {
                  facebookLogin();
                }
              }
            }}
            loginTrackingIOS={'limited'}
            nonceIOS={'my_nonce'}
          /> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Login;
