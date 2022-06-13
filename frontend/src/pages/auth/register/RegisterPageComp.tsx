import React from 'react';
import {Alert, Button, Col, Divider, Form, Input, Row} from 'antd';
import styles from "../Auth.module.css";
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom";
import {LOGIN_ROUTE} from "../../../shared/routesConstants";
import {MIN_PASSWORD_LENGTH} from "../../../configs/appConfigs";
import {useRegisterUserRequest} from "../../../shared/hooks/apiHooks/AuthApiRequestHooks";
import {RegisterUserRequestType} from "../../../shared/interfaces/moduleTypes";

const RegisterPageComp = () => {
  const [form] = Form.useForm();
  const { mutate, data, isSuccess, isLoading } = useRegisterUserRequest(() => {
    form.resetFields();
  });

  const onSubmit = (formData: RegisterUserRequestType) => {
    mutate(formData);
  }

  return (
    <div className={styles.bg} style={{background: "url(/images/gif/bg-login.gif)"}}>
      <Row typeof="flex" justify="center" align="middle" className={styles.componentWrapper}>
        <Col className={styles.wrapper} xs={18} md={10} lg={8}>
          <div className={styles.logoWrapper}>
            <UserOutlined className={styles.logo} />
            <h2>Register</h2>
          </div>
          { isSuccess && data && (
            <Alert message="Registered Successfully" type="success" showIcon description={data.message} />
          ) }
          <Divider />
          <Form
            name="register-form"
            initialValues={{ }}
            onFinish={onSubmit}
            autoComplete="off"
            layout="vertical"
            form={form}
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="firstName" label="First Name" rules={[{ required: true, message: "Please enter your first name" }]}>
                  <Input prefix={<UserOutlined />} placeholder="Enter Your First Name" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="lastName" label="Last Name" rules={[{ required: true, message: "Please enter your last name" }]}>
                  <Input prefix={<UserOutlined />} placeholder="Enter Your Last Name" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item name="email" label="Email Address" rules={[
              { type: 'email', message: 'The email address is not valid' },
              { required: true, message: "Please enter your email!"}
            ]}>
              <Input type="email" prefix={<UserOutlined />}  placeholder="Enter Your Email Address" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: `Password must be ${MIN_PASSWORD_LENGTH} characters long!`, min: MIN_PASSWORD_LENGTH }]}
            >
              <Input.Password prefix={<LockOutlined />}  placeholder="Enter Your Password" />
            </Form.Item>

            <Form.Item className={styles.submitWrapper} wrapperCol={{ style: { width: "auto" }}}>
              <Button type="primary" htmlType="submit" loading={isLoading}>
                Register
              </Button>
            </Form.Item>
          </Form>
          <div className="c-text-right">
            <Link to={LOGIN_ROUTE}>Already registered? Login</Link>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default RegisterPageComp;
