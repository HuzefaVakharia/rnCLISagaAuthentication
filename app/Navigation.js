import globalStyle, {normal} from './style';
import Splash from './splash/Splash';
import Login from './account/login/Login';
import SignUp from './account/signup/SignUp';
import ForgotPassword from './account/forgotpassword/ForgotPassword';
import Home from './home/Home';
import Members from './reports/report/elements/members/Members';
import Credits from './reports/report/elements/credits/Credits';
import MealShopping from './reports/report/elements/meal-shopping/MealShopping';
import FixedCosts from './reports/report/elements/fixed-costs/FixedCosts';
import Meals from './reports/report/elements/meals/Meals';
import Income from './reports/report/elements/income/Income';
import Expenses from './reports/report/elements/expenses/Expenses';
import Logout from './account/logout/Logout';
import Settings from './account/settings/Settings';
import ChangePassword from './account/settings/ChangePassword';
import About from './account/settings/About';
import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import {Button, Text, Title} from 'react-native-paper';
import {View} from 'react-native';
import {Linking} from 'react-native';
import {FullModal} from './components/FullModal';
import analytics from '@react-native-firebase/analytics';

const Stack = createNativeStackNavigator();
function UpdateModal() {
  const [visible, setVisible] = useState(false);
  const [d, setD] = useState(true);
  const l = useSelector(state => state.language.translation.manager);
  const manager = useSelector(state => state.splash.manager);
  const version = 22;
  useEffect(function () {
    if (manager.android && manager.android.version > version) {
      setVisible(true);
    }

    // eslint-disable-next-line
  }, []);
  const update = () => {
    Linking.openURL(
      'http://play.google.com/store/apps/details?id=com.soceton.manager',
    ).then(r => {});
  };

  const dismiss = () => {
    if (
      manager.android &&
      manager.android.version > version &&
      !manager.android.must_update
    ) {
      setD(false);
    } else {
      setD(true);
    }
  };
  return (
    <FullModal visible={d && visible} onDismiss={() => dismiss()}>
      <Title>{l.title}</Title>
      <Text>{l.body}</Text>
      <View style={globalStyle.modal_footer}>
        <Button
          onPress={() => update()}
          mode={'contained'}
          style={globalStyle.modal_button}>
          {l.update}
        </Button>
        {manager.android &&
          manager.android.version > version &&
          !manager.android.must_update && (
            <Button
              onPress={() => dismiss()}
              mode={'contained'}
              style={{...globalStyle.modal_button_cancel}}>
              {l.cancel}
            </Button>
          )}
      </View>
    </FullModal>
  );
}

export default function Navigation() {
  const routeNameRef = React.useRef();
  const navigationRef = React.useRef();

  return (
    <NavigationContainer
      theme={normal}
      ref={navigationRef}
      onReady={() => {
        routeNameRef.current = navigationRef.current.getCurrentRoute().name;
      }}
      onStateChange={async () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.current.getCurrentRoute().name;

        if (previousRouteName !== currentRouteName) {
          await analytics().logScreenView({
            screen_name: currentRouteName,
            screen_class: currentRouteName,
          });
        }
        routeNameRef.current = currentRouteName;
      }}>
      <UpdateModal />
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{title: 'Splash Screen'}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{title: 'Login Screen'}}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{title: 'Sign Up'}}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{title: 'ForgotPassword'}}
        />

        <Stack.Screen
          name="Home"
          component={Home}
          options={{title: 'Soceton - Mess Manager'}}
        />
        <Stack.Screen
          name="Members"
          component={Members}
          options={{title: 'Members'}}
        />
        <Stack.Screen
          name="Credits"
          component={Credits}
          options={{title: 'Credits'}}
        />
        <Stack.Screen
          name="MealShopping"
          component={MealShopping}
          options={{title: 'Meal Shopping'}}
        />
        <Stack.Screen
          name="FixedCosts"
          component={FixedCosts}
          options={{title: 'Fixed Costs'}}
        />
        <Stack.Screen
          name="Meals"
          component={Meals}
          options={{title: 'Meals'}}
        />
        <Stack.Screen
          name="Income"
          component={Income}
          options={{title: 'Income'}}
        />
        <Stack.Screen
          name="Expenses"
          component={Expenses}
          options={{title: 'Expenses'}}
        />

        <Stack.Screen
          name="Logout"
          component={Logout}
          options={{
            title: 'Logout',
            headerStyle: {
              backgroundColor: 'red',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="Setting"
          component={Settings}
          options={{title: 'Settings'}}
        />
        <Stack.Screen
          name="ChangePassword"
          component={ChangePassword}
          options={{title: 'Change Password'}}
        />
        <Stack.Screen
          name="About"
          component={About}
          options={{title: 'About'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
