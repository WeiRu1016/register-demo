import React, { Component } from 'react';
import PropTypes from 'proptypes';
import './formItem.css';

class FormItem extends Component {
  static defaultProps = {
    label: '',
    required: false,
    validate: undefined,
    msg: '请输入',
    initvalue: undefined,
    onChange: undefined,
  }

  static propTypes = {
    label: PropTypes.string,
    required: PropTypes.bool,
    validate: PropTypes.func,
    msg: PropTypes.string,
    children: PropTypes.element.isRequired,
    initvalue: PropTypes.any,
    onChange: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      value: props.initvalue,
      error: '',
    };
  }

  handleChange = (e) => {
    const value = e.target ? e.target.value : e;
    const { children, onChange } = this.props;
    this.setState({
      value,
    }, this.validate);
    if (onChange) {
      onChange(value);
    }
    if (children.props.onChange) {
      children.props.onChange(e);
    }
  }

  validate = () => {
    const { value } = this.state;
    const { required, validate, msg } = this.props;
    if (required && this.isEmpty(value)) {
      this.setError(msg);
      return true;
    }
    if (validate) {
      return validate(value, this.setError.bind(this));
    }
    this.setError('');
    return false;
  }

  setError = (error = '') => {
    this.setState({
      error,
    });
  }

  isEmpty = (value) => {
    if (typeof value === 'string') {
      return !value.trim();
    }
    return !value;
  }

  render() {
    const { label, children } = this.props;
    const { value, error } = this.state;

    return (
      <div className="form-item">
        <div className="form-item-body">
          <div className="form-item-label">
            {label}
            ：
          </div>
          <div className="form-item-input">
            <children.type {...children.props} value={value} onChange={this.handleChange} />
            <div className="form-item-error">{error}</div>
          </div>
        </div>
      </div>
    );
  }
}
export default FormItem;
