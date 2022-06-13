import React from 'react';
import {Button, Col, Divider, Form, Input, Row} from 'antd';
import styles from "../Auth.module.css";
import {LockFilled, LockOutlined, UserOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom";
import {FORGOT_PASSWORD_ROUTE, REGISTER_ROUTE} from "../../../shared/routesConstants";
import {LoginRequestType} from "../../../shared/interfaces/moduleTypes";
import {useAppStateContext} from "../../../shared/provider/AppStateProvider";

const LoginPageComp = () => {
  const { login, isLoginLoading } = useAppStateContext();

  const onSubmit = (formData: LoginRequestType) => {
    login(formData);
  }

  return (
    <div className={styles.bg} style={{background: "url(/images/gif/bg-login.gif)"}}>
      <Row typeof="flex" justify="center" align="middle" className={styles.componentWrapper}>
        <Col className={styles.wrapper} xs={18} md={10} lg={8}>
          <div className={styles.logoWrapper}>
            <LockFilled className={styles.logo} />
            <h2>Login</h2>
          </div>
          <Divider />
          <Form
            name="login-form"
            initialValues={{ email: "admin@site-342.com", password: "admin-site-342" }}
            onFinish={onSubmit}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item name="email" label="Email Address" rules={[
              { type: 'email', message: 'The email address is not valid' },
              { required: true, message: "Please enter your email!"}
            ]}>
              <Input type="email" prefix={<UserOutlined />} placeholder="Enter You Email Address" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Please enter your password!" }]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Enter You Password" />
            </Form.Item>
            <Form.Item wrapperCol={{ className: "c-text-right" }}>
              <Link to={FORGOT_PASSWORD_ROUTE}>Forgot password?</Link>
            </Form.Item>
            <Form.Item className={styles.submitWrapper} wrapperCol={{ style: { width: "auto" }}}>
              <Button type="primary" htmlType="submit" loading={isLoginLoading}>
                Login
              </Button>
            </Form.Item>
          </Form>
          <div className="c-text-right">
            <Link to={REGISTER_ROUTE}>Don't have an account? Register</Link>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default LoginPageComp;
