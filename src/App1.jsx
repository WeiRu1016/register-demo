import React, { Component } from 'react';
import './style.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        name: '',
        password: '',
        gender: '',
        exmail: '',
      },
      errors: {},
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { errors, formData } = this.state;
    const keys = Object.keys(formData);

    if (Object.keys(errors).some(key => errors[key])) {
      return;
    }
    let hasError = false;
    keys.forEach((key) => {
      const isError = this.validate(key, formData[key]);
      if (isError) {
        hasError = true;
      }
    });
    if (hasError) {
      return;
    }
    window.fetch('/test', {
      method: 'post',
      body: JSON.stringify(formData),
    });
  }

  isEmpty = value => !value || !value.trim();

  validate = (key, value) => {
    let msg = '';
    const { errors } = this.state;
    switch (key) {
      case 'name':
        if (this.isEmpty(value)) {
          msg = '请输入名称';
        } else if (value.length > 10) {
          msg = '名称不允许超过10个字符';
        }
        break;
      case 'password':
        if (this.isEmpty(value)) {
          msg = '请输入密码';
        } else if (value.length > 10) {
          msg = '密码不允许超过10个字符';
        }
        break;
      case 'exmail':
        if (this.isEmpty(value)) {
          msg = '请输入邮箱';
        } else if (!/\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/.test(value)) {
          msg = '请输入正确格式的邮箱';
        }
        break;
      case 'gender':
        if (this.isEmpty(value)) {
          msg = '请选择性别';
        }
        break;
      default:
    }
    errors[key] = msg;
    this.setState({
      errors: {
        ...errors,
      },
    });
    return !!msg;
  }

  handleChange = (key, value) => {
    const { formData } = this.state;
    formData[key] = value;
    this.validate(key, value);

    this.setState({
      formData: {
        ...formData,
      },
    });
  }

  render() {
    const { formData, errors } = this.state;
    const {
      name,
      password,
      gender,
      exmail,
    } = formData;
    return (
      <div className="container">
        <h2>用户注册</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-item">
            <span className="form-item-label">名称：</span>
            <div className="form-item-input">
              <input
                name="name"
                placeholder="请输入名称"
                type="text"
                value={name}
                onChange={e => this.handleChange(e.target.name, e.target.value)}
              />
              <div className="form-item-error">{errors.name}</div>
            </div>
          </div>
          <div className="form-item">
            <span className="form-item-label">密码：</span>
            <div className="form-item-input">
              <input
                name="password"
                placeholder="请输入密码"
                type="password"
                value={password}
                onChange={e => this.handleChange(e.target.name, e.target.value)}
              />
              <div className="form-item-error">{errors.password}</div>
            </div>
          </div>
          <div className="form-item">
            <span className="form-item-label">性别：</span>
            <div className="form-item-input">
              <input
                type="radio"
                name="gender"
                value="fale"
                checked={gender === 'fale'}
                onChange={e => this.handleChange(e.target.name, e.target.value)}
              />
              男
              <input
                type="radio"
                name="gender"
                value="mefale"
                checked={gender === 'mefale'}
                onChange={e => this.handleChange(e.target.name, e.target.value)}
              />
              女
              <div className="form-item-error">{errors.gender}</div>
            </div>
          </div>
          <div className="form-item">
            <span className="form-item-label">邮箱：</span>
            <div className="form-item-input">
              <input
                name="exmail"
                placeholder="请输入邮箱"
                type="exmail"
                value={exmail}
                onChange={e => this.handleChange(e.target.name, e.target.value)}
              />
              <div className="form-item-error">{errors.exmail}</div>
            </div>
          </div>
          <button type="submit" className="form-submit-btn">提交</button>
        </form>
      </div>
    );
  }
}
export default App;
