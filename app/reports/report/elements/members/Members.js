import React, {useEffect, useState} from 'react';
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import globalStyle from '../../../../style';
import {useDispatch, useSelector} from 'react-redux';
import {Appbar, Avatar, Button} from 'react-native-paper';
import {ListItem, CheckBox} from 'react-native-elements';
import {AddMemberModal, UpdateMemberModal} from './components';
import {loadMembers} from './members.action';

function MembersList({members, toggleSelected, selected, edit}) {
  return (
    <View>
      {members.map((member, index) => {
        return (
          <ListItem key={index} bottomDivider>
            <Avatar.Text size={32} label={member.account.avatar_text} />
            <ListItem.Content>
              <ListItem.Title>
                {member.account.first_name} {member.account.last_name}
              </ListItem.Title>
              <ListItem.Subtitle>{member.position}</ListItem.Subtitle>
            </ListItem.Content>
            {edit && (
              <CheckBox
                checked={selected.includes(index)}
                disabled={member.position === 'Admin'}
                onPress={() => {
                  toggleSelected(index);
                }}
              />
            )}
          </ListItem>
        );
      })}
    </View>
  );
}

export default function Members({navigation}) {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState([]);

  const report = useSelector(state => state.activeReport.data);
  const me = useSelector(state => state.activeReport.me);
  const members = useSelector(state => state.members.data);
  const isLoading = useSelector(state => state.members.isLoading);
  const l_members = useSelector(state => state.language.translation.members);

  const toggleSelected = number => {
    if (selected.includes(number)) {
      setSelected(selected.filter(item => item !== number));
    } else {
      setSelected([...selected, number]);
    }
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadMembers());
    // eslint-disable-next-line
  }, []);
  const onRefresh = React.useCallback(() => {
    dispatch(loadMembers());
    // eslint-disable-next-line
  }, []);

  return (
    <SafeAreaView
      style={{...globalStyle.container, ...StyleSheet.absoluteFill}}>
      <Appbar.Header>
        <Appbar.Action icon="arrow-left" onPress={() => navigation.pop()} />
        <Appbar.Content title={l_members.title} subtitle={report.title} />
      </Appbar.Header>
      <ScrollView
        contentContainerStyle={{...globalStyle.scrollViewBottomButtons}}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
        }>
        {members.length === 0 && <Text>{l_members.empty}</Text>}
        {members.length > 0 && (
          <MembersList
            edit={me.position !== 'Member'}
            members={members}
            toggleSelected={toggleSelected}
            selected={selected}
          />
        )}
      </ScrollView>

      <AddMemberModal visible={visible} onDismiss={() => setVisible(false)} />
      <View style={{...globalStyle.footer_button_container}}>
        {members && me.position !== 'Member' && (
          <Button
            onPress={() => setVisible(true)}
            mode="contained"
            icon={'account-plus'}
            style={globalStyle.footer_button}>
            {l_members.add_button}
          </Button>
        )}
        {selected.length > 0 && me.position !== 'Member' && (
          <UpdateMemberModal
            selected={selected}
            onUpdate={() => setSelected([])}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
