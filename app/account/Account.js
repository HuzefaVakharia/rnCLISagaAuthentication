import React from 'react';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import globalStyle from '../style';
import {Appbar, Avatar, Button, Text, useTheme} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {Icon, ListItem} from 'react-native-elements';
//import {MaterialIcons} from '@expo/vector-icons';

import {logout} from './account.action';
import {selectReport} from '../reports/reports.action';
import {initialReport} from '../reports/report/report.reducer';
import {changeLanguage} from './settings/lang/lang';
//import {LoginButton} from 'react-native-fbsdk-next';

function Account({navigation}) {
  const user = useSelector(state => state.activeUser.data);
  const social_auth = useSelector(state => state.activeUser.social_auth);
  const account = useSelector(state => state.language.translation.account);
  //const account = useSelector(state => state.key from combineReducers() function inside root-reducer.js file which is=<language>.with key language the reducer function which is associated is languageReducer and languageReducer() function is present inside lang.reducer.js file and inside this languageReducer() function we have a initial data stored in store which is=<translation>.translation is a kind of json array with key value pain structure inside file en.js and inside this translation array we have another json array with name = <account> and after fetching account array there are entity also with key value pairs where key are account_settings,account_details, change_password, about, so to access the value of this account array we will use dot operator with account array name and after dot operator we will use key name like account_settings to fetch value kept inside account_settings);
  const language = useSelector(state => state.language.language);
  const {colors} = useTheme();
  const list = [
    {
      title: !social_auth ? account.account_settings : account.account_details,
      icon: 'settings',
      component: 'Setting',
      view: true,
    },
    {
      title: account.change_password,
      icon: 'lock',
      component: 'ChangePassword',
      view: !social_auth,
    },
    {
      title: account.about,
      icon: 'info',
      component: 'About',
      view: true,
    },
  ];

  const dispatch = useDispatch();
  const handleLogout = () => {
    /* When we will click on Logout button then two events will be triggered using dispatch() 
    1. logout()
    2. selectReport()
    */

    dispatch(
      logout({
        data: {
          account_id: null,
          avatar_text: 'No',
          first_name: 'None',
          last_name: 'None',
        },
        isLoading: false,
      }),
    );
   
   
   
    dispatch(selectReport(initialReport));
    navigation.reset({
      index: 1,
      routes: [{name: 'Logout'}],
    });

    /* 
    When we want to open already opened screen using navigation with some changes in it then we have to use navigation.reset()
    
    */

  };

  const handleChangeLanguage = lang => {
    dispatch(changeLanguage(lang));
  };

  return (
    <SafeAreaView
      style={{...StyleSheet.absoluteFill, ...globalStyle.container}}>
      
      
      
      
      
      <Appbar.Header>
        <Appbar.Action
          icon={() => <Icon name={'account-box'} color={colors.surface} />}
        />
        <Appbar.Content title={'Soceton Manager'} subtitle={'Menu'} />
      </Appbar.Header>
      
      
      
      
      
      
      
      
      
      
      
      <ScrollView>
        <ListItem
          containerStyle={{marginTop: 20, backgroundColor: colors.surface}}>
          <Avatar.Text size={48} label={user.avatar_text} />
          <ListItem.Content>
            <ListItem.Title>
              {user.first_name} {user.last_name}
            </ListItem.Title>
            <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
       
       
       
       
        <View style={{marginTop: 20}}>
          {list.map((item, i) => {
            if (item.view) {
              return (
                <ListItem
                  containerStyle={{backgroundColor: colors.surface}}
                  key={i}
                  bottomDivider
                  onPress={() => navigation.navigate(item.component)}>
                  <Icon name={item.icon} size={24} color={colors.onSurface} />

                  <ListItem.Content>
                    <ListItem.Title>
                      <Text>Hi Account View:{item.title}</Text>
                    </ListItem.Title>
                  </ListItem.Content>
                  <ListItem.Chevron />
                </ListItem>
              );
            }
          })}
        </View>
        
        
        
        
        
        
        
        
        
        
        
        <View
          style={{
            marginTop: 50,
            flexWrap: 'wrap',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Button
            disabled={language === 'en'}
            mode={'contained'}
            onPress={() => handleChangeLanguage('en')}>
            English
          </Button>
          <Button
            disabled={language === 'bn'}
            mode={'contained'}
            onPress={() => handleChangeLanguage('bn')}>
            Bengali
          </Button>
        </View>
        <View style={{marginTop: 50}}>
          {!social_auth && (
            <ListItem
              containerStyle={{backgroundColor: colors.surface}}
              onPress={() => handleLogout()}>
              <ListItem.Content>
                <ListItem.Title style={{color: 'red', alignSelf: 'center'}}>
                  Logout
                </ListItem.Title>
              </ListItem.Content>
            </ListItem>
          )}

          {social_auth && (
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}>
              {/* <LoginButton
                onLogoutFinished={() => {
                  handleLogout();
                }}
              /> */}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Account;
