import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import validator from 'validator';

import BaseFormModal from 'components/Common/BaseFormModal';
import { registerUser } from 'actions/user';
import { errorMessage, MIN_NAME_LENGTH, MIN_PASSWORD_LENGTH } from 'constants/formValidation';

export const validate = ({
  username, email, password, confirm,
}) => {
  const inputError = {};
  if (username && username.length < MIN_NAME_LENGTH) {
    inputError.username = errorMessage.Username.TOO_SHORT
  }
  if (email && !validator.isEmail(email)) {
    inputError.email = errorMessage.Email.INVALID
  }
  if (password && (password.length < MIN_PASSWORD_LENGTH
    || !validator.isAlphanumeric(password)
    || validator.isAlpha(password)
    || validator.isNumeric(password))) {
    inputError.password = errorMessage.Password.TOO_SIMPLE;
  }
  if (confirm && confirm !== password) {
    inputError.confirm = errorMessage.Password.NOT_MATCH;
  }
  return inputError;
};

export const RegisterModal = ({ registerUser }) => {
  const initialState = {
    inputValue: {
      username: '',
      email: '',
      name: '',
      password: '',
      confirm: '',
    },
    inputError: {
    },
    requestError: '',
  };

  const fields = [
    { name: 'username', type: 'text' },
    { name: 'email', type: 'email' },
    { name: 'name', type: 'text' },
    { name: 'password', type: 'password' },
    { name: 'confirm', type: 'password' },
  ];

  return (
    <BaseFormModal
      title="REGISTER"
      fields={fields}
      initialState={initialState}
      onAction={registerUser}
      validate={validate}
    />
  )
}

RegisterModal.propTypes = {
  registerUser: PropTypes.func.isRequired,
}

export default connect(null, { registerUser })(RegisterModal);
