import React from 'react';
import './style.css';

let $form = null;
/* global FormData: true fetch: true */
const handleSubmit = (e) => {
  e.preventDefault();
  const data = new FormData($form);
  fetch('/test', {
    method: 'post',
    body: data,
  });
};

export default () => (
  <div className="container">
    <h2>用户注册</h2>
    <form onSubmit={handleSubmit} ref={(node) => { $form = node; }}>
      <div className="form-item">
        <span className="form-item-label">名称：</span>
        <div className="form-item-input">
          <input
            name="name"
            placeholder="请输入名称"
            type="text"
            required
            maxLength="10"
          />
        </div>
      </div>
      <div className="form-item">
        <span className="form-item-label">密码：</span>
        <div className="form-item-input">
          <input
            name="password"
            placeholder="请输入密码"
            type="password"
            required
            maxLength="10"
          />
        </div>
      </div>
      <div className="form-item">
        <span className="form-item-label">性别：</span>
        <div className="form-item-input">
          <input
            type="radio"
            name="gender"
            value="fale"
            required
          />
          男
          <input
            type="radio"
            name="gender"
            value="mefale"
            required
          />
          女
        </div>
      </div>
      <div className="form-item">
        <span className="form-item-label">邮箱：</span>
        <div className="form-item-input">
          <input
            name="exmail"
            placeholder="请输入邮箱"
            type="exmail"
            required
            pattern="\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}"
          />
        </div>
      </div>
      <button type="submit" className="form-submit-btn">提交</button>
    </form>
  </div>
);
