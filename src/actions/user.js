import { userTypes } from '../constants/actionTypes';
import * as api from '../api';

export const fetchUser = () => ({
  type: 'FETCH_USER',
  promise: api.fetchUser(),
});

export const registerUser = ({
  username, email, name, password,
}) => async (dispatch) => {
  const res = await dispatch({
    type: userTypes.REGISTER_USER,
    promise: api.registerUser({
      username, email, name, password,
    }),
  })
  if (res.success) {
    dispatch(fetchUser());
  }
  return res;
};


export const signinUser = (body) => async (dispatch) => {
  const res = await dispatch({
    type: userTypes.SIGNIN_USER,
    promise: api.signinUser(body),
  });
  if (res.success) {
    dispatch(fetchUser());
  }
  return res;
};


export const signoutUser = () => ({
  // sync
});
