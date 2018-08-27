import React, { Component } from 'react';
import PropTypes from 'proptypes';
import Radio from '../Radio/Radio';

class RadioGroup extends Component {
  static defaultProps = {
    value: '',
    onChange: () => {},
    name: '',
  }

  static propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    options: PropTypes.array.isRequired,
    onChange: PropTypes.func,
    name: PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.state = {
      value: props.value || '',
    };
  }

  handleChange = (value) => {
    console.log('radioGroup', value);
    this.setState({
      value,
    });
    const { onChange } = this.props;
    if (onChange) {
      onChange(value);
    }
  }

  render() {
    const { options, name } = this.props;
    const { value } = this.state;
    if (!options || options.length === 0) {
      throw Error('参数options错误');
    }
    return (
      <div className="radio-group">
        {
          options.map((item) => {
            const checked = (item.value === value);
            return (
              <Radio
                key={item.value}
                checked={checked}
                {...item}
                inputName={name}
                onChange={() => this.handleChange(item.value)}
              />
            );
          })
        }
      </div>
    );
  }
}

export default RadioGroup;
