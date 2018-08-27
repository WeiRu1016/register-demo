import React from 'react';
import PropTypes from 'proptypes';
import ClassNames from 'classnames';
import './radio.css';

const radio = ({
  name,
  value,
  onChange,
  checked,
  disabled,
  inputName,
}) => {
  const id = `${Math.random().toString(36).substr(2)}`;
  const classNames = ClassNames(['radio-inner', {
    'radio-checked': checked,
    'radio-disabled': disabled,
  }]);
  return (
    <span>
      <label htmlFor={id} className="radio">
        <span className={classNames} />
        <span className="radio-label">{name}</span>
        <input
          name={inputName}
          type="radio"
          hidden
          value={value}
          id={id}
          checked={checked}
          onChange={onChange}
        />
      </label>
    </span>
  );
};
radio.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  inputName: PropTypes.string,
};
radio.defaultProps = {
  checked: false,
  onChange: () => {},
  disabled: false,
  inputName: '',
};
export default radio;
