/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
/* eslint-disable eol-last */

import {createStore, applyMiddleware} from 'redux';
import {configureStore} from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga';
import rootReducers, {whitelist} from './root-reducer';
import {rootSaga} from './root-saga';
import {persistStore, persistReducer} from 'redux-persist';

import AsyncStorage from '@react-native-async-storage/async-storage';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: whitelist,
};

/* 
Here's an explanation of how whitelist and blacklist work in Redux Persist: Whitelist: By specifying an array of keys in the whitelist property, you can choose which reducers' state should be persisted. Only the state of the specified reducers will be saved and restored upon app reload.

Ref: https://dev.to/bhatvikrant/redux-persist-v6-in-detail-react-10nh 

*/

const persist_reducer = persistReducer(persistConfig, rootReducers);
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer:persist_reducer,
  middleware:()=>[sagaMiddleware, thunk]
  //applyMiddleware(sagaMiddleware, thunk),
});
sagaMiddleware.run(rootSaga);

export const persist_store = persistStore(store);
export default store;
