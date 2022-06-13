import React from 'react';
import {Alert, Button, Col, Divider, Form, Input, Row} from 'antd';
import styles from "../Auth.module.css";
import {LockFilled, UserOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom";
import {LOGIN_ROUTE} from "../../../shared/routesConstants";
import {useForgotPasswordRequest} from "../../../shared/hooks/apiHooks/AuthApiRequestHooks";
import {ForgotPasswordRequestType} from "../../../shared/interfaces/moduleTypes";

const ForgotPasswordComp = () => {
  const [form] = Form.useForm();
  const { isLoading, mutate, data } = useForgotPasswordRequest(() => {
    form.resetFields();
  });

  const onSubmit = (data: ForgotPasswordRequestType) => {
    mutate(data);
  }

  return (
    <div className={styles.bg} style={{background: "url(/images/gif/bg-login.gif)"}}>
      <Row typeof="flex" justify="center" align="middle" className={styles.componentWrapper}>
        <Col className={styles.wrapper} xs={18} md={10} lg={8}>
          <div className={styles.logoWrapper}>
            <LockFilled className={styles.logo} />
            <h2>Forgot Password</h2>
          </div>
          { data && (
            <Alert message="Email Sent" type="success" showIcon description={data.message} />
          )}
          <Divider />
          <Form
            name="forgot-password-form"
            initialValues={{ }}
            onFinish={onSubmit}
            autoComplete="off"
            layout="vertical"
            form={form}
          >
            <Form.Item name="email" label="Email Address" rules={[
              { type: 'email', message: 'The email address is not valid' },
              { required: true, message: "Please enter your email!"}
            ]}>
              <Input type="email" prefix={<UserOutlined />} placeholder="Enter You Email Address" />
            </Form.Item>
            <Form.Item wrapperCol={{ className: "c-text-right" }}>
              <Link to={LOGIN_ROUTE}>Just Remember Password? Login</Link>
            </Form.Item>
            <Form.Item className={styles.submitWrapper} wrapperCol={{ style: { width: "auto" }}}>
              <Button type="primary" htmlType="submit" loading={isLoading}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default ForgotPasswordComp;
