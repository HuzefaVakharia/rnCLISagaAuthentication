import React from 'react';
import {Modal, Portal} from 'react-native-paper';

export function FullModalForAddIncome({onDismiss, visible, children}) {
  const containerStyle = {backgroundColor: 'white', padding: 20};
  return (
    <Portal>
      <Modal
        key={12}
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={containerStyle}>
        {children}
      </Modal>
    </Portal>
  );
}
