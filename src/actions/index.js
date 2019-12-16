import actionTypes from './types';
import { request } from '../api';

/* export const fetchItem = () => ({
  type: actionTypes.FETCH_ITEM,
  promise: request('/item', { method: 'GET' }),
}); */

/* body = {
  'username': 'username',
  'email': 'email',
  'name': 'name',
  'password': 'password'
}; */
export const signupUser = (body) => ({
  type: actionTypes.SIGNUP_USER,
  promise: request('/user', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  }),
});

/* body = {
  'username': 'username',
  'email': 'email',
  'name': 'name',
  'password': 'password'
}; */
export const loginUser = (body) => ({
  type: actionTypes.LOGIN_USER,
  promise: request('/user', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  }),
});

export const logoutUser = () => ({
  //sync
})

export const fetchCategory = (offset = 0, limit = 10) => ({
  type: actionTypes.FETCH_CATEGORY,
  promise: request(`/categories/?offset=${offset}&limit=${limit}`, {
    method: 'GET',
  }),
});

export const 