import React, { Component } from 'react';
import './style.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        name: {
          value: '',
          error: '',
          rules: [{
            rule: value => !value || !value.trim(),
            msg: '请输入名称',
          }, {
            rule: value => value.length > 10,
            msg: '名称不允许超过10个字符',
          }],
        },
        password: {
          value: '',
          error: '',
          rules: [{
            rule: value => !value || !value.trim(),
            msg: '请输入密码',
          }, {
            rule: value => value.length > 10,
            msg: '密码不允许超过10个字符',
          }],
        },
        exmail: {
          value: '',
          error: '',
          rules: [{
            rule: value => !value || !value.trim(),
            msg: '请输入邮箱',
          }, {
            rule: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/,
            msg: '请输入正确格式的邮箱',
          }],
        },
        gender: {
          value: '',
          error: '',
          rules: [{
            rule: value => !value || !value.trim(),
            msg: '请选择性别',
          }],
        },
      },
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { formData } = this.state;
    const keys = Object.keys(formData);

    if (keys.some(key => formData[key].error)) {
      return;
    }
    let hasError = false;
    keys.forEach((key) => {
      const item = formData[key];
      const error = this.validate(item.rules, item.value);
      formData[key].error = error;
      this.setState({
        formData: {
          ...formData,
        },
      });
      if (!hasError && error) {
        hasError = true;
      }
    });
    if (hasError) {
      return;
    }
    const data = {};
    keys.forEach((key) => { data[key] = formData[key].value; });
    window.fetch('/test', {
      method: 'post',
      body: JSON.stringify(data),
    });
  }

  validate = (rules, value) => {
    for (let i = 0; i < rules.length; i += 1) {
      const { rule, msg } = rules[i];
      if (typeof rule === 'function') {
        if (rule(value)) {
          return msg;
        }
      } else if (rule instanceof RegExp) {
        if (!rule.test(value)) {
          return msg;
        }
      }
    }
    return '';
  }

  handleChange = (key, e) => {
    const { value } = e.target;
    /* eslint react/destructuring-assignment: 0 */
    const { formData } = this.state;
    const item = formData[key];
    const error = this.validate(item.rules, value);
    formData[key] = {
      ...item,
      value,
      error,
    };

    this.setState({
      formData: {
        ...formData,
      },
    });
  }

  render() {
    const {
      name,
      password,
      exmail,
      gender,
    } = this.state.formData;

    return (
      <div className="container">
        <h2>用户注册</h2>
        <form onSubmit={this.handleSubmit} ref={(node) => { this.$form = node; }}>
          <div className="form-item">
            <span className="form-item-label">名称：</span>
            <div className="form-item-input">
              <input
                name="name"
                placeholder="请输入名称"
                type="text"
                value={name.value}
                onChange={e => this.handleChange('name', e)}
              />
              <div className="form-item-error">{name.error}</div>
            </div>
          </div>
          <div className="form-item">
            <span className="form-item-label">密码：</span>
            <div className="form-item-input">
              <input
                name="password"
                placeholder="请输入密码"
                type="password"
                value={password.name}
                onChange={e => this.handleChange('password', e)}
              />
              <div className="form-item-error">{password.error}</div>
            </div>
          </div>
          <div className="form-item">
            <span className="form-item-label">性别：</span>
            <div className="form-item-input">
              <input
                type="radio"
                name="gender"
                value="fale"
                checked={gender.value === 'fale'}
                onChange={e => this.handleChange('gender', e)}
              />
              男
              <input
                type="radio"
                name="gender"
                value="mefale"
                checked={gender.value === 'mefale'}
                onChange={e => this.handleChange('gender', e)}
              />
              女
              <div className="form-item-error">{gender.error}</div>
            </div>
          </div>
          <div className="form-item">
            <span className="form-item-label">邮箱：</span>
            <div className="form-item-input">
              <input
                name="exmail"
                placeholder="请输入邮箱"
                type="exmail"
                value={exmail.value}
                onChange={e => this.handleChange('exmail', e)}
              />
              <div className="form-item-error">{exmail.error}</div>
            </div>
          </div>
          <button type="submit" className="form-submit-btn">提交</button>
        </form>
      </div>
    );
  }
}
export default App;
