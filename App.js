import React from 'react';
import {Provider} from 'react-redux';
import {Provider as P} from 'react-native-paper';
import {PersistGate} from 'redux-persist/integration/react';
import store, {persist_store} from './app/store';
import {normal} from './app/style';
import {StatusBar} from 'react-native';
import Navigation from './app/Navigation';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('Loading app...');
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persist_store}>
          <P theme={normal}>
            <Navigation />
            <StatusBar
              backgroundColor={normal.colors.statusBar}
              barStyle={normal.statusBarType}
            />
          </P>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
