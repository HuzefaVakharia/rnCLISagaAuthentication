import {
  Avatar,
  Button,
  HelperText,
  TextInput,
  Text,
  Title,
  useTheme,
} from 'react-native-paper';
import {FullModal} from '../../../../components/FullModal';
import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {
  addMemberAsync,
  createMember,
  updateMembersAsync,
} from './members.action';
import {useDispatch, useSelector} from 'react-redux';
//import {MaterialIcons} from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import globalStyle from '../../../../style';

export function AddMemberModal({visible, onDismiss}) {
  const [memberType, setMemberType] = useState('Member');
  const [email, setEmail] = useState('');
  const [error, setError] = useState([]);

  const member_id = useSelector(state => state.members.data.length);
  const l = useSelector(state => state.language.translation.members.add);
  const {colors} = useTheme();

  const dispatch = useDispatch();

  const add = () => {
    createMember(email, memberType, member_id).then(result => {
      if (!result.errors) {
        dispatch(addMemberAsync(result));

        onDismiss();
        setEmail('');
        setMemberType('Member');
      } else {
        setError(result.errors);
      }
    });
  };

  return (
    <View>
      <FullModal visible={visible} onDismiss={() => onDismiss()}>
        <Title>Add Member</Title>
        <TextInput
          onChangeText={text => {
            setEmail(text);
            setError([]);
          }}
          label={'Member Email'}
          keyboardType="email-address"
        />
        <HelperText type="error" visible={error.includes('email')}>
          Email address is invalid!
        </HelperText>
        <Picker
          selectedValue={memberType}
          style={{height: 70, color: colors.text}}
          onValueChange={(itemValue, itemIndex) => setMemberType(itemValue)}>
          <Picker.Item label="Member" value="Member" />
          <Picker.Item label="Manager" value="Manager" />
        </Picker>

        <View style={globalStyle.modal_footer}>
          <Button
            onPress={() => add()}
            mode={'contained'}
            style={globalStyle.modal_button}>
            {l.add}
          </Button>
          <Button
            onPress={() => onDismiss()}
            mode={'contained'}
            style={globalStyle.modal_button_cancel}>
            {l.cancel}
          </Button>
        </View>
      </FullModal>
    </View>
  );
}

export function UpdateMemberModal({selected, onUpdate}) {
  const [visible, setVisible] = useState(false);
  const [memberType, setMemberType] = useState('Member');

  const members = useSelector(state => state.members.data);
  const l = useSelector(state => state.language.translation.members.update);
  const {colors} = useTheme();
  const dispatch = useDispatch();

  const handleUpdate = () => {
    dispatch(updateMembersAsync({members: selected, position: memberType}));

    onUpdate();
    setVisible(false);
    setMemberType('Member');
  };

  return (
    <View>
      {selected.length > 0 ? (
        <Button
          onPress={() => setVisible(true)}
          mode="contained"
          icon={'account-edit'}
          style={globalStyle.footer_button}>
          {l.opener}
        </Button>
      ) : (
        <View />
      )}
      <FullModal visible={visible} onDismiss={() => setVisible(!visible)}>
        <Title>Update Member</Title>
        <Picker
          selectedValue={memberType}
          style={{height: 70, color: colors.text}}
          onValueChange={(itemValue, itemIndex) => setMemberType(itemValue)}>
          <Picker.Item label="Member" value="Member" />
          <Picker.Item label="Manager" value="Manager" />
        </Picker>
        <Text>Members will be updated to {memberType}</Text>
        <View
          style={{
            paddingTop: 20,
            paddingBottom: 20,
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}>
          {members.map((member, index) => {
            if (selected.includes(index)) {
              return (
                <Avatar.Text
                  style={{marginRight: 5}}
                  key={index}
                  size={32}
                  label={member.account.avatar_text}
                />
              );
            }
          })}
        </View>

        <View style={globalStyle.modal_footer}>
          <Button
            onPress={() => handleUpdate()}
            mode={'contained'}
            style={globalStyle.modal_button}>
            {l.update}
          </Button>
          <Button
            onPress={() => onUpdate()}
            mode={'contained'}
            style={globalStyle.modal_button_cancel}>
            {l.cancel}
          </Button>
        </View>
      </FullModal>
    </View>
  );
}

export function MemberSelector({title, onSelect, members, selectedList}) {
  const toggleSelected = number => {
    if (selectedList.includes(number)) {
      onSelect(selectedList.filter(item => item !== number));
    } else {
      onSelect([...selectedList, number]);
    }
  };

  return (
    <View style={{marginTop: 10}}>
      <Text>{title}</Text>
      <View
        style={{
          paddingTop: 10,
          paddingBottom: 0,
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}>
        {members.map((member, index) => {
          return (
            <TouchableOpacity
              onPress={() => toggleSelected(index)}
              key={index}
              style={{marginRight: 5}}>
              {selectedList.includes(index) ? (
                <Icon
                  name={'check-circle'}
                  style={{
                    position: 'absolute',
                    zIndex: 1,
                    alignSelf: 'center',
                  }}
                  color="green"
                />
              ) : (
                <View />
              )}

              <Avatar.Text size={32} label={member.account.avatar_text} />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
