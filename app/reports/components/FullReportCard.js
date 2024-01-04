import React, {useState} from 'react';
import {
  Card,
  IconButton,
  Title,
  Text,
  Menu,
  Badge,
  useTheme,
} from 'react-native-paper';
import {ImageBackground, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import UpdateReportModal from './UpdateReportModal';
import {formatDateTime} from '../../soceton';

const image = require('../../../assets/report.png');

export default function FullReportCard({
  report,
  selectReport,
  deleteReport,
  updateReport,
}) {
  const [visible, setVisible] = React.useState(false);
  const [visibleUpdate, setVisibleUpdate] = useState(false);
  const myId = useSelector(state => state.activeUser.data.account_id);
  const l = useSelector(state => state.language.translation.reports);
  const {colors} = useTheme();

  const isAdmin = report.account.account_id === myId;

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const open = () => {
    selectReport();
    closeMenu();
  };
  return (
    <Card>
      <View>
        <View style={{alignSelf: 'flex-end', position: 'absolute'}}>
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={
              <IconButton icon="dots-horizontal" onPress={openMenu}>
                Show menu
              </IconButton>
            }>
            <Menu.Item onPress={open} title={l.open} />
            {isAdmin && (
              <Menu.Item
                onPress={() => {
                  setVisible(false);
                  setVisibleUpdate(true);
                }}
                title={l.update.update}
              />
            )}
            {isAdmin && <Menu.Item onPress={deleteReport} title={l.delete} />}
          </Menu>
        </View>
        <UpdateReportModal
          onDismiss={() => setVisibleUpdate(false)}
          visible={visibleUpdate}
          report_id={report.report_id}
          title={report.title}
        />

        <TouchableOpacity
          style={{alignSelf: 'flex-start', padding: 7, marginRight: 30}}
          onPress={selectReport}>
          <Title>{report.title}</Title>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={selectReport}>
        <ImageBackground
          source={image}
          style={{height: 100, backgroundColor: 'gray'}}>
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              marginBottom: 10,
              marginLeft: 10,
            }}>
            <Badge
              style={{backgroundColor: colors.surface, color: colors.primary}}>
              {l.admin}: {report.account.first_name} {report.account.last_name}
            </Badge>
          </View>
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              marginBottom: 10,
              marginRight: 10,
              right: 0,
            }}>
            <Badge
              style={{backgroundColor: colors.surface, color: colors.primary}}>
              {report.report_type}
            </Badge>
          </View>
        </ImageBackground>
      </TouchableOpacity>
      <TouchableOpacity onPress={selectReport}>
        <Text style={{padding: 10}}>
          {l.last_modified}: {formatDateTime(report.modified_at)}
        </Text>
      </TouchableOpacity>
    </Card>
  );
}
