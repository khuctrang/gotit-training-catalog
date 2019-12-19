import React from 'react';
import PropTypes from 'prop-types';
import BaseModal from '../Base/BaseModal';
import BaseForm from '../Base/BaseForm';

export default class BaseFormModal extends React.Component {
  state = this.props.initialState

  onInputChange = (e) => {
    const { name, value } = e.target;
    const { inputValue } = this.state;
    this.setState({ inputValue: { ...inputValue, [name]: value } })
  }

  onFormSubmit = async () => {
    const { onAction, initialState } = this.props;
    const { inputValue } = this.state;
    const res = await onAction(inputValue);
    if (!res.success) {
      this.setState((typeof res.message === 'object')
        ? { inputError: res.message }
        : { inputError: {}, requestError: res.message })
    } else this.setState(initialState)
  }

  onKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.onFormSubmit();
    }
  }

  render() {
    const {
      inputValue, inputError, requestError,
    } = this.state;
    const { fields } = this.props;
    return (
      <div onKeyDown={(e) => this.onKeyDown(e)}>
        <BaseModal title="SIGNIN" onAccept={() => this.onFormSubmit()}>
          <BaseForm onInputChange={(e) => this.onInputChange(e)} inputValue={inputValue} inputError={inputError} requestError={requestError} fields={fields} />
        </BaseModal>
      </div>
    )
  }
}

BaseFormModal.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.string,
  })),
  initialState: PropTypes.shape({
    inputValue: PropTypes.object,
    inputError: PropTypes.object,
    requestError: PropTypes.string,
  }),
  onAction: PropTypes.func.isRequired,
}