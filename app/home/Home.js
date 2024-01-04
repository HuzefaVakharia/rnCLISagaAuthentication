import React from 'react';
// import Notification from '../notification/Notification';
import Reports from '../reports/Reports';
import Report from '../reports/report/Report';
import Plus from '../plus/Plus';
import Account from '../account/Account';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
//import Icon from 'react-native-ionicons';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
//import {MaterialIcons} from '@expo/vector-icons';
import {useSelector} from 'react-redux';
import {useTheme} from 'react-native-paper';
const Tab = createMaterialTopTabNavigator();

function Home() {
  const report = useSelector(state => state.activeReport.data);
  const reports = useSelector(state => state.reports.data);
  const {colors} = useTheme();

  const size = 24;
  let initialRoute = 'Reports';
  if (report.report_id) {
    initialRoute = 'Report';
  } else if (reports && reports.length > 0) {
    initialRoute = 'Reports';
  }
  const tabBarOptions = {
    showIcon: true,
    showLabel: true,
    inactiveTintColor: colors.inactiveBottomTab,
    activeTintColor: colors.activeBottomTab,
    style: {
      backgroundColor: colors.primary,
    },
    indicatorStyle: {
      backgroundColor: colors.surface,
    },
  };
  return (
    <Tab.Navigator
      initialRouteName={initialRoute}
      tabBarPosition="bottom"
      tabBarOptions={tabBarOptions}>
      <Tab.Screen
        options={{
          tabBarIcon: ({color, focused}) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
        name="Reports"
        component={Reports}
      />

      <Tab.Screen
        options={{
          tabBarIcon: ({color, focused}) => (
            <MaterialCommunityIcons
              name="view-dashboard"
              size={size}
              color={color}
            />
          ),
        }}
        name="Report"
        component={Report}
      />

      <Tab.Screen
        options={{
          tabBarIcon: ({color, focused}) => (
            <MaterialIcons name="add-box" size={size} color={color} />
          ),
        }}
        name="Plus"
        component={Plus}
      />

      {/*<Tab.Screen options={{*/}
      {/*  tabBarIcon: ({color, focused}) => (*/}
      {/*    <MaterialIcons name="notifications" size={size} color={color} />*/}
      {/*  ),*/}
      {/*}} name="Notification" component={Notification} />*/}

      <Tab.Screen
        options={{
          tabBarIcon: ({color, focused}) => (
            <MaterialIcons name="account-box" size={size} color={color} />
          ),
        }}
        name="Settings"
        component={Account}
      />
    </Tab.Navigator>
  );
}

export default Home;
