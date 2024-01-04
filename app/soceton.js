/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
/* eslint-disable eol-last */



import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';
export const BASE_URL = 'https://api.soceton.com/';
//export const BASE_URL = 'http://192.168.0.211:7000/';

export const REQUEST_DELAY_BIG = 2000;
export const REQUEST_DELAY_SMALL = 1000;

const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export function formatAMPM(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  return hours + ':' + minutes + ' ' + ampm;
}

export function formatDateTime(date) {
  if (!date) {
    return date;
  }

  let local = new Date(date);

  if (local.toString() === 'Invalid Date') {
    date = date.split(' ');
    local = new Date(date[0] + 'T' + date[1] + 'Z');
  }
  return (
    formatAMPM(local) +
    ' - ' +
    local.getDate() +
    ' ' +
    monthNames[local.getMonth()] +
    ', ' +
    local.getFullYear()
  );
}

export function getHandler(url) {
  return url.replace(BASE_URL, '');
}

export async function post(handler, payload) {
  return axios.post(BASE_URL + handler, payload);
}
/* 
This above post() method which is user defined will post our payload to our online server
*/

export const socialLogin = async (provider, token) => {
  try {
    const result = await post('api/auth/oauth/login', {
      provider: provider,
      access_token: token,
    });
    return result.data;
  } catch (err) {
    console.log(err);
  }
  return null;
};

export async function get(handler, payload = false) {
  let options = {
    method: 'GET',
    url: handler,
    baseURL: BASE_URL,
  };
  if (payload) {
    options.data = payload;
  }
  return axios(options);
}

export async function put(handler, payload = false) {
  let options = {
    method: 'PUT',
    url: handler,
    baseURL: BASE_URL,
  };
  if (payload) {
    options.data = payload;
  }
  return axios(options);
}
/*
Case 1: I am going to use my AXIOS structure by passing the values provided inside soceton.js function with name put() and see what res
i get in return
*/

export const myAXIOSPutRequest = async (handler, payload = false) => {
  const res = await axios({
    method: 'PUT',
    url: handler,
    baseURL: BASE_URL,
  });
  return res;
};

/* export const myAXIOSPutRequest = async (id, data) => {
  const res = await axios({
    method: 'PUT',
    url: 'https://jsonplaceholder.typicode.com/posts/' + id,
    data: data,
  });
  return res;
}; */

export async function authorizedPost(handler, payload = false) {
  const token = await AsyncStorage.getItem('token');
  console.log('22.Token inside authorizedPost got is: ', token);
  let options = {
    method: 'POST',
    headers: {Authorization: 'Token ' + token},
    url: handler,
    baseURL: BASE_URL,
  };
  if (payload) {
    options.data = payload;
  }
  return axios(options);
}

export async function authorizedDelete(handler, payload = false) {
  const token = await AsyncStorage.getItem('token');
  let options = {
    method: 'DELETE',
    headers: {Authorization: 'Token ' + token},
    url: handler,
    baseURL: BASE_URL,
  };
  if (payload) {
    options.data = payload;
  }
  return axios(options);
}

export async function authorizedPut(handler, payload = false) {
  const token = await AsyncStorage.getItem('token');
  let options = {
    method: 'PUT',
    headers: {Authorization: 'Token ' + token},
    url: handler,
    baseURL: BASE_URL,
  };
  if (payload) {
    options.data = payload;
  }
  return axios(options);
}

export async function authorizedGet(handler, payload = false) {
  const token = await AsyncStorage.getItem('token');
  let options = {
    method: 'GET',
    headers: {Authorization: 'Token ' + token},
    url: handler,
    baseURL: BASE_URL,
  };
  if (payload) {
    options.data = payload;
    //alert('payload from authorizedGet() function is True:' + payload);
  }
  else{
    //alert('payload from authorizedGet() function is False and handler is:' + handler+'And Payload is:'+payload);
    /* alert('payload from authorizedGet() function is False and payload is:' + payload+'options.data is:'+options.data+' ,And full options is:'+JSON.stringify(options)); */
  }
  return axios(options);
}
