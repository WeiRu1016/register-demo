import React, { Component } from 'react';
import 'normalize.css';
import FormItem from './FormItem/FormItem';
import RadioGroup from './RadioGroup/RadioGroup';
import '../styles/style.css';

const gender = [{
  name: '男',
  value: 'male',
}, {
  name: '女',
  value: 'female',
}];

class App extends Component {
  formData = {}

  fields = []

  checkName = (value, callback) => {
    if (value && value.length > 10) {
      callback('名称不允许超过10个字符！');
      return;
    }
    callback();
  }

  checkExmail = (value, callback) => {
    const regx = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
    if (value && !regx.test(value)) {
      callback('请输入正确的邮箱格式！');
      return;
    }
    callback();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let hasError = false;
    this.fields.forEach((node) => {
      const error = node.validate();
      if (!hasError && error) {
        hasError = true;
      }
    });
    if (hasError) {
      return;
    }
    window.fetch('/test', {
      method: 'post',
      body: JSON.stringify(this.formData),
    });
  }

  setField = (key, options) => {
    this.formData[key] = options.initvalue;
    const handleChange = (value) => {
      this.formData[key] = value;
    };
    return element => (
      <FormItem
        {...options}
        onChange={handleChange}
        ref={node => this.fields.push(node)}
      >
        {element}
      </FormItem>
    );
  }

  render() {
    return (
      <div className="container">
        <h2>用户注册</h2>
        <form
          className="form"
          onSubmit={this.handleSubmit}
          ref={(node) => { this.$form = node; }}
        >
          {
            this.setField('name', {
              label: '名称',
              required: true,
              msg: '请输入名称',
              validate: this.checkName,
            })(<input name="name" placeholder="请输入名称" type="text" />)
          }
          {
            this.setField('password', {
              label: '密码',
              required: true,
              msg: '请输入密码',
            })(<input name="password" placeholder="请输入密码" type="password" />)
          }
          {
            this.setField('gender', {
              label: '性别',
              required: true,
              msg: '请选择性别',
            })(<RadioGroup name="gender" options={gender} />)
          }
          {
            this.setField('exmail', {
              label: '邮箱',
              required: true,
              msg: '请输入邮箱',
              validate: this.checkExmail,
            })(<input name="exmail" placeholder="请输入邮箱" type="exmail" />)
          }
          {/* <FormItem
            label="名称"
            required
            validate={this.checkName}
            msg="请输入名称"
          >
            <input name="name" placeholder="请输入名称" type="text" />
          </FormItem>
          <FormItem
            label="密码"
            required
            msg="请输入密码"
          >
            <input name="password" placeholder="请输入密码" type="password" />
          </FormItem>
          <FormItem
            label="性别"
            required
            msg="请选择性别"
          >
            <RadioGroup name="gender" options={gender} />
          </FormItem>
          <FormItem
            label="邮箱"
            required
            validate={this.checkExmail}
            msg="请输入邮箱"
          >
            <input name="exmail" placeholder="请输入邮箱" type="exmail" />
          </FormItem> */}
          <button type="submit" className="form-submit-btn">提交</button>
        </form>
      </div>
    );
  }
}
export default App;
